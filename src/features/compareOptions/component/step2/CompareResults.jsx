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
import CompareCostBreakdown from "./CompareCostBreakdown";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BookingConfirmationPopup } from "@/components/ui/booking-confirmation-popup";
import CompareConditions from "./CompareConditions";

import BookingRoute from "@/features/bookings/components/BookingRoute";



export default function CompareResults({ onBack, ctaLabel = "Book Now", enableBookingPopup = true, onCtaClick, priceOverride, resultMeta, headerOnly = false, toggle_button = true, popupVariant = "booking" }) {
  const { data } = useShipmentStore()
  const [expanded, setExpanded] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("cost")
  const [showConfirmationPopup, setShowConfirmationPopup] = React.useState(false)
  const price = priceOverride ?? data.price ?? (data.mode === "Air" ? "1,200" : "-")

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

  const handleBookNow = (e) => {
    e.stopPropagation()
    if (onCtaClick) {
      onCtaClick()
      return
    }
    if (enableBookingPopup) {
      setShowConfirmationPopup(true)
    }
  }

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
      onClick={() => !headerOnly && setExpanded(!expanded)}
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
          toggle_button={toggle_button}
          popupVariant={popupVariant}
        />
      </CardHeader>

      {!headerOnly && (
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
            {/* Cost/Conditions toggle */}
            <div className="w-full bg-card border rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between gap-3">
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={activeTab}
                  onValueChange={(v) => v && setActiveTab(v)}
                >
                  <ToggleGroupItem value="cost" className={'bg-background'}>
                    Cost Breakdown
                  </ToggleGroupItem>
                  <ToggleGroupItem value="conditions" className={'bg-background'}>
                    Conditions
                  </ToggleGroupItem>
                </ToggleGroup>
                {/* {(() => {
                  const origin = resultMeta?.fromPort || (data.pol ? data.pol.split(',')[0].trim() : null)
                  const via = resultMeta?.via
                  const destination = resultMeta?.toPort || (data.pod ? data.pod.split(',')[0].trim() : null)
                  const route = [origin, via, destination].filter(Boolean)
                  return route.length > 0 ? (
                    <div className="ml-auto">
                      <BookingRoute route={route} />
                    </div>
                  ) : null
                })()} */}
              </div>

              <div className="mt-4">
                {activeTab === 'cost' ? (
                  <CompareCostBreakdown
                    price={price}
                    currency={resultMeta?.currency}
                    costBreakdown={resultMeta?.costBreakdown}
                  />
                ) : (
                  // Lazy import to avoid circular deps; colocated component
                  <CompareConditions
                    conditions={resultMeta?.conditions}
                    fallbackTransitDays={resultMeta?.transitDays}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4">
              {(() => {
                const origin = data.pol ? data.pol.split(',')[0].trim() : null
                const viaPlor = data.plor || null
                const viaPlod = data.plod || null
                const destination = data.pod ? data.pod.split(',')[0].trim() : null
                const route = [origin, viaPlor, viaPlod, destination].filter(Boolean)
                return route.length > 0 ? (
                  <BookingRoute route={route} />
                ) : <div />
              })()}
              <Button onClick={handleBookNow}>{ctaLabel}</Button>
            </div>

            {enableBookingPopup && (
              <BookingConfirmationPopup
                isOpen={showConfirmationPopup}
                onClose={() => setShowConfirmationPopup(false)}
                bookingData={data}
                popupVariant={popupVariant}
              />
            )}
          </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
