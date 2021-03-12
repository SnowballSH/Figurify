import {FieldCombo} from "./field";
import {Component} from "react";

import autoBind from 'react-autobind';
import {Button, Container} from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import EqualizerIcon from '@material-ui/icons/Equalizer';

import dynamic from "next/dynamic";

const Chart = dynamic(import('react-apexcharts'), {ssr: false});

import styles from '../styles/data.module.css';

import FlipMove from 'react-flip-move';

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
                    e: <div key="0"><FieldCombo defaultX="10" defaultY="20"
                                                onChangeX={this.bindChange(0, true)}
                                                onChangeY={this.bindChange(0, false)}
                                                onDelete={this.getOnDelete(0)}
                    /></div>,
                    xText: "10",
                    yText: "20"
                },
                {
                    e: <div key="1"><FieldCombo defaultX="20" defaultY="50"
                                                onChangeX={this.bindChange(1, true)}
                                                onChangeY={this.bindChange(1, false)}
                                                onDelete={this.getOnDelete(1)}
                    /></div>,
                    xText: "20",
                    yText: "50"
                },
                {
                    e: <div key="2"><FieldCombo defaultX="30" defaultY="120"
                                                onChangeX={this.bindChange(2, true)}
                                                onChangeY={this.bindChange(2, false)}
                                                onDelete={this.getOnDelete(2)}
                    /></div>,
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
                    // @ts-ignore
                    categories: Object.values(this.state.items).filter(e => e).map(e => String(e.xText) || "")
                },
                series: [{
                    name: 'Y',
                    data: Object.values(this.state.items).filter(e => e).map(e => parseFloat(e.yText) || 0)
                }],
                type: "line",
                responsive: [{
                    breakpoint: 1000,
                    options: {}
                }],
                width: window.innerWidth * .5,
                height: window.innerHeight * .6
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

    getOnDelete(i: number): () => void {
        return () => {
            let k = {...this.state.items};
            k[i] = null;
            this.setState({...this.state, items: k});
        };
    }

    render() {
        return <div className={"space-x-8 space-y-8 flex " + styles.bg}>
            <div className="space-x-10 space-y-4 ml-4" style={{flex: "35%"}}>
                <Container className={"m-8 overflow-scroll " + styles.inputCard}
                           style={
                               {
                                   maxHeight: (typeof window !== "undefined" ? window.innerHeight : 600) * 0.6,
                                   //maxWidth: (typeof window !== "undefined" ? window.innerWidth : 1200) * 0.4,
                                   //backgroundColor: "rgba(255, 255, 255, 0.3)",
                                   borderRadius: "10px",
                                   paddingLeft: "30px",
                                   marginLeft: "20px",
                               }
                           }
                           fixed
                >
                    <br/>
                    <FlipMove>
                        {Object.values(this.state.items).map(e => e ? e.e : null)}
                    </FlipMove>
                    <br/>
                </Container>

                <Button className={styles.btn1} style={{border: "none", outline: "none", fontFamily: "roboto"}}
                        variant="contained"
                        color="inherit" startIcon={<Add/>}
                        onClick={() => {
                            let w = [...Object.values(this.state.items)];
                            w.push({
                                e: <div key={String(this.state.items.length)}>
                                    <FieldCombo defaultX="" defaultY=""
                                                onChangeX={this.bindChange(w.length, true)}
                                                onChangeY={this.bindChange(w.length, false)}
                                                onDelete={this.getOnDelete(w.length)}/>
                                </div>,
                                xText: "",
                                yText: ""
                            });
                            this.setState({items: w, graph: this.state.graph});
                        }}>Add More</Button>

                <br/>

                <Button className={styles.btn2}
                        style={{border: "none", outline: "none", fontFamily: "roboto", marginBottom: "10px"}}
                        variant="contained"
                        color="inherit" startIcon={<EqualizerIcon/>} onClick={() => {
                    this.graph();
                }}>Graph</Button>

            </div>

            <div
                style={{
                    marginLeft: "80px",
                    paddingRight: "10px", marginRight: "40px"
                }} className={styles.resultCard + " overflow-scroll flex-auto"}>
                <br/>
                {
                    this.state.graph ?
                        <Chart options={{
                            chart: {
                                id: this.state.graph.id
                            },
                            xaxis: this.state.graph.xaxis,
                            responsive: this.state.graph.responsive
                        }}
                               series={this.state.graph.series} type={this.state.graph.type}
                               width={this.state.graph.width} height={this.state.graph.height}
                        />
                        : null
                }
                <br/>
            </div>
        </div>;
    }
};