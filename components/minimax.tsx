import {ChangeEvent, useEffect, useState} from "react";

import styles from '../styles/minimax.module.scss';
import {TicTacToe} from "./tictactoe";

import {TreeView, TreeItem} from '@material-ui/lab';
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    Typography
} from "@material-ui/core";
import {noBorder, OpenSans} from "../helpers/helper";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FilterVintageIcon from "@material-ui/icons/FilterVintage";
import StarsIcon from "@material-ui/icons/Stars";

import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';
import FlipMove from "react-flip-move";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box minWidth={35}>
                <FilterVintageIcon style={{fontSize: "2vw"}}/>
            </Box>
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...{
                    ...props, value: 50 + Math.min(Math.max(
                        (props.value || 0) * 2, -50), 50)
                }} />
            </Box>
            <Box minWidth={35}>
                <StarsIcon style={{fontSize: "2vw"}}/>
            </Box>
        </Box>
    );
}

interface resultFromGo {
    Move: number | null,
    Score: number,
    Children: resultFromGo[]
}

export default function MinimaxPage(props: {size: 3 | 4}) {
    const [board, setBoard] = useState(Array.from({length: props.size},
        () => Array.from({length: props.size},
            () => 0
        )
    ) as number[][]);
    const [player, setPlayer] = useState(1);
    const [result, setResult] = useState({} as resultFromGo);

    const [loading, setLoading] = useState(false);

    const [depth, setDepth] = useState(4);

    const [rich, setRich] = useState(true);

    useEffect(() => {
        fetchResult("t".repeat(props.size))();
    }, [board, rich, depth]);

    useEffect(() => {
        fetchResult("t".repeat(props.size))();
    }, []);

    function fetchResult(name_: string): () => Promise<void> {
        return async () => {
            setLoading(true);

            let res = await fetch(
                `/api/${name_}/${name_}`, {
                    body: JSON.stringify({
                        Board: board.flat(),
                        Player: player,
                        Depth: depth,
                        Rich: rich,
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

            //console.log(result);

            console.log(loading);

            setLoading(false);
            setResult(result as resultFromGo);
        };
    }

    function toJSX(ele: resultFromGo, last: number = -1, key: number = 0, mode: number = player - 1) {
        return [
            <TreeItem key={key} nodeId={String(last++)} label=
                {
                    <Typography variant={"subtitle2"}>
                         <pre style={OpenSans}>
                             {`#${ele.Move + 1} | Score: ${ele.Score} (${ele.Children ? (mode === 1 ? "max" : "min") : "end of branch"})`}
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

    const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setDepth(event.target.value as number);
    };

    const handleChangeRich = (event: ChangeEvent<HTMLInputElement>) => {
        setRich(event.target.checked as boolean);
    };

    return <div className="m-4">
        <div className={styles.inputDiv}>
            <br/>
            <br/>
            <TicTacToe size={props.size} onBoardChange={setBoard} onPlayerChange={setPlayer}/>

            <div className="text-center">
                <br/>
                <FormControlLabel
                    control={<Switch checked={rich} onChange={handleChangeRich} name="Rich Mode"/>}
                    label="Rich Mode"
                />
                <FormControl variant="filled" style={{width: "8rem", height: "6rem", marginRight: "1rem"}}>
                    <InputLabel id="depth selector">Depth</InputLabel>
                    <Select
                        labelId="depth selector"
                        value={depth}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={9}>9 (Unbeatable)</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={
                    () => {
                        fetchResult("ttt")();
                    }
                } style={{...noBorder, height: "3.5rem"}} variant={"contained"}>
                    <Typography variant="subtitle2">
                        Analyze Position
                    </Typography>
                </Button>
            </div>
        </div>
        <div className={styles.resultCard}>
            <div className={styles.tree}>
                {
                    !loading ? <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}>
                        <FlipMove>
                            {
                                display()
                            }
                        </FlipMove>
                    </TreeView> : <Typography variant={"subtitle2"}>
                        Loading...
                    </Typography>
                }
            </div>

            <br/>
            <br/>

            <LinearProgressWithLabel value={result.Score}/>
        </div>
    </div>;
}