import {useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import FlipMove from "react-flip-move";
import Add from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import {noBorder} from "../helpers/helper";

export default function ListInput(props: { default: number[], onChange: (x: number[]) => void }) {
    const [data, setData] = useState(props.default);

    return <div>
        <FlipMove>
            {Object.values(data).map((a, i) => <TextField
                key={i}
                value={a}
                type={"number"}
                onChange={function (x) {
                    let k = {...data};
                    k[i] = parseInt(x.target.value.slice(0, 18)) || 0;
                    setData(k);
                    props.onChange(Object.values(k) as number[]);
                }}
                style={{width: "4rem", margin: "1rem"}}
            />)}
        </FlipMove>

        <IconButton style={{...noBorder, marginLeft: "40px"}}
                    onClick={function () {
                        let k = {...data};
                        k[k.length] = 0;
                        setData(k);
                        props.onChange(Object.values(k) as number[]);
                    }}>
            <Add/>
        </IconButton>

        <IconButton style={{...noBorder, marginLeft: "40px"}}
                    onClick={function (x) {
                        let k = {...Object.values(data).slice(0, -1)};
                        setData(k);
                        props.onChange(Object.values(k) as number[]);
                    }}>
            <RemoveIcon/>
        </IconButton>

    </div>;
}