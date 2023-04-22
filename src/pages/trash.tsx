import Gauge from "@/components/Gauge/Gauge copy";
import React from "react";


export default function Trash() {
    return(
        <Gauge value={5} max={15} min={0} />
    );
}