import MinimaxPage from "../components/minimax";
import Head from "next/head";
import {NAME} from "../config/config";
import {Nav} from "../components/nav";

export default function Minimax3() {
    return <div>
        <Head>
            <title>{NAME} - Minimax Visualizing</title>
        </Head>
        <Nav/>
        <MinimaxPage size={3}/>
    </div>;
}