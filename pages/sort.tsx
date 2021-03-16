import {useEffect, useState} from "react";
import FlipMove from "react-flip-move";
import Head from "next/head";
import {Nav} from "../components/nav";

import styles from "../styles/sort.module.scss";
import {Button, IconButton, Typography} from "@material-ui/core";

import {ItemIterator, noBorder, OpenSans} from "../helpers/helper";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import {NAME} from "../config/config";

export default function BubblePage() {
    const [items, setItems] = useState([3, 4, 2, 1, 2] as number[]);
    const [iter, setIter] = useState(new ItemIterator([] as NumberWithKey[][]));
    const [current, setCurrent] = useState([] as NumberWithKey[]);

    useEffect(() => {
        setCurrent(iter.current);
    }, [iter]);

    function onClickBind(f: () => void): () => void {
        return () => {
            f.bind(iter)();
            setCurrent(iter.current);
        };
    }

    function fetchResult(name_: string): () => Promise<void> {
        return async () => {
            let res = await fetch(
                `/api/${name_}`, {
                    body: JSON.stringify({
                        Array: items
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            );

            let result = await res.json();

            result = result.map(w => w.map(function (x) {
                return {n: x.Value, key: x.Key} as NumberWithKey;
            }));

            setIter(new ItemIterator(result));
        };
    }

    return <div>
        <Head>
            <title>{NAME} - Sorting Visualizing</title>
        </Head>
        <Nav/>

        <Button style={noBorder} onClick={fetchResult("bubble")}>
            Bubble Sort
        </Button>

        <div className={styles.cardDiv}>
            <FlipMove className={styles.resultDiv}>
                {current.map((e) =>
                    <div key={e.key} className={styles.resultItem}>
                        <Typography style={{...OpenSans}} className="text-center">
                            {e.n}
                        </Typography>
                    </div>)}
            </FlipMove>

            <div className={styles.navigation}>
                <IconButton style={{...noBorder, marginLeft: "10px"}} onClick={onClickBind(iter.start)}>
                    <FirstPageIcon/>
                </IconButton>
                <IconButton style={{...noBorder, marginLeft: "10px"}} onClick={onClickBind(iter.back)}>
                    <NavigateBeforeIcon/>
                </IconButton>
                <IconButton style={{...noBorder, marginLeft: "10px"}} onClick={onClickBind(iter.next)}>
                    <NavigateNextIcon/>
                </IconButton>
                <IconButton style={{...noBorder, marginLeft: "10px"}} onClick={onClickBind(iter.end)}>
                    <LastPageIcon/>
                </IconButton>
            </div>
        </div>
    </div>;
}
