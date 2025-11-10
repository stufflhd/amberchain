import React from "react"
import { Button } from "@/components/ui/button"
import { useShipmentStore } from "@/store/shipmentStore"
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import {
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react"
import CompareResultTimeline from "@/components/CompareResultTimeline"
import ShipmentMap from "@/components/map/ShipmentMap"
import { useGeocoding } from "@/hooks/useGeocoding"
import CompareResultsHeader from "./CompareResultsHeader"
import "@/App.css"
import TransportationIcon from "@/components/icons/TransportationIcon";

export default function CompareResults({ onBack, ctaLabel = "Book Now", enableBookingPopup = true, onCtaClick, priceOverride, resultMeta }) {
  const { data } = useShipmentStore()
  const [expanded, setExpanded] = React.useState(false)
  const price = priceOverride ?? data.price ?? (data.mode === "Air" ? "1,200" : "450")

  // Geocode the locations for the map
  const { coordinates: originCoords, isLoading: originLoading, error: originError } = useGeocoding(data.pol)
  const { coordinates: destinationCoords, isLoading: destLoading, error: destError } = useGeocoding(data.pod)

  const mode = (data.mode || '').toLowerCase()
  const shipmentType = (data.shipmentType || '').toUpperCase()
  const modeIconColor = "text-muted-foreground"

  // Icon for cargo type (kept secondary)
  const cargoType = data.cargoType || data.commodity || "General Cargo"

  const timelineItems = []

  const modeLabels = {
    sea: { pol: "Port of Loading (POL)", pod: "Port of Discharge (POD)" },
    rail: { pol: "Rail Ramp origin", pod: "Rail Ramp Destination" },
    road: { pol: "Place Of Pick Up ", pod: "Place of Delivery" },
    air: { pol: "Airport of Departure", pod: "Airport of Arrival" },
    ecommerce: { pol: "Pickup Adress", pod: "Delivery Adress " },
  }

  const labels = modeLabels[mode] || modeLabels.road

  // POL (start)
  timelineItems.push({
    label: labels.pol,
    title: data.pol || "—",
    icon: <TransportationIcon className="w-5 h-5" />,
    content: null,
  })

  // PLOR
  if (data.plor) {
    timelineItems.push({
      label: "",
      title: data.plor,
      icon: null,
      content: (
        <span className="text-xs text-muted-foreground italic ml-6 block">
          {data.plor}
        </span>
      ),
      optional: true,
    })
  }

  // PLOD
  if (data.plod) {
    timelineItems.push({
      label: "",
      title: data.plod,
      icon: null,
      content: (
        <span className="text-xs text-muted-foreground italic ml-6 block">
          {data.plod}
        </span>
      ),
      optional: true,
    })
  }

  // POD (end)
  timelineItems.push({
    label: labels.pod,
    title: data.pod || "—",
    icon: <TransportationIcon className="w-5 h-5" />,
    content: null,
  })

  return (
    <Card
      className="mx-auto my-2 border shadow-sm transition-all duration-300 bg-card text-card-foreground w-full max-w-[95vw] 2xl:max-w-[1600px] cursor-pointer hover:shadow-md"
      onClick={() => setExpanded(!expanded)}
    >
      {onBack && (
        <div className="px-8 pt-4 flex justify-start">
          <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); onBack(); }}>
            ← Back
          </Button>
        </div>
      )}
      <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/10 px-8 py-3.5">
        <CompareResultsHeader
          data={data}
          expanded={expanded}
          setExpanded={setExpanded}
          price={price}
          ctaLabel={ctaLabel}
          enableBookingPopup={enableBookingPopup}
          onCtaClick={onCtaClick}
          resultMeta={resultMeta}
        />
      </CardHeader>

      <CardContent className="p-0 w-full">
        {expanded && (
          <div className="p-6 space-y-6 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[420px] w-full">
              <div className="lg:col-span-5 flex flex-col h-full min-w-0">
                <div className="bg-card rounded-xl border p-6 shadow-sm flex-1 flex flex-col min-h-[400px] w-full">
                  <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                    <Clock className={`w-6 h-6 ${modeIconColor}`} />
                    Route Timeline
                  </h3>
                  <CompareResultTimeline items={timelineItems} />
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col h-full min-w-0">
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden h-[400px] w-full flex-1">
                  {originLoading || destLoading ? (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        Loading map coordinates...
                      </div>
                    </div>
                  ) : originError || destError ? (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Unable to load map coordinates
                      </div>
                    </div>
                  ) : originCoords && destinationCoords ? (
                    <ShipmentMap
                      origin={originCoords}
                      destination={destinationCoords}
                      mapHeight="400px"
                      mode={data.mode}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Enter valid locations to view map
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Summary row */}
            {(() => {
              const formatBool = (v) => (v === true ? "Yes" : v === false ? "No" : v)
              const formatArray = (arr) => Array.isArray(arr) ? arr.join(", ") : arr
              const detailsRaw = [
                ["Mode", data.mode],
                ["Shipment Type", data.shipmentType],
                ["Container Type", data.containerType],
                ["POL", data.pol],
                // ["PLOR Enabled", data.plorChecked],
                ["PLOR", data.plorChecked ? data.plor : ""],
                // ["PLOD Enabled", data.plodChecked],
                ["PLOD", data.plodChecked ? data.plod : ""],
                ["POD", data.pod],
                ["Pickup", data.pickupLocation],
                ["Cargo Type", cargoType],
                ["Commodity", data.commodity],
                ["Gross Weight", data.grossWeight ? `${data.grossWeight} kg` : ""],
                ["PopUp Main", data.wizardSelection?.mainCategory],
                ["Popup Sub", data.wizardSelection?.subCategory],
                ["Liftgate Required", data.liftgate?.required],
                ["Access Conditions", data.accsesConditions],
                // ["Cold Treatment Required", data.coldTreatment?.required],
                // ["Cold Treatment Temp", data.coldTreatment?.temperature],
                // ["Multiple Temp Set Points", data.coldTreatment?.multipleSetPoints],
                // ["Temperature Set Points", formatArray(data.coldTreatment?.temperatureSetPoints)],
                ["Probes - Cargo Count", data.probes?.numberOfCargoProbes],
                ["Probes - Drain Holes", data.probes?.drainHoles],
                ["Probes - Fresh Air Exchange", data.probes?.freshAirExchange],
                ["Probes - Ventilation Volume", data.probes?.ventilationVolume],
                ["Humidity Control", data.humidity?.required],
                ["Humidity %", data.humidity?.percentage],
                ["Genset Export", data.genset?.duringExport],
                ["Genset Import", data.genset?.duringImport],
                ["Cargo Class", data.cargo?.class],
                ["Cargo UN Number", data.cargo?.unNumber],
                ["Cargo Dimensions (L×W×H)", [data.cargo?.length, data.cargo?.width, data.cargo?.height].filter(Boolean).join(" × ")],
                ["Length Metrics", data.cargo?.lengthMetrics],
                ["Package Type", data.cargo?.packageType],
                ["Number Of Packages", data.cargo?.numberOfPackages],
                ["Volume", data.cargo?.volume],
                ["Truck Type", data.cargo?.truckType],
                ["Number Of Pallets", data.cargo?.numberOfPallets],
                ["Stackable Cargo", data.cargo?.stackableCargo],
                ["Price", price ? `$${price}` : ""],
              ]
                .map(([k, v]) => [k, formatArray(formatBool(v))])
                .filter(([, v]) => v !== undefined && v !== null && v !== "")

              const colSize = Math.ceil(detailsRaw.length / 3) || 1
              const cols = [
                detailsRaw.slice(0, colSize),
                detailsRaw.slice(colSize, colSize * 2),
                detailsRaw.slice(colSize * 2)
              ]

              return (
                <div className="w-full bg-card border rounded-xl shadow-sm p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {cols.map((items, idx) => (
                      <div key={idx} className={`flex flex-col gap-2 ${idx > 0 ? 'md:border-l md:pl-4' : ''}`}>
                        {items.length === 0 ? (
                          <span className="text-sm text-muted-foreground">—</span>
                        ) : (
                          <div className="flex flex-col gap-1">
                            {items.map(([label, value], i) => (
                              <div key={label + i} className="flex flex-wrap items-center text-sm text-foreground/90">
                                <span className="font-medium">{label}</span>
                                <span className="mx-2 text-muted-foreground">:</span>
                                <span className="truncate">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
