import React from "react"
import { Button } from "@/components/ui/button"

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
  const transitDays = getTransitDays(quote)
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm space-y-3">
      {/* Top row: ID, customer, commodity */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-medium">
          <span>{quote.id}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>{quote.createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{quote.customer}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <span>{quote.commodity}</span>
        </div>
      </div>

      {/* Route & ports */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1 text-sm">
          <div className="font-semibold">
            {quote.pol} → {quote.pod}
          </div>
          <div className="text-xs text-muted-foreground">
            ETD {quote.etd} • ETA {quote.eta}
            {transitDays != null && (
              <> • Transit {transitDays} days</>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs md:justify-end">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            {quote.mode.toUpperCase()}
          </span>
          {quote.shipmentType && (
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {quote.shipmentType}
            </span>
          )}
          {quote.containerType && (
            <span className="rounded-full bg-muted px-3 py-1 font-medium">
              {quote.containerType}
            </span>
          )}
          <span className="rounded-full bg-muted px-3 py-1 text-muted-foreground">
            {quote.cargoType}
          </span>
        </div>
      </div>

      {/* Cut-off info */}
      {quote.cutOff && (
        <div className="grid gap-3 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground sm:grid-cols-2">
          <div>
            <div className="font-medium text-foreground">Documentation cut-off</div>
            <div>{quote.cutOff.documentation}</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Cargo cut-off</div>
            <div>{quote.cutOff.cargo}</div>
          </div>
        </div>
      )}

      {/* Book action */}
      <div className="flex justify-end pt-1">
        <Button
          type="button"
          size="sm"
          className="px-4"
          onClick={() => {
            // This is step 2; integrate with your booking flow as needed.
            console.log("Book now clicked for quote:", quote.id)
          }}
        >
          Book now
        </Button>
      </div>
    </div>
  )
}
