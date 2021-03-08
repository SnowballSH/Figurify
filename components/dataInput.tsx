import {FieldCombo} from "./field";
import {Component} from "react";

import autoBind from 'react-autobind';
import {Button, Container} from "@material-ui/core";
import {Add} from "@material-ui/icons";

import dynamic from "next/dynamic";

const Chart = dynamic(import('react-apexcharts'), {ssr: false});

interface PP {
    e: JSX.Element
    xText: string
    yText: string
}

export default class DataInput extends Component<{}, { items: PP[], graph: ChartProp }> {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    e: <FieldCombo defaultX="10" defaultY="20"
                                   onChangeX={this.bindChange(0, true)}
                                   onChangeY={this.bindChange(0, false)}/>,
                    xText: "10",
                    yText: "20"
                },
                {
                    e: <FieldCombo defaultX="20" defaultY="50"
                                   onChangeX={this.bindChange(1, true)}
                                   onChangeY={this.bindChange(1, false)}/>,
                    xText: "20",
                    yText: "50"
                },
                {
                    e: <FieldCombo defaultX="30" defaultY="120"
                                   onChangeX={this.bindChange(2, true)}
                                   onChangeY={this.bindChange(2, false)}/>,
                    xText: "30",
                    yText: "120"
                }
            ],
            graph: null
        };
        autoBind(this);
    }

    componentDidMount() {
        this.graph();
    }

    graph() {
        this.setState({
            items: this.state.items,
            graph: {
                id: 'data chart',
                xaxis: {
                    categories: this.state.items.map(e => parseFloat(e.xText) || 0)
                },
                series: [{
                    name: 'Y',
                    data: this.state.items.map(e => parseFloat(e.yText) || 0)
                }],
                type: "line",
                width: 800,
                height: 500,
            }
        });
    }

    bindChange(i: number, x: boolean): (string) => void {
        return (newVal: string) => {
            this.onTextChange(i, x, newVal);
        };
    }

    onTextChange(i: number, x: boolean, newVal: string) {
        let w = [...Object.values(this.state.items)];
        if (x) {
            w[i] = {
                e: w[i].e,
                xText: newVal,
                yText: w[i].yText
            };
        } else {
            w[i] = {
                e: w[i].e,
                xText: w[i].xText,
                yText: newVal
            };
        }
        this.setState({items: w, graph: this.state.graph});
    }

    render() {
        return <div className="space-x-8 space-y-8">
            <div className="space-x-10 space-y-4 float-left">
                <Container className="space-x-4 space-y-4 overflow-scroll"
                           style={{maxHeight: (typeof window !== "undefined" ? window.innerHeight : 1000) * 0.7}}
                           fixed
                >
                    <br/>
                    {Object.values(this.state.items).map(e => e.e)}
                </Container>

                <Button style={{
                    border: "none",
                    outline: "none"
                }} variant="contained" color="default" startIcon={<Add/>} onClick={() => {
                    let w = [...Object.values(this.state.items)];
                    w.push({
                        e: <FieldCombo defaultX="" defaultY=""
                                       onChangeX={this.bindChange(w.length, true)}
                                       onChangeY={this.bindChange(w.length, false)}/>,
                        xText: "",
                        yText: ""
                    });
                    this.setState({items: w, graph: this.state.graph});
                }}>Add More</Button>

                <br/>

                <Button style={{
                    border: "none",
                    outline: "none"
                }} variant="contained" color="primary" onClick={() => {
                    this.graph();
                }}>Graph</Button>

            </div>

            <div className="float-left" style={{backgroundColor: "white", marginLeft: "50px"}}>
                {
                    this.state.graph ?
                        <Chart options={{
                            chart: {
                                id: this.state.graph.id
                            },
                            xaxis: this.state.graph.xaxis
                        }} series={this.state.graph.series} type={this.state.graph.type}
                               width={this.state.graph.width} height={this.state.graph.height}
                        />
                        : null
                }
            </div>
        </div>;
    }
}