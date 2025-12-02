import React from "react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"   // ✅ FIXED

const parseDate = (value) => {
  if (!value) return null
  const [datePart] = value.split(" ")
  const d = new Date(datePart)
  return Number.isNaN(d.getTime()) ? null : d
}

const getTransitDays = (quote) => {
  const etd = parseDate(quote.etd)
  const eta = parseDate(quote.eta)
  if (etd && eta) {
    const diffMs = eta.getTime() - etd.getTime()
    return Math.round(diffMs / (1000 * 60 * 60 * 24))
  }
  return typeof quote.transitTimeDays === "number" ? quote.transitTimeDays : null
}

export default function Result({ quote }) {
  const navigate = useNavigate() // must be inside the component

  const handleBookNow = () => {
    // Pass the selected quote along so the bookings screen can build a booking from it
    navigate("/bookings", {
      state: {
        fromQuote: quote,
      },
    })
  }

  const transitDays = getTransitDays(quote)

  return (
    <div className="rounded-lg border bg-card p-3 space-y-1.5 w-full">
      {/* Top row: ID, customer, commodity */}
      <div className="flex flex-wrap items-center justify-between gap-0.5 text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base text-foreground">{quote.id}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="text-sm">{quote.createdAt}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="font-semibold text-base text-foreground">{quote.customer}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="truncate max-w-[120px] text-sm">{quote.commodity}</span>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-xs leading-none">
            {quote.mode.toUpperCase()}
          </span>
          {quote.shipmentType && (
            <span className="rounded-full bg-muted/80 px-3 py-1 font-medium text-xs leading-none">
              {quote.shipmentType}
            </span>
          )}
        </div>
      </div>

      {/* Route and details */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="min-w-0">
          <div className="text-base font-bold leading-tight truncate">
            {quote.pol} → {quote.pod}
          </div>
          <div className="text-xs text-muted-foreground leading-none mt-0.5">
            <span className="whitespace-nowrap">ETD {quote.etd}</span>
            <span className="mx-1">•</span>
            <span className="whitespace-nowrap">ETA {quote.eta}</span>
            {transitDays != null && (
              <>
                <span className="mx-1">•</span>
                <span className="whitespace-nowrap">{transitDays}d transit</span>
              </>
            )}
          </div>
        </div>

        {/* Container type and cargo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {quote.containerType && (
            <span className="rounded-full bg-muted/80 px-3 py-1 font-medium text-xs leading-none">
              {quote.containerType}
            </span>
          )}
          <span className="text-muted-foreground/90 text-sm font-medium truncate max-w-[100px]">
            {quote.cargoType}
          </span>
        </div>
      </div>

      {/* Cut-off info */}
      {quote.cutOff && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground/80 border-t border-muted-foreground/10 pt-1.5">
          <div className="flex items-center gap-1">
            <span className="font-medium">Doc Cut-Off:</span>
            <span className="truncate max-w-[90px]">{quote.cutOff.documentation}</span>
          </div>
          <div className="h-3 w-px bg-muted-foreground/20"></div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Cargo Cut-Off:</span>
            <span className="truncate max-w-[90px]">{quote.cutOff.cargo}</span>
          </div>
        </div>
      )}

      {/* Book action */}
      <div className="flex justify-end">
        <Button
          type="button"
          size="lg"
          className="h-9 px-6 text-sm font-medium rounded-md"
          onClick={handleBookNow}
        >
          Book now
        </Button>
      </div>
    </div>
  )
}
