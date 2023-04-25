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

    const values = {
        backgroundArc: {
            innerRadius: 1.4,
            outerRadius: 1.9,
        },
        filledArc: {
            innerRadius: 1.3,
            outerRadius: 2,
        },
        viewBox: [
            -1, -1, 4, 2
        ]
    }

    const backgroundArc = arc()
        ({
            innerRadius: 1.4,
            outerRadius: 1.9,
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
            innerRadius: 1.3,
            outerRadius: 2,
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
                    -2, -2, 4, 2
                ].join(' ')}
            >
                <path
                    d={backgroundArc!}
                    fill='#dbdbe7'
                />
                <path
                    d={filledArc!}
                    fill='#F9BF67'
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