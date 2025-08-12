import React, { useState } from "react"
import { DataTable } from "@/components/tables/data-table"
import { columns } from "./columns"
import ShipmentDetails from "./ShipmentDetails"
export default function TableCard({ docTypeOptions, shipments }) {

    const [selectedShipment, setSelectedShipment] = useState(null)
    const handleViewDetails = (shipment) => {
        setSelectedShipment(shipment)
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Daily Shipments</h3>
            </div>

            <DataTable
                columns={columns}
                data={shipments}
                initialColumnVisibility={{ docType: false }}
                tabsFilter={{
                    columnId: "docType",
                    options: docTypeOptions,
                    defaultValue: "all",
                    includeAll: true,
                    allLabel: "All",
                }}
                meta={
                    { openDialog: handleViewDetails }
                }
            />
            <ShipmentDetails
                onClose={() => setSelectedShipment(null)}
                shipment={selectedShipment}
            />
        </section>
    )
}
