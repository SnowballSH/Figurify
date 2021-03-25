import {Component} from "react";
import Head from 'next/head';
import {Nav} from "../components/nav";
import {NAME} from "../config/config";

import Tree from 'react-d3-tree';

import styles from '../styles/minimax.module.scss'
import {ButtonBase, Grid, Icon, Paper} from "@material-ui/core";
import {TicTacToe} from "../components/tictactoe";

const orgChart = {
    name: 'CEO',
    children: [
        {
            name: 'Manager',
            attributes: {
                department: 'Production',
            },
            children: [
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Fabrication',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
                {
                    name: 'Foreman',
                    attributes: {
                        department: 'Assembly',
                    },
                    children: [
                        {
                            name: 'Worker',
                        },
                    ],
                },
            ],
        },
    ],
};

export default class MinimaxPage extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <Head>
                <title>{NAME} - Data Visualizing</title>
            </Head>
            <Nav/>

            <div className="m-4">
                <div className={styles.inputDiv}>
                    <TicTacToe size={4}/>
                </div>
                <div className={styles.resultCard}>
                    <Tree data={orgChart} />
                </div>
            </div>
        </div>);
    }
}