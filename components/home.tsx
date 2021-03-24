import dynamic from "next/dynamic";
import {Typography, Box, Card, CardContent, Button} from "@material-ui/core";

import styles from "../styles/home.module.scss";
import {useEffect, useState} from "react";
import {Pangolin} from "../helpers/helper";
import Link from "next/link";
import Image from 'next/image';

const ParticlesBg = dynamic(import('particles-bg'), {ssr: false});
const Chart = dynamic(import('react-apexcharts'), {ssr: false});

export default function HomePage() {
    const [clientWindow, setWindow] = useState(null as Window);

    useEffect(() => {
        setWindow(window);
    }, []);

    return <div className="overflow-hidden ">
        <div style={{minHeight: "calc(100vh - 64px)", width: "100vw", maxWidth: "100%"}}>
            <ParticlesBg num={2} type="fountain" bg={true}/>
            <ParticlesBg num={2} type="polygon" bg={true}/>

            <div className="text-center" style={{paddingTop: "calc(40vh - 64px)"}}>
                <Typography variant={"h1"} className="font-bold">
                    <Box fontWeight={600} m={1}>
                        Figurify The Algorithms
                    </Box>
                </Typography>
                <br/>
                <Typography variant={"h2"}>
                    Right in your browser!
                </Typography>
            </div>
        </div>

        <div className={styles.homeBG1} style={{width: "100vw", maxWidth: "100%"}}>
            <div className="text-center pb-8 pt-10">
                <Typography variant={"h2"}>
                    Here's what you can do:
                </Typography>
            </div>

            <div className="text-center pl-14 pr-14">
                <Card className="p-5">
                    <CardContent>
                        <Typography variant={"h3"} className="font-bold">
                            Visualize 2D Data
                        </Typography>
                    </CardContent>
                    <div style={{display: clientWindow && clientWindow.innerWidth > 800 ? "flex" : "inherit"}}>
                        <div style={{overflow: clientWindow && clientWindow.innerWidth > 800 ? "inherit" : "scroll"}}>
                            <Chart options={{
                                chart: {
                                    id: 'apexchart-example'
                                },
                                xaxis: {
                                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                                }
                            }} series={[{
                                name: 'series-1',
                                data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
                            }]} type="bar" width={500} height={320}/>
                        </div>
                        <CardContent>
                            <Typography variant={"h5"} className="font-bold">
                                <br/>

                                Figurify allows you to create interactive, resizable, downloadable graphs with simple
                                clicks.

                                <br/>
                                <br/>

                                Just type in some x and y value pairs, and the graph is there!
                            </Typography>

                            <br/>
                            <br/>

                            <Link href="/data">
                                <Button variant="contained"><Typography variant="h6" style={{...Pangolin}}>
                                    Visualize Data
                                </Typography></Button>
                            </Link>
                        </CardContent>
                    </div>
                </Card>

                <br/>
                <br/>
                <br/>

                <Card className="p-5">
                    <CardContent>
                        <Typography variant={"h3"} className="font-bold">
                            Visualize Sorting Algorithms
                        </Typography>
                    </CardContent>
                    <div>
                        <CardContent>
                            <Typography variant={"h5"} className="font-bold">
                                <Image
                                    src="/sorting_demo.gif"
                                    alt="Sorting Demo"
                                    width={1199 * .7}
                                    height={493 * .7}>

                                </Image>

                                <br/>
                                <br/>

                                Figurify shows you the process of a sorting algorithm and explains every step for you.

                                <br/>
                                <br/>

                                Now you can jump into the computer's core and see what it is doing!
                            </Typography>

                            <br/>
                            <br/>

                            <Link href="/sort">
                                <Button variant="contained"><Typography variant="h6" style={{...Pangolin}}>
                                    Visualize Sorting Algorithms
                                </Typography></Button>
                            </Link>
                        </CardContent>
                    </div>
                </Card>

                <br/>
                <br/>
                <br/>

                <Card className="p-5">
                    <br/>
                    <CardContent>
                        <Typography variant={"h3"}>
                            <b>Interested?</b>
                            <br/>
                            <br/>
                            Scroll up and click a tool you want to use!
                        </Typography>
                    </CardContent>
                </Card>

                <br/>
                <br/>
                <br/>
            </div>
        </div>
    </div>;
}