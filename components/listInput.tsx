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
                style={{
                    width: "6rem",
                    margin: "0.8rem", padding: "0.8rem",
                    backgroundColor: "rgba(201, 255, 218, 0.6)",
                    borderRadius: "0.5rem"
                }}
            />)}
        </FlipMove>

        <div className="m-4">
            <IconButton style={{...noBorder, marginLeft: "40px", backgroundColor: "rgba(255, 200, 0, 0.2)"}}
                        onClick={function () {
                            let k = Object.values({...data});
                            k.push(Math.ceil(Math.random() * 10));
                            setData(Object.values(k) as number[]);
                            props.onChange(Object.values(k) as number[]);
                        }}>
                <Add/>
            </IconButton>

            <IconButton style={{...noBorder, marginLeft: "40px", backgroundColor: "rgba(255, 200, 0, 0.2)"}}
                        onClick={function () {
                            let k = {...Object.values(data).slice(0, -1)};
                            setData(k);
                            props.onChange(Object.values(k) as number[]);
                        }}>
                <RemoveIcon/>
            </IconButton>
        </div>

    </div>;
}