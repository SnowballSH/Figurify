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
import {Roboto} from "../helpers/helper";

const dFont = [
    'Chilanka',
    'cursive',
].join(',');

const theme = createMuiTheme({
    typography: {
        fontFamily: dFont,
    },
    overrides: {
        MuiTooltip: {
            tooltip: Roboto
        },
    }
});

theme.typography.subtitle2 = {
    fontFamily: dFont,
    fontSize: '0.6rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.6rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.1rem',
    },
};

theme.typography.h6 = {
    fontFamily: dFont,
    fontSize: '1rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};

theme.typography.h5 = {
    fontFamily: dFont,
    fontSize: '1.3rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.1rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.9rem',
    },
};

theme.typography.h4 = {
    fontFamily: dFont,
    fontSize: '1.8rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.9rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2.3rem',
    },
};

theme.typography.h3 = {
    fontFamily: dFont,
    fontSize: '2.6rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '2rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '2.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '3.2rem',
    },
};

theme.typography.h2 = {
    fontFamily: dFont,
    fontSize: '4rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '2.6rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '3.8rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '4.3rem',
    },
};

theme.typography.h1 = {
    fontFamily: dFont,
    fontSize: '5rem',
    [theme.breakpoints.up('xs')]: {
        fontSize: '3.4rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '4.8rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '6rem',
    },
};

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
