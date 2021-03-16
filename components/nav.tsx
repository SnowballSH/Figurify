import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

import styles from "../styles/nav.module.scss";
import {NAME} from "../config/config";
import {Pangolin} from "../helpers/helper";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} className={styles.Nav}>
            <Toolbar>
                <Link href="/">
                    <a><Typography variant="h4"
                                   style={{paddingRight: "40px", fontWeight: "bold", ...Pangolin}}>
                        {NAME}
                    </Typography></a>
                </Link>

                <Link href="/data">
                    <a><Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        Data Visualization
                    </Typography></a>
                </Link>

                <Link href="/sort">
                    <a><Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        Sorting Visualization
                    </Typography></a>
                </Link>
            </Toolbar>
        </AppBar>
    );
}