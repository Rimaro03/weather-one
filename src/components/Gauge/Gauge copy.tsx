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
            innerRadius: 1.5,
            outerRadius: 2,
            startAngle: -Math.PI/2,
            endAngle: Math.PI/2,
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
                width={'9em'}
                style={{ border: '1px solid pink' }}
                viewBox={[
                    -2,-2, 4, 2
                ].join(' ')}
            >
                <path
                    d={backgroundArc!}
                    fill='#dbdbe7'
                />
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