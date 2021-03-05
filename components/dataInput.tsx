import {FieldCombo} from "./field";
import {Component} from "react";

import autoBind from 'react-autobind';
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";

interface PP {
    e: JSX.Element
    xText: string
    yText: string
}

export default class DataInput extends Component<{}, PP[]> {
    constructor(props) {
        super(props);
        this.state = [
            {
                e: <FieldCombo defaultX="10" defaultY="33"
                               onChangeX={this.bindChange(0, true)}
                               onChangeY={this.bindChange(0, false)}/>,
                xText: "10",
                yText: "33"
            },
            {
                e: <FieldCombo defaultX="20" defaultY="66"
                               onChangeX={this.bindChange(1, true)}
                               onChangeY={this.bindChange(1, false)}/>,
                xText: "20",
                yText: "66"
            },
            {
                e: <FieldCombo defaultX="30" defaultY="99"
                               onChangeX={this.bindChange(2, true)}
                               onChangeY={this.bindChange(2, false)}/>,
                xText: "30",
                yText: "99"
            }
        ];
        autoBind(this);
    }

    bindChange(i: number, x: boolean): (string) => void {
        return (newVal: string) => {
            this.onTextChange(i, x, newVal);
        };
    }

    onTextChange(i: number, x: boolean, newVal: string) {
        let w = [...Object.values(this.state)];
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
        this.setState(w);
    }

    render() {
        return <div className="space-x-8 space-y-4">
            <br/>
            {Object.values(this.state).map(e => e.e)}

            <Button style={{
                border: "none",
                outline: "none"
            }} variant="contained" color="default" startIcon={<Add />} onClick={() => {
                let w = [...Object.values(this.state)];
                w.push({
                    e: <FieldCombo defaultX="" defaultY=""
                                   onChangeX={this.bindChange(w.length, true)}
                                   onChangeY={this.bindChange(w.length, false)}/>,
                    xText: "",
                    yText: ""
                })
                this.setState(w);
            }}>Add More</Button>

            <br/>

            <Button style={{
                border: "none",
                outline: "none"
            }} variant="contained" color="primary" onClick={() => {
                console.log(JSON.stringify(this.state));
            }}>Graph</Button>
        </div>;
    }
}