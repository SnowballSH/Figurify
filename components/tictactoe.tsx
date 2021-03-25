import {useState} from "react";
import {ButtonBase, Grid, Icon, Paper} from "@material-ui/core";
import {noBorder} from "../helpers/helper";

export function TicTacToe(props: { size: number }) {

    // 0 = None
    // 1 = P1
    // 2 = P2
    const [board, setBoard] = useState(Array.from({length: props.size},
        () => Array.from({length: props.size},
            () => 0
        )
    ) as number[][]);
    const [current, setCurrent] = useState(1);

    return <div>
        {
            board.map(
                (x, row) => {
                    let cols = x.map(
                        (y, col) => (
                            <>
                                <Grid key={col} item>
                                    <ButtonBase
                                        style={{...noBorder, margin: "1rem"}}
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
                                            style={{width: "5rem", height: "5rem"}}
                                        >
                                            <Icon
                                                style={{fontSize: 50}}>
                                                {
                                                    [" ", "X", "O"][y]
                                                }
                                            </Icon>
                                        </Paper>
                                    </ButtonBase>
                                </Grid>
                            </>
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