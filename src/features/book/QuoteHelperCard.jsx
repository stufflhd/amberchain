import React, { useState } from "react"
import { useShipmentStore } from "@/store/shipmentStore"
import { dummyQuotes } from "./utils/quotesDummyData"



export default function QuoteHelperCard({ onSelectQuote, showCreateNew = false, onCreateNew }) {
  const { setField } = useShipmentStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredQuotes = dummyQuotes.filter((q) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      q.id.toLowerCase().includes(term) ||
      q.pol.toLowerCase().includes(term) ||
      q.pod.toLowerCase().includes(term) ||
      q.customer.toLowerCase().includes(term)
    )
  })

  const latestQuotes = [...dummyQuotes].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

  const applyQuoteToStore = (quote) => {
    // Core transport / route fields
    setField("mode", quote.mode || "")
    setField("shipmentType", quote.shipmentType || "")
    setField("containerType", quote.containerType || "")

    // Locations used by the form (keep flat to avoid overwriting nested data object)
    const pol = quote.data?.pol || quote.pol || ""
    const pod = quote.data?.pod || quote.pod || ""
    setField("pol", pol)
    setField("pod", pod)

    // Optional extra locations
    setField("plorChecked", quote.plorChecked || false)
    setField("plor", quote.plor || "")
    setField("plodChecked", quote.plodChecked || false)
    setField("plod", quote.plod || "")

    setField("pickupChecked", quote.pickupChecked || false)
    setField("pickupLocation", quote.pickupLocation || "")
    setField("returnChecked", quote.returnChecked || false)
    setField("returnLocation", quote.returnLocation || "")

    // Cargo basics
    setField("cargoType", quote.cargoType || "")
    setField("commodity", quote.commodity || "")
    setField("grossWeight", quote.grossWeight || "")

    // Advanced options
    setField("wizardSelection", quote.wizardSelection || { mainCategory: "", subCategory: "" })
    setField("coldTreatment", quote.coldTreatment || {})
    setField("probes", quote.probes || {})
    setField("humidity", quote.humidity || {})
    setField("genset", quote.genset || {})
    setField("temperatureSchedule", quote.temperatureSchedule || {})
    setField("cargo", quote.cargo || {})
    setField("liftgate", quote.liftgate || {})
    setField("accsesConditions", quote.accsesConditions || "")
  }


  const handleUseQuote = (quote) => {
    applyQuoteToStore(quote)
    if (onSelectQuote) onSelectQuote(quote)
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border bg-card p-5 sm:p-6 shadow-md space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Search existing quotes</h3>
          <p className="text-xs text-muted-foreground">
            Start from a previous quote or create a brand new booking.
          </p>
        </div>
        {showCreateNew && (
          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create new booking
          </button>
        )}
      </div>

     

      <div className="space-y-3">
        <div className="space-y-1 relative">
          <label className="text-xs font-medium" htmlFor="quote-search">
            Search by reference, route, or customer
          </label>
          <input
            id="quote-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="e.g. Q-2025-001, Rotterdam, Fresh Fruits BV"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />

          {showSuggestions && filteredQuotes.length > 0 && (
            <div className="absolute z-20 mt-1 w-full rounded-md border bg-popover shadow-lg max-h-52 overflow-auto">
              {filteredQuotes.map((quote) => (
                <button
                  key={quote.id}
                  type="button"
                  onMouseDown={() => {
                    handleUseQuote(quote)
                    setShowSuggestions(false)
                    setSearchTerm(`${quote.id} · ${quote.pol} → ${quote.pod}`)
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-accent hover:text-accent-foreground flex flex-col gap-0.5"
                >
                  <span className="font-medium">
                    {quote.id} · {quote.pol} → {quote.pod}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {quote.customer}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
            Latest quotes
          </p>
          <div className="space-y-1.5">
            {latestQuotes.map((quote) => (
              <button
                key={quote.id}
                type="button"
                onClick={() => {
                  handleUseQuote(quote)
                  setSearchTerm(`${quote.id} · ${quote.pol} → ${quote.pod}`)
                }}
                className="flex items-center justify-between rounded-md border bg-background px-3 py-2 text-xs w-full hover:bg-accent hover:text-accent-foreground"
              >
                <div className="space-y-0.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {quote.id} · {quote.pol} → {quote.pod}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{quote.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {quote.customer}
                  </p>
                </div>
                <span className="text-[11px] uppercase text-muted-foreground">
                  {quote.mode}
                </span>
              </button>
            ))}
          </div>
        </div>
         <div className="rounded-lg border bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-[11px] uppercase tracking-wide text-foreground/80">
          How this works
        </p>
        <p>
          Search by quote ID, origin, destination, or customer. Pick a quote from the list
          below, or jump straight into a new booking.
        </p>
      </div>
      </div>
    </div>
  )
}
