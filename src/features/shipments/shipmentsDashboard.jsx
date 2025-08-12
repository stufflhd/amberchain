import React from "react"
import { SectionCards } from "@/components/dashboard/section-cards"
import DashNav from "@/components/dashboard/DashNav"
import { chartRaw, shipments, docTypeOptions, shipmentsCards, series } from "@/constants/shipmentsData"
import ChartCard from "./ChartCard"
import TableCard from "./TableCard"

export default function ShipmentsDashboard() {

    return (
        <article className="p-4 space-y-8">

            <DashNav />

            <SectionCards items={shipmentsCards} />

            <ChartCard chartRaw={chartRaw} series={series} />

            <TableCard shipments={shipments} docTypeOptions={docTypeOptions} />

        </article>
    )
}