import Head from 'next/head';
import Link from 'next/link';
import absoluteUrl from 'next-absolute-url';
import {Component} from 'react';
import {Nav} from "../components/nav";

export default class Home extends Component<{}, ChartProp> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>See The Code</title>
                </Head>
                <Nav/>
                <Link href="/data">
                    <a>Data</a>
                </Link>
            </div>
        );
    }
}
