import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

import styles from "../styles/nav.module.css";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} className={styles.Nav}>
            <Toolbar>
                <Link href="/">
                    <a><Typography variant="h5" style={{paddingRight: "40px", fontWeight: "bold"}}>
                        See It All
                    </Typography></a>
                </Link>

                <Link href="/data">
                    <a><Typography variant="h6" style={{paddingRight: "40px"}}>
                        Data Visualization
                    </Typography></a>
                </Link>
            </Toolbar>
        </AppBar>
    );
}