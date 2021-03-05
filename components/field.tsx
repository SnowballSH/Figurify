import {useState, ChangeEvent, Component} from "react";
import {TextField} from "@material-ui/core";

export function Field(props: { default: string, label: string }) {
    const [name, setName] = useState(props.default);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <TextField
            label={props.label}
            value={name}
            onChange={handleChange}
            variant="filled"
        />
    );
}

export class FieldCombo extends Component<{ defaultX: string, defaultY: string }, { x: JSX.Element, y: JSX.Element }> {
    constructor(props: { defaultX: string, defaultY: string }) {
        super(props);
        this.state = {
            x: <a style={{marginRight: "10px"}}><Field default={this.props.defaultX} label={"X"}/></a>,
            y: <Field default={this.props.defaultY} label={"Y"}/>
        };
    }

    render() {
        return (
            <div style={{padding: "10px"}}>
                {this.state.x}
                {this.state.y}
            </div>
        );
    }
}