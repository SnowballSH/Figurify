import {Component} from "react";
import Head from 'next/head';
import DataInput from "../components/dataInput";
import {Nav} from "../components/nav";
import styles from "../styles/data.module.scss";
import {NAME} from "../config/config";

export default class DataPage extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <Head>
                <title>{NAME} - Data Visualizing</title>
            </Head>
            <Nav/>
            <div className={styles.bg}>
                <div>
                    <DataInput/>
                </div>
            </div>
        </>);
    }
}