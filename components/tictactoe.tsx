import {useEffect, useState} from "react";
import {ButtonBase, Grid, IconButton, Paper, Tooltip, Typography} from "@material-ui/core";
import {noBorder} from "../helpers/helper";

import StarsIcon from '@material-ui/icons/Stars';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';

import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export function TicTacToe(props: {
    size: number,
    onBoardChange: (x: number[][]) => void, onPlayerChange: (x: number) => void
}) {

    // 0 = None
    // 1 = P1
    // 2 = P2
    const [board, setBoard] = useState(Array.from({length: props.size},
        () => Array.from({length: props.size},
            () => 0
        )
    ) as number[][]);

    const [current, setCurrent] = useState(1);

    const [ended, setEnded] = useState(false);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    useEffect(() => {
        props.onBoardChange(board);
        props.onPlayerChange(current);

        (() => {
            if (board.flat().filter(x => x === 0).length == 0) setEnded(null);
            let roundWon = false;
            let bo = board.flat();
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                let a = bo[winCondition[0]];
                let b = bo[winCondition[1]];
                let c = bo[winCondition[2]];
                if (a === 0 || b === 0 || c === 0) {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
            if (roundWon) {
                setEnded(true);
            }
        })();
    }, [board]);

    return <div>
        {
            board.map(
                (x, row) => {
                    let cols = x.map(
                        (y, col) => (
                            <Grid key={col} item>
                                <Tooltip title={"#" + String(3 * row + col + 1)} arrow={true}>
                                    <ButtonBase
                                        style={{...noBorder, margin: "1vw"}}
                                    >
                                        <Paper
                                            onClick={() => {
                                                if (board[row][col] !== 0 || ended) return;

                                                let k = {...board};

                                                k[row][col] = current;
                                                setBoard(Object.values(k) as unknown as number[][]);

                                                setCurrent(current ^ 3); // 1 -> 2, 2 -> 1
                                            }}
                                            elevation={4}
                                            data-coord={row + ':' + col}
                                            style={{width: "6vw", height: "6vw", padding: "0.25vw"}}
                                        >
                                            <div>
                                                {[
                                                    <Typography variant={"h5"}
                                                                style={{fontSize: "3vw", marginTop: "1.55vw"}}>
                                                        {"#" + String(3 * row + col + 1)}
                                                    </Typography>,
                                                    <FilterVintageIcon style={{fontSize: "5vw", marginTop: "0.25vw"}}/>,
                                                    <StarsIcon style={{fontSize: "5vw", marginTop: "0.25vw"}}/>
                                                ][y]}
                                            </div>
                                        </Paper>
                                    </ButtonBase>
                                </Tooltip>
                            </Grid>
                        )
                    );
                    return <Grid
                        key={row}
                        container
                        justify="center"
                        //spacing={4}
                    >
                        {cols}
                    </Grid>;
                }
            ) as JSX.Element[]
        }

        <div className="text-center">
            <br/>
            <br/>
            <Typography variant={"h5"}>
                {
                    ended === null ? "Draw!" :
                        ended === true ? <>
                            Player {[
                            " ",
                            <FilterVintageIcon style={{fontSize: "2vw"}}/>,
                            <StarsIcon style={{fontSize: "2vw"}}/>
                        ][current ^ 3]} Won!
                        </> : <>
                            Player {[
                            " ",
                            <FilterVintageIcon style={{fontSize: "2vw"}}/>,
                            <StarsIcon style={{fontSize: "2vw"}}/>
                        ][current]}'s turn
                        </>
                }
                <Tooltip title={"Reset Board"}>
                    <IconButton style={{...noBorder}} onClick={() => {
                        setBoard(Array.from({length: props.size},
                            () => Array.from({length: props.size},
                                () => 0
                            )));
                        setCurrent(1);
                        setEnded(false);
                    }}>
                        <RotateLeftIcon/>
                    </IconButton>
                </Tooltip>
            </Typography>
        </div>
    </div>;
}