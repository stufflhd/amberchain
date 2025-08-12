import React, { useEffect, useMemo, useState } from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LineChart } from "@/components/charts/line-chart"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChartCard({chartRaw, series}) {

    const isMobile = useIsMobile()
    const [range, setRange] = useState("90d")
    const filteredChartData = useMemo(() => {
        const ref = new Date("2025-06-30")
        const days = range === "30d" ? 30 : range === "7d" ? 7 : 90
        const start = new Date(ref)
        start.setDate(start.getDate() - days)

        return chartRaw.filter(d => {
            const dt = new Date(d.date)
            return dt >= start && dt <= ref
        })
    }, [range])


    useEffect(() => {
        if (isMobile) setRange("7d")
    }, [isMobile])

    return (
        <Card className="@container/card w-full max-w-full">
            <CardHeader className={'gap-2'}>
                <CardTitle>Daily Shipments</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">Total for the selected period</span>
                    <span className="@[540px]/card:hidden">Selected period</span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={range}
                        onValueChange={(v) => v && setRange(v)}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                    >
                        <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
                        <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
                        <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
                    </ToggleGroup>
                </CardAction>
            </CardHeader>

            <CardContent className="px-2 pt-4 sm:px-6 w-full max-w-full">
                <LineChart
                    data={filteredChartData}
                    xKey="date"
                    series={series}
                    xTickFormatter={(value) => {
                        const d = new Date(value)
                        return d.toLocaleDateString("en-US", { month: "short" })
                    }}
                    tooltipLabelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    }}
                    className={'aspect-auto h-[250px]'}
                />
            </CardContent>
        </Card>
    )
}
