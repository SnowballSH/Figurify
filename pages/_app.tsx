import '../styles/globals.css';
import "nprogress/nprogress.css";

import Head from "next/head";
import dynamic from "next/dynamic";

const ProgressBar = dynamic(
    () => {
        return import("../components/progress");
    },
    { ssr: false },
);

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <title>See The Code</title>
        </Head>
        <ProgressBar />
        <Component {...pageProps} />
    </>;
}

export default MyApp;
