import {useEffect, useState} from "react";
import {ButtonBase, Grid, Paper} from "@material-ui/core";
import {noBorder} from "../helpers/helper";

import StarsIcon from '@material-ui/icons/Stars';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';

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

    useEffect(() => {
        props.onBoardChange(board);
        props.onPlayerChange(current);
    }, [board]);

    return <div>
        {
            board.map(
                (x, row) => {
                    let cols = x.map(
                        (y, col) => (
                            <Grid key={col} item>
                                <ButtonBase
                                    style={{...noBorder, margin: "1vw"}}
                                >
                                    <Paper
                                        onClick={() => {
                                            if (board[row][col] !== 0) return;

                                            let k = {...board};
                                            k[row][col] = current;
                                            setBoard(Object.values(k) as number[][]);

                                            setCurrent(current ^ 3); // 1 -> 2, 2 -> 1
                                        }}
                                        elevation={4}
                                        data-coord={row + ':' + col}
                                        style={{width: "6vw", height: "6vw", padding: "0.25vw"}}
                                    >
                                        <div>
                                            {[
                                                " ",
                                                <FilterVintageIcon style={{fontSize: "5.5vw"}}/>,
                                                <StarsIcon style={{fontSize: "5.5vw"}}/>
                                            ][y]}
                                        </div>
                                    </Paper>
                                </ButtonBase>
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
    </div>;
}