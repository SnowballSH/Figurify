import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import Link from "next/link";

export function Nav() {
    return (
        <AppBar position={"sticky"} color={"transparent"} style={{backgroundColor: "#c9ec7c"}}>
            <Toolbar>
                <Link href="/">
                    <a><Typography variant="h6" style={{paddingRight: "40px"}}>
                        See It All!
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