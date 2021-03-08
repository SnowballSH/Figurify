import Head from 'next/head';
import Link from 'next/link';
import absoluteUrl from 'next-absolute-url';
import {Component} from 'react';
import CChart from "../components/chart";

export default class Home extends Component<{}, ChartProp> {
    constructor(props) {
        super(props);

        this.state = {
            id: 'apexchart-example',
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            }],
            type: "line",
            width: 800,
            height: 500,
        };
    }

    render() {
        return (
            <div>
                <Head>
                    <title>See The Code</title>
                </Head>
                <CChart options={this.state}/>
                <Link href="/data">
                    <a>Data</a>
                </Link>
            </div>
        );
    }
}
