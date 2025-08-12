import * as React from "react"
import {
    LineChart as ReLineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function LineChart({
    data = [],
    xKey = "date",
    series = [],
    height = 250,
    showGrid = true,
    smooth = true,
    xTickFormatter,
    yTickFormatter,
    tooltipLabelFormatter,
    className,
}) {
    const config = React.useMemo(() => {
        const cfg = {}
        series.forEach(s => {
            cfg[s.key] = {
                label: s.label || s.key,
                color: s.color || "var(--primary)",
            }
        })
        return cfg
    }, [series])

    return (
        <ChartContainer config={config} className={className} style={{ height }}>
            <ReLineChart data={data}>
                {showGrid && <CartesianGrid vertical={false} />}
                <XAxis
                    dataKey={xKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={24}
                    tickFormatter={xTickFormatter}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={40}
                    tickFormatter={yTickFormatter}
                />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="dot"
                            labelFormatter={tooltipLabelFormatter}
                        />
                    }
                />
                {series.map(s => (
                    <Line
                        key={s.key}
                        dataKey={s.key}
                        type={smooth ? "monotone" : "linear"}
                        stroke={`var(--color-${s.key})`}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                ))}
            </ReLineChart>
        </ChartContainer>
    )
}