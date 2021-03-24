import {useState} from "react";
import {IconButton, TextField, Tooltip} from "@material-ui/core";
import FlipMove from "react-flip-move";
import Add from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import CasinoIcon from '@material-ui/icons/Casino';
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
                    width: "6.2rem",
                    margin: "0.7rem", padding: "0.8rem",
                    backgroundColor: "rgba(201, 255, 218, 0.8)",
                    borderRadius: "0.5rem"
                }}
            />)}
        </FlipMove>

        <div className="m-4">
            <Tooltip title="Add Element">
                <IconButton style={{...noBorder, backgroundColor: "rgba(0, 200, 0, 0.07)"}}
                            onClick={function () {
                                let k = Object.values({...data});
                                k.push(Math.ceil((Math.random() - 0.3) * 15));
                                setData(Object.values(k) as number[]);
                                props.onChange(Object.values(k) as number[]);
                            }}>
                    <Add/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Remove Last Element">
                <IconButton style={{...noBorder, marginLeft: "40px", backgroundColor: "rgba(0, 200, 0, 0.07)"}}
                            onClick={function () {
                                let k = {...Object.values(data).slice(0, -1)};
                                setData(k);
                                props.onChange(Object.values(k) as number[]);
                            }}>
                    <RemoveIcon/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Randomize">
                <IconButton style={{...noBorder, marginLeft: "40px", backgroundColor: "rgba(0, 200, 0, 0.07)"}}
                            onClick={function () {
                                let amount = Math.floor(Math.random() * 11) + 2;
                                let k = [];
                                for (let i = 0; i < amount; i++) k.push(Math.floor((Math.random() - 0.4) * 15));
                                setData(k);
                                props.onChange(Object.values(k) as number[]);
                            }}>
                    <CasinoIcon/>
                </IconButton>
            </Tooltip>
        </div>

    </div>;
}