import MinimaxPage from "../components/minimax";
import Head from "next/head";
import {NAME} from "../config/config";
import {Nav} from "../components/nav";

export default function Minimax3() {
    return <div>
        <Head>
            <title>{NAME} - Minimax Visualizing - 4x4 Tic Tac Toe</title>
        </Head>
        <Nav/>
        <MinimaxPage size={4}/>
    </div>;
}