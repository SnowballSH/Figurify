import {FieldCombo} from "./field";
import {Component} from "react";

export default class DataInput extends Component<any, any> {
    render() {
        return <div className="space-x-4">
            <br/>
            <FieldCombo defaultX="10" defaultY="33"/>
            <FieldCombo defaultX="20" defaultY="66"/>
            <FieldCombo defaultX="30" defaultY="99"/>
        </div>;
    }
}