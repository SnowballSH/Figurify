import {ChangeEvent, Component, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {noBorder} from "../helpers/helper";

export function Field(props: {
    default: string, label: string,
    onChange: (string) => void,
    number: boolean
}) {
    const [name, setName] = useState(props.default);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        props.onChange(event.target.value);
    };

    return (
        <TextField
            label={props.label}
            value={name}
            type={props.number ? "number" : "text"}
            onChange={handleChange}
            variant="filled"
            style={{width: "11vw"}}
        />
    );
}

interface PP {
    defaultX: string,
    defaultY: string,
    onChangeX: (string) => void
    onChangeY: (string) => void
    onDelete: () => void
}

export class FieldCombo extends Component<PP,
    { x: JSX.Element, y: JSX.Element }> {
    constructor(props: PP) {
        super(props);
        this.state = {
            x: <a style={{marginRight: "10px"}}>
                <Field default={this.props.defaultX} label={"X"} onChange={props.onChangeX} number={false}/>
            </a>,
            y: <Field default={this.props.defaultY} label={"Y"} onChange={props.onChangeY} number={true}/>
        };
    }

    render() {
        return (
            <div style={{marginBottom: "10px"}}>
                {this.state.x}
                {this.state.y}
                <IconButton style={{...noBorder, marginLeft: "10px"}} onClick={
                    this.props.onDelete
                } aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
            </div>
        );
    }
}