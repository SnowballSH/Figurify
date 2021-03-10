import {Component} from "react";
import Head from 'next/head';
import DataInput from "../components/dataInput";
import {Nav} from "../components/nav";

export default class DataPage extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <Head>
                <title>See It All! - Data Visualizing</title>
            </Head>
            <Nav/>
            <div style={{backgroundColor: "#daf5bc"}}>
                <DataInput/>
            </div>
        </>);
    }
}