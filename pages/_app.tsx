import '../styles/globals.scss';
import '../styles/reset.min.css';
import "nprogress/nprogress.css";

import Head from "next/head";
import {Router} from "next/router";
import NProgress from "nprogress";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {NAME} from "../config/config";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Chilanka',
            'cursive',
        ].join(','),
    },
});

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <title>{NAME}</title>
        </Head>
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </>;
}

export default MyApp;
