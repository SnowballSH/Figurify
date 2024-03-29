import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

import styles from "../styles/nav.module.scss";
import {NAME} from "../config/config";
import {Pangolin} from "../helpers/helper";

import {BrowserView, MobileView,} from "react-device-detect";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} className={styles.Nav}>
            <Toolbar>
                <Link href="/">
                    <Typography variant="h4"
                                   style={{
                                       paddingRight: "40px", fontWeight: "bold",
                                       ...Pangolin,
                                       color: "#ec5c5c"
                                   }}>
                        {NAME}
                    </Typography>
                </Link>

                <Link href="/data">
                    <Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        <BrowserView>
                            Data Visualization
                        </BrowserView>
                        <MobileView>
                            Data
                        </MobileView>
                    </Typography>
                </Link>

                <Link href="/sort">
                    <Typography variant="h6" style={{paddingRight: "40px", ...Pangolin}}>
                        <BrowserView>
                            Sorting Visualization
                        </BrowserView>
                        <MobileView>
                            Sorting
                        </MobileView>
                    </Typography>
                </Link>

                <Link href="/minimax">
                    <Typography variant="h6" style={{...Pangolin}}>
                        <BrowserView>
                            Minimax Visualization
                        </BrowserView>
                        <MobileView>
                            Minmax
                        </MobileView>
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
}