import dynamic from "next/dynamic";
import {Typography, Box, Card, CardContent} from "@material-ui/core";

import styles from "../styles/home.module.scss";

const ParticlesBg = dynamic(import('particles-bg'), {ssr: false});
const Chart = dynamic(import('react-apexcharts'), {ssr: false});

export default function HomePage() {
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

            <div className="text-center pl-20 pr-20">
                <Card className="p-5">
                    <CardContent>
                        <Typography variant={"h3"} className="font-bold">
                            Visualize 2D Data
                        </Typography>
                    </CardContent>
                    <div style={{display: typeof window !== "undefined" && window.innerWidth > 800 ? "flex" : "inherit"}}>
                        <div>
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
                                Figurify allows you to create interactive, downloadable graphs with simple clicks.
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    </div>;
}