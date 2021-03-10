import '../styles/globals.css';
import "nprogress/nprogress.css";

import Head from "next/head";
import {Router} from "next/router";
import NProgress from "nprogress";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

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
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <title>See It All!</title>
        </Head>
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    </>;
}

export default MyApp;
