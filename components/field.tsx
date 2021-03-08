import {useState, ChangeEvent, Component} from "react";
import {TextField} from "@material-ui/core";

export function Field(props: {
    default: string, label: string,
    onChange: (string) => void
}) {
    const [name, setName] = useState(props.default);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        props.onChange(event.target.value)
    };

    return (
        <TextField
            label={props.label}
            value={name}
            type="number"
            onChange={handleChange}
            variant="filled"
        />
    );
}

interface PP {
    defaultX: string,
    defaultY: string,
    onChangeX: (string) => void
    onChangeY: (string) => void
}

export class FieldCombo extends Component<PP,
    { x: JSX.Element, y: JSX.Element }> {
    constructor(props: PP) {
        super(props);
        this.state = {
            x: <a style={{marginRight: "10px"}}>
                <Field default={this.props.defaultX} label={"X"} onChange={props.onChangeX}/>
            </a>,
            y: <Field default={this.props.defaultY} label={"Y"} onChange={props.onChangeY}/>
        };
    }

    render() {
        return (
            <div style={{marginBottom: "10px"}}>
                {this.state.x}
                {this.state.y}
            </div>
        );
    }
}