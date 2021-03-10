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
            <div style={{backgroundColor: "#daf5bc"}}>
                <DataInput/>
            </div>
        </>);
    }
}