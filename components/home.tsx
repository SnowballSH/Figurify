import dynamic from "next/dynamic";
import {Typography} from "@material-ui/core";

const ParticlesBg = dynamic(import('particles-bg'), {ssr: false});

export default function HomePage() {
    return <div>
        <ParticlesBg type="polygon" bg={true}/>

        <div className="text-center mt-20">
            <Typography variant={"h1"}>
                Visualize Anything.
            </Typography>
            <Typography variant={"h2"}>
                Right in your browser!
            </Typography>
        </div>
    </div>;
}