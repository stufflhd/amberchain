import React, { useState, useCallback, useMemo } from "react"
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
  Train,
  AlertTriangle,
  Snowflake,
  Maximize,
  Droplets
} from "lucide-react"
import { useShipmentStore } from "@/store/shipmentStore"
import { BookingConfirmationPopup } from "@/components/ui/booking-confirmation-popup"
import TransportationIcon from "@/components/icons/TransportationIcon"

export default function CompareResultsHeader({ data, expanded, setExpanded, price }) {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const shipmentData = useShipmentStore((s) => s.data)
  const setField = useShipmentStore((s) => s.setField)

  const handleBookNow = useCallback(
    (e) => {
      e.stopPropagation()
      console.log("Booking data:", shipmentData)
      setShowConfirmationPopup(true)
    },
    [shipmentData]
  )

  const mode = (data.mode || "").toLowerCase()
  const shipmentType = (data.shipmentType || "").toUpperCase()
  const modeIconColor = "text-muted-foreground"

  let modeIcon
  if (mode === 'air') {
    modeIcon = <Plane className={`w-5 h-5 ${modeIconColor}`} />
  } else if (mode === 'rail') {
    modeIcon = <Train className={`w-5 h-5 ${modeIconColor}`} />
  } else if (mode === 'ecommerce') {
    modeIcon = <ShoppingCart className={`w-5 h-5 ${modeIconColor}`} />
  } else if (mode === 'road') {
    modeIcon = shipmentType === 'FTL'
      ? <Truck className={`w-5 h-5 ${modeIconColor}`} />
      : <Package2 className={`w-5 h-5 ${modeIconColor}`} />
  } else if (mode === 'sea') {
    modeIcon = shipmentType === 'FCL'
      ? <Ship className={`w-5 h-5 ${modeIconColor}`} />
      : <Container className={`w-5 h-5 ${modeIconColor}`} />
  } else {
    modeIcon = <Package className={`w-5 h-5 ${modeIconColor}`} />
  }

  const cargoType = data.cargoType || data.commodity || "General Cargo"
  const cargoIcon = {
    "General": <Package className="w-5 h-5 text-secondary" />,
    "Hazardous": <AlertTriangle className="w-5 h-5 text-secondary" />,
    "Perishable": <Snowflake className="w-5 h-5 text-secondary" />,
    "Oversized": <Maximize className="w-5 h-5 text-secondary" />,
    "Liquid": <Droplets className="w-5 h-5 text-secondary" />,
  }[cargoType] || <Package className="w-5 h-5 text-secondary" />


  return (
    <>
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

        {/* Weight & Days Left */}
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

        <div className="flex-grow" />

        {/* Price */}
        <div className="flex-shrink-0 px-4 py-2 rounded-lg bg-muted/50 dark:bg-muted/30 border">
          <div className="text-3xl font-bold text-foreground leading-none whitespace-nowrap">
            ${price}
          </div>
        </div>

        {/* Book Now */}
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base whitespace-nowrap shadow-sm flex-shrink-0"
          onClick={handleBookNow}
        >
          Book Now
        </Button>

        {/* Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded(!expanded)
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

      {/* Booking Confirmation Popup */}
      <BookingConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
        bookingData={shipmentData}
      />
    </>
  )
}
