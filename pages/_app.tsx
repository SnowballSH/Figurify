import '../styles/globals.css';
import "nprogress/nprogress.css";

import Head from "next/head";
import {Router} from "next/router";
import NProgress from "nprogress";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <title>See The Code</title>
        </Head>
        <Component {...pageProps} />
    </>;
}

export default MyApp;
