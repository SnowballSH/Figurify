import {TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";

export default function DataInput() {
    const [name, setName] = useState('Cat in the Hat');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <form noValidate autoComplete="off">
            <div>
                <TextField id="standard-name" label="Name" value={name} onChange={handleChange} />
                <TextField id="standard-uncontrolled" label="Uncontrolled" defaultValue="foo" />
            </div>
            <div>
                <TextField
                    id="filled-name"
                    label="Name"
                    value={name}
                    onChange={handleChange}
                    variant="filled"
                />
                <TextField
                    id="filled-uncontrolled"
                    label="Uncontrolled"
                    defaultValue="foo"
                    variant="filled"
                />
            </div>
            <div>
                <TextField
                    id="outlined-name"
                    label="Name"
                    value={name}
                    onChange={handleChange}
                    variant="outlined"
                />
                <TextField
                    id="outlined-uncontrolled"
                    label="Uncontrolled"
                    defaultValue="foo"
                    variant="outlined"
                />
            </div>
        </form>
    );
}