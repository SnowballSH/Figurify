import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

import styles from "../styles/nav.module.scss";
import {NAME} from "../config/config";
import {Pangolin} from "../helpers/helper";
import dynamic from "next/dynamic";

import {
    BrowserView,
    MobileView,
} from "react-device-detect";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} className={styles.Nav}>
            <Toolbar>
                <Link href="/">
                    <a><Typography variant="h4"
                                   style={{
                                       paddingRight: "40px", fontWeight: "bold",
                                       ...Pangolin,
                                       color: "#ec5c5c"
                                   }}>
                        {NAME}
                    </Typography></a>
                </Link>

                <Link href="/data">
                    <a><Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        <BrowserView>
                            Data Visualization
                        </BrowserView>
                        <MobileView>
                            Data
                        </MobileView>
                    </Typography></a>
                </Link>

                <Link href="/sort">
                    <a><Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        <BrowserView>
                            Sorting Visualization
                        </BrowserView>
                        <MobileView>
                            Sorting
                        </MobileView>
                    </Typography></a>
                </Link>

                <Link href="/minimax">
                    <a><Typography variant="h6" style={{...Pangolin}}>
                        <BrowserView>
                            Minimax Visualization
                        </BrowserView>
                        <MobileView>
                            Minmax
                        </MobileView>
                    </Typography></a>
                </Link>
            </Toolbar>
        </AppBar>
    );
}