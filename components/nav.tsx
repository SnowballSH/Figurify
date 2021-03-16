import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

import styles from "../styles/nav.module.scss";
import {NAME} from "../config/config";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} className={styles.Nav}>
            <Toolbar>
                <Link href="/">
                    <a><Typography variant="h5" style={{paddingRight: "40px", fontWeight: "bold"}}>
                        {NAME}
                    </Typography></a>
                </Link>

                <Link href="/data">
                    <a><Typography variant="h6" style={{paddingRight: "40px"}}>
                        Data Visualization
                    </Typography></a>
                </Link>

                <Link href="/sort">
                    <a><Typography variant="h6" style={{paddingRight: "40px"}}>
                        Sorting Visualization
                    </Typography></a>
                </Link>
            </Toolbar>
        </AppBar>
    );
}