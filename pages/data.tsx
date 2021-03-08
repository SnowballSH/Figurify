import {Component} from "react";
import Head from 'next/head';
import DataInput from "../components/dataInput";

export default class DataPage extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <Head>
                <title>See The Code - Data Visualizing</title>
            </Head>
            <style global jsx>{`
html,
body,
body > div:first-child,
div#__next,
div#__next > div {
    height: 100%;
}

*{
    -ms-overflow-style: none;
}
::-webkit-scrollbar {
    display: none;
}
                `}
            </style>
            <div style={{backgroundColor: "#daf5bc"}}>
                <DataInput/>
            </div>
        </>);
    }
}