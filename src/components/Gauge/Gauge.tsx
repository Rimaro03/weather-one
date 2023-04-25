import React from "react"
import { arc } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { format } from 'd3-format'

interface GaugeProps {
    value: number,
    min: number,
    max: number
}

const Gauge = ({
    value,
    min,
    max,
}: GaugeProps) => {

    const backgroundArc = arc()
        ({
            innerRadius: 0.75,
            outerRadius: 0.9,
            startAngle: -Math.PI / 2,
            endAngle: Math.PI / 2,
        })

    const percentScale = scaleLinear()
        .domain([min, max])
        .range([0, 1])
    const percent = percentScale(value)

    const angleScale = scaleLinear()
        .domain([0, 1])
        .range([-Math.PI / 2, Math.PI / 2])
        .clamp(true)
    const angle = angleScale(percent)

    const filledArc = arc()
        ({
            innerRadius: 0.65,
            outerRadius: 1,
            startAngle: -Math.PI / 2,
            endAngle: angle,
        })

    return (
        <div style={{
            textAlign: "center",
        }}>
            <svg
                width={'100%'}
                viewBox={[
                    -1, -1, 2, 1
                ].join(' ')}
                >
                <path
                    d={backgroundArc!}
                    fill='#dbdbe7'
                />
                <path
                    d={filledArc!}
                    fill="#F9BF67"
                />
                <text x="-0.1" y="0" fontFamily="italic" fontSize={"3%"} color="black" >{format(",")(value)}</text>
            </svg>
            {/**            <div style={{
                fontSize: "3em",
                lineHeight: "1em",
            }}>
                {format(",")(value)}
            </div> */}
        </div>
    )
}

export default Gauge