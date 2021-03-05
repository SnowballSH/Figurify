import {Component} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Chart = dynamic(import('react-apexcharts'), {ssr: false});

export default class CChart extends Component<{options: ChartProp}, State> {
    constructor(props: {options: ChartProp}) {
        super(props);

        let p = props.options

        this.state = {
            options: {
                chart: {
                    id: p.id
                },
                xaxis: p.xaxis
            },
            series: p.series,
            type: p.type,
            width: p.width,
            height: p.height
        };
    }

    render() {
        return (
            <div>
                <Head>
                    <title>See The Code</title>
                </Head>
                <Chart options={this.state.options} series={this.state.series} type={this.state.type} width={this.state.width} height={this.state.height}/>
            </div>
        );
    }
}