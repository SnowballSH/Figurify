import {useEffect, useState} from "react";
import Head from 'next/head';
import {Nav} from "../components/nav";
import {NAME} from "../config/config";

import styles from '../styles/minimax.module.scss';
import {TicTacToe} from "../components/tictactoe";

import {TreeView, TreeItem} from '@material-ui/lab';
import {Button, Typography} from "@material-ui/core";
import FlipMove from "react-flip-move";
import {noBorder, OpenSans} from "../helpers/helper";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

interface resultFromGo {
    Move: number | null,
    Score: number,
    Children: resultFromGo[]
}

export default function MinimaxPage() {
    const [board, setBoard] = useState(Array.from({length: 3},
        () => Array.from({length: 3},
            () => 0
        )
    ) as number[][]);
    const [player, setPlayer] = useState(1);
    const [result, setResult] = useState({} as resultFromGo);

    useEffect(() => {
        fetchResult("ttt")();
    }, [board]);

    useEffect(() => {
        fetchResult("ttt")();
    });

    function fetchResult(name_: string): () => Promise<void> {
        return async () => {
            let res = await fetch(
                `/api/${name_}`, {
                    body: JSON.stringify({
                        Board: board.flat(),
                        Player: player,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            );

            if (res.status >= 500) {
                console.error(await res.text());
                return;
            }

            let result = await res.json();

            console.log(result);

            setResult(result as resultFromGo);
        };
    }

    function toJSX(ele: resultFromGo, last: number = -1, key: number = 0, mode: number = player - 1) {
        return [
            <TreeItem key={key} nodeId={String(last++)} label=
                {
                    <Typography variant={"subtitle2"}>
                         <pre style={OpenSans}>
                             {`#${ele.Move + 1} | Score: ${ele.Score} (${mode === 1 ? "max" : "min"})`}
                         </pre>
                    </Typography>
                }
            >
                {
                    ele.Children ?
                        ele.Children.sort((a, b) =>
                            (mode === 0 ? 1 : -1) * (b.Score - a.Score)
                        ).map(
                            (x, i) => {
                                let [v, l] = toJSX(x, last, i, mode ^ 1);
                                last = l as number;
                                return v;
                            }
                        )
                        : null
                }
            </TreeItem>
            , last];
    }

    function display() {
        let last = -1;
        return result.Children ?
            result.Children.sort((a, b) =>
                (player - 1 === 0 ? 1 : -1) * (b.Score - a.Score)
            ).map(
                (x, i) => {
                    let [v, l] = toJSX(x, last, i);
                    last = l as number;
                    return v;
                }
            )
            : null;
    }

    return <div>
        <Head>
            <title>{NAME} - Minimax Visualizing</title>
        </Head>
        <Nav/>

        <div className="m-4">
            <div className={styles.inputDiv}>
                <br/>
                <br/>
                <TicTacToe size={3} onBoardChange={setBoard} onPlayerChange={setPlayer}/>

                <div className="text-center">
                    <br/>
                    <Button onClick={
                        fetchResult("ttt")
                    } style={noBorder} variant={"contained"}>
                        <Typography variant="h6">
                            Analyze Position
                        </Typography>
                    </Button>
                </div>
            </div>
            <div className={styles.resultCard}>
                {
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}>
                        <FlipMove>
                            {
                                display()
                            }
                        </FlipMove>
                    </TreeView>
                }
            </div>
        </div>
    </div>;
}