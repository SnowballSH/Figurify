import Head from 'next/head';
import absoluteUrl from 'next-absolute-url';
import {Component} from 'react';
import {Nav} from "../components/nav";
import HomePage from "../components/home";

export default class Home extends Component<{}, ChartProp> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Head>
                    <title>See It All!</title>
                </Head>
                <Nav/>
                <HomePage/>
            </div>
        );
    }
}
