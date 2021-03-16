import {useEffect, useState} from "react";
import FlipMove from "react-flip-move";
import Head from "next/head";
import {Nav} from "../components/nav";

import styles from "../styles/sort.module.scss";
import {Button, IconButton} from "@material-ui/core";

import {ItemIterator, noBorder} from "../helpers/helper";

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

    return <div>
        <Head>
            <title>{NAME} - Sorting Visualizing</title>
        </Head>
        <Nav/>

        <Button style={noBorder} onClick={async () => {
            let res = await fetch(
                '/api/bubble', {
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

            console.log(result);

            result = result.map(w => w.map(function (x) {
                return {n: x.Value, key: x.Key} as NumberWithKey;
            }));

            console.log(result);

            setIter(new ItemIterator(result));
        }}>
            Bubble Sort
        </Button>

        <div>
            <FlipMove className={styles.resultDiv}>
                {current.map((e) =>
                    <div key={e.key} className={styles.resultItem}>
                        {e.n}
                    </div>)}
            </FlipMove>
        </div>

        <div>
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
    </div>;
}
