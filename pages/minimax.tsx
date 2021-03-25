import {useEffect, useState} from "react";
import Head from 'next/head';
import {Nav} from "../components/nav";
import {NAME} from "../config/config";

import styles from '../styles/minimax.module.scss';
import {TicTacToe} from "../components/tictactoe";

import {TreeView, TreeItem} from '@material-ui/lab';
import {Button, Typography} from "@material-ui/core";
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import StarsIcon from "@material-ui/icons/Stars";

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
        fetchResult("ttt")()
    }, [board])

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

    function toJSX(ele: resultFromGo, last: number = -1, key: number = 0) {
        return [
            <TreeItem key={key} nodeId={String(last++)} label=
                {
                    `#${ele.Move+1}: ` + (ele.Children ?
                    `Best Move: ${
                        Object.values(ele.Children.filter(
                            x => x.Score === ele.Score
                        ).map(x => x.Move+1)).join(", ")
                } Score: ${ele.Score}`
                : `Score: ${ele.Score}`)
                }
            >
                {
                    ele.Children ?
                        ele.Children.map(
                            (x, i) => {
                                let [v, l] = toJSX(x, last, i);
                                last = l as number;
                                return v;
                            }
                        )
                        : null
                }
            </TreeItem>
            , last];
    }

    return <div>
        <Head>
            <title>{NAME} - Data Visualizing</title>
        </Head>
        <Nav/>

        <div className="m-4">
            <div className={styles.inputDiv}>
                <br/>
                <br/>
                <TicTacToe size={3} onBoardChange={setBoard} onPlayerChange={setPlayer}/>

                <Typography variant={"h5"}>
                    Player {[
                    " ",
                    <FilterVintageIcon style={{fontSize: "2vw"}}/>,
                    <StarsIcon style={{fontSize: "2vw"}}/>
                ][player]}
                </Typography>

                <Button onClick={
                    fetchResult("ttt")
                }>
                    Analyze
                </Button>
            </div>
            <div className={styles.resultCard}>
                <TreeView>
                    {
                        toJSX(result)[0]
                    }
                </TreeView>
            </div>
        </div>
    </div>;
}