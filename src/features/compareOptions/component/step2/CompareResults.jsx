// CompareResults.jsx (updated)
import React from "react"
import { useShipmentStore } from "../../../../store/shipmentStore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Weight,
  Plane,
  Truck,
  Ship,
  Package,
  CalendarClock,
  AlertCircle,
  Clock,
  Package2,
  Container,
  Building2,
  Timer,
  ShoppingCart,
  ChevronDown,
  Train
} from "lucide-react"
import CompareResultTimeline from "@/components/CompareResultTimeline";
import TransportationIcon from "@/components/icons/TransportationIcon";
import ShipmentMap from "@/components/map/ShipmentMap"
import BookingForm from "./BookingForm"
import { useGeocoding } from "@/hooks/useGeocoding"
import "@/App.css"

export default function CompareResults() {
  const { data } = useShipmentStore()
  const [expanded, setExpanded] = React.useState(false)
  const price = data.price ?? (data.mode === "Air" ? "1,200" : "450")
  
  // Geocode the locations for the map
  const { coordinates: originCoords, isLoading: originLoading, error: originError } = useGeocoding(data.pol)
  const { coordinates: destinationCoords, isLoading: destLoading, error: destError } = useGeocoding(data.pod)

  // Icon for shipment mode and type
  const mode = (data.mode || '').toLowerCase();
  const shipmentType = (data.shipmentType || '').toUpperCase();

  const modeIconColor = "text-muted-foreground"; // global grey for all icons except cargo

  let modeIcon;
  if (mode === 'air') {
    modeIcon = <Plane className={`w-5 h-5 ${modeIconColor}`} />;
  } else if (mode === 'rail') {
    modeIcon = <Train className={`w-5 h-5 ${modeIconColor}`} />;
  } else if (mode === 'ecommerce') {
    modeIcon = <ShoppingCart className={`w-5 h-5 ${modeIconColor}`} />;
  } else if (mode === 'road') {
    modeIcon = shipmentType === 'FTL'
      ? <Truck className={`w-5 h-5 ${modeIconColor}`} />
      : <Package2 className={`w-5 h-5 ${modeIconColor}`} />;
  } else if (mode === 'sea') {
    modeIcon = shipmentType === 'FCL'
      ? <Ship className={`w-5 h-5 ${modeIconColor}`} />
      : <Container className={`w-5 h-5 ${modeIconColor}`} />;
  } else {
    modeIcon = <Package className={`w-5 h-5 ${modeIconColor}`} />;
  }

  // Icon for cargo type (kept secondary)
  const cargoType = data.cargoType || data.commodity || "General Cargo";
  const cargoIcon = {
    "Electronics": <Package2 className="w-5 h-5 text-secondary" />,
    "Perishable": <Container className="w-5 h-5 text-secondary" />,
    "Perishables": <Container className="w-5 h-5 text-secondary" />,
    "Chemicals": <AlertCircle className="w-5 h-5 text-secondary" />,
    "Automotive": <Truck className="w-5 h-5 text-secondary" />,
    "Hazardous": <AlertCircle className="w-5 h-5 text-secondary" />,
    "Oversized": <Package2 className="w-5 h-5 text-secondary" />,
    "General Cargo": <Package className="w-5 h-5 text-secondary" />,
  }[cargoType] || <Package className="w-5 h-5 text-secondary" />;

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

  // PLOR (small, inline if provided)
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

  // PLOD (small, inline if provided)
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
      className="mx-auto my-6 border shadow-sm transition-all duration-300 bg-card text-card-foreground w-full max-w-[95vw] 2xl:max-w-[1600px] cursor-pointer hover:shadow-md"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Compact Header Layout */}
      <CardHeader className="border-b bg-gradient-to-r from-muted/30 to-muted/10 px-8 py-3.5">
        <div className="flex items-center gap-6 w-full min-w-max">
          {/* Company Info */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
<div className="flex flex-col gap-0.2">
              <span className="font-bold text-lg leading-tight whitespace-nowrap">
                Amber Chains Logistics
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">ID: F122228</span>
            </div>
          </div>

          {/* Mode & Shipment Type */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-background border border-border/50 flex-shrink-0">
            {modeIcon}
          <span className="text-sm font-medium whitespace-nowrap">
  {data.mode ? data.mode.charAt(0).toUpperCase() + data.mode.slice(1) : "—"}
  {data.shipmentType && (
    <span className="ml-1 text-muted-foreground"> / {data.shipmentType}</span>
  )}
</span>

          </div>

          {/* Cargo Type */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-background border border-border/50 flex-shrink-0">
            {cargoIcon}
            <span className="text-sm font-medium whitespace-nowrap">{cargoType}</span>
          </div>

          {/* Weight & Days Left - Combined */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-background border border-border/50 flex-shrink-0">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Weight className={`w-4 h-4 ${modeIconColor}`} />
              <span className="text-sm font-medium">
                {data.grossWeight ? `${data.grossWeight} kg` : "—"}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Timer className={`w-4 h-4 ${modeIconColor}`} />
              <span className="text-sm font-medium">5 days left</span>
            </div>
          </div>
          {/* Route */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="rounded-md bg-primary/10 p-1.5">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-base whitespace-nowrap max-w-[160px] truncate">
              {data.pol ? data.pol.split(',')[0].trim() : "—"}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="h-px w-6 bg-border" />
              <div className="w-2 h-2 rotate-45 border-r-2 border-t-2 border-primary" />
            </div>
            <span className="font-semibold text-base whitespace-nowrap max-w-[160px] truncate">
              {data.pod ? data.pod.split(',')[0].trim() : "—"}
            </span>
          </div>


          {/* Spacer - pushes price and actions to the right */}
          <div className="flex-grow" />

          {/* Price */}
          <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-muted/50 dark:bg-muted/30 border">
            <div className="text-3xl font-bold text-foreground leading-none whitespace-nowrap">
              ${price}
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base whitespace-nowrap shadow-sm flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(true);
            }}
          >
            Book Now
          </Button>

          {/* Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="h-12 w-12 flex-shrink-0"
            aria-label={expanded ? "Hide details" : "Show details"}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 w-full">
        {expanded && (
          <div className="p-6 space-y-6 w-full" onClick={(e) => e.stopPropagation()}>
            {/* Top Section: Timeline and Map - Equal Height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[420px] w-full">
              {/* Left Column - Timeline */}
              <div className="lg:col-span-5 flex flex-col h-full min-w-0">
                <div className="bg-card rounded-xl border p-6 shadow-sm flex-1 flex flex-col min-h-[400px] w-full">
<h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                    <Clock className={`w-6 h-6 ${modeIconColor}`} />
                    Route Timeline
                  </h3>
                  <CompareResultTimeline items={timelineItems} />
                </div>
              </div>
              {/* Right Column - Map */}
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
            {/* Bottom Section: Booking Form */}
            <BookingForm />
          </div>
        )}
      </CardContent>
    </Card>
  )
}