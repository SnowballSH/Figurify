import Head from 'next/head';
import styles from '../styles/Home.module.css';
import absoluteUrl from 'next-absolute-url';

import {NextPage} from 'next';

interface Props {
    svg: string
}

const Home: NextPage<Props> = ({svg}) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>See The Code</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div dangerouslySetInnerHTML={{__html: svg}}>
            </div>
        </div>
    );
};

Home.getInitialProps = async ({req}) => {
    const {origin} = absoluteUrl(req);
    console.log(origin);
    const resp = await fetch(`${origin}/api/svg`);
    const r = await resp.text();
    return {svg: r};
};

export default Home;

