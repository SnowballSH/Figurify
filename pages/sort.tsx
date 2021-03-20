import {useEffect, useState} from "react";
import FlipMove from "react-flip-move";
import Head from "next/head";
import {Nav} from "../components/nav";

import styles from "../styles/sort.module.scss";
import {Button, IconButton, Typography} from "@material-ui/core";

import {ItemIterator, noBorder, OpenSans, Roboto} from "../helpers/helper";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import {NAME, SortDefault} from "../config/config";
import ListInput from "../components/listInput";

export default function BubblePage() {
    const [items, setItems] = useState(SortDefault);
    const [iter, setIter] = useState(new ItemIterator([] as Step[]));
    const [current, setCurrent] = useState([] as NumberWithKey[]);
    const [why, setWhy] = useState("");

    useEffect(() => {
        setCurrent(iter.current.list);
        setWhy(iter.current.why);
    }, [iter]);

    function onClickBind(f: () => void): () => void {
        return () => {
            f.bind(iter)();
            setCurrent(iter.current.list);
            setWhy(iter.current.why);
            console.log(why);
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

            console.log(result);

            result = result.map(function (w) {
                return {
                    list: w.List.map(function (x) {
                            return {n: x.Value, key: x.Key} as NumberWithKey;
                        }
                    ),
                    why: w.Why
                } as Step;
            });

            setIter(new ItemIterator(result));
        };
    }

    return <div>
        <Head>
            <title>{NAME} - Sorting Visualizing</title>
        </Head>
        <Nav/>

        <div className={styles.cardInputDiv}>
            <ListInput default={SortDefault} onChange={setItems}/>

            <br/>

            <Button style={noBorder} className={styles.sortButton} onClick={fetchResult("bubble")}>
                <Typography className={styles.sortButtonText}>
                    <b>Bubble Sort</b>
                </Typography>
            </Button>

            <Button style={noBorder} className={styles.sortButton} onClick={fetchResult("selection")}>
                <Typography className={styles.sortButtonText}>
                    <b>Selection Sort</b>
                </Typography>
            </Button>
        </div>

        <div className={styles.cardDiv}>
            <FlipMove className={styles.resultDiv}>
                {current ? current.map((e) =>
                    <div key={e.key} className={styles.resultItem}>
                        <Typography style={{...OpenSans}} className="text-center">
                            {e.n}
                        </Typography>
                    </div>) : null}
            </FlipMove>

            <div>
                <Typography style={{...Roboto}} className="text-center">
                    {why}
                </Typography>
                <br/>
            </div>

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

        <br/>
        <br/>
    </div>;
}
