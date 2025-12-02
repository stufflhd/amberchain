import React, { useMemo, useState } from "react"
import { useShipmentStore } from "@/store/shipmentStore"
import { dummyQuotes } from "@/features/book/utils/quotesDummyData"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import FilterPopup from "./FilterPopup"
import ResultsBody from "./ResultsBody"

export default function BookResults({ onBackToBooking }) {
  const { data } = useShipmentStore()
  const isCombinedMode = (data.mode || "").toLowerCase() === "combined"
  const [filters, setFilters] = useState({
    mode: data.mode || "all",
    cargoType: data.cargoType || "all",
    search: "",
    maxTransit: undefined,
    pol: "",
    pod: "",
    etdFrom: "",
    etdTo: "",
    etaFrom: "",
    etaTo: "",
  })

  const handleFiltersChange = (partial) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  const { filteredQuotes, availableModes, availableCargoTypes } = useMemo(() => {
    // Use constant option lists rather than deriving from dummy data,
    // so filters are stable even if data changes.
    const modes = ["sea", "air", "road", "rail", "ecommerce", "combined"]
    const cargoTypes = ["General", "Hazardous", "Perishable", "Oversized", "Liquid"]

    const parseDate = (value) => {
      if (!value) return null
      // value can be "YYYY-MM-DD" or "YYYY-MM-DD HH:mm"
      const [datePart] = value.split(" ")
      const d = new Date(datePart)
      return Number.isNaN(d.getTime()) ? null : d
    }

    const matchesStore = (quote) => {
      // Always return true to show all quotes
      return true;
    }

    const matchesFilters = (quote) => {
      // Only apply mode filter if explicitly set and not in combined mode
      if (!isCombinedMode && filters.mode && filters.mode !== "all" && quote.mode !== filters.mode) {
        return false;
      }
      
      // Only apply cargo type filter if explicitly set
      if (filters.cargoType && filters.cargoType !== "all" && quote.cargoType !== filters.cargoType) {
        return false;
      }
      
      // If no filters are set (except mode/cargoType which are handled above), show all results
      const hasActiveFilters = [
        filters.pol,
        filters.pod,
        filters.maxTransit != null,
        filters.etdFrom,
        filters.etdTo,
        filters.etaFrom,
        filters.etaTo,
        filters.search
      ].some(Boolean);
      
      if (!hasActiveFilters) return true;

      // Free-text POL / POD contains filter
      if (filters.pol && quote.pol && !quote.pol.toLowerCase().includes(filters.pol.toLowerCase())) {
        return false;
      }
      if (filters.pod && quote.pod && !quote.pod.toLowerCase().includes(filters.pod.toLowerCase())) {
        return false;
      }

      // Parse dates once for all date-based filters
      const etdDate = parseDate(quote.etd);
      const etaDate = parseDate(quote.eta);
      
      // Calculate transit days for filtering
      if (filters.maxTransit != null) {
        let transitDays = null;
        
        if (etdDate && etaDate) {
          const diffMs = etaDate.getTime() - etdDate.getTime();
          transitDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
        } else if (typeof quote.transitTimeDays === "number") {
          transitDays = quote.transitTimeDays;
        }

        // Only filter if we have a valid transit time and the filter is set
        if (transitDays != null && transitDays > filters.maxTransit) {
          return false;
        }
      }

      // ETD date range filter
      if (filters.etdFrom) {
        const from = parseDate(filters.etdFrom);
        if (from && etdDate && etdDate < from) return false;
      }
      if (filters.etdTo) {
        const to = parseDate(filters.etdTo);
        if (to && etdDate && etdDate > to) return false;
      }

      // ETA date range filter
      if (filters.etaFrom) {
        const from = parseDate(filters.etaFrom);
        if (from && etaDate && etaDate < from) return false;
      }
      if (filters.etaTo) {
        const to = parseDate(filters.etaTo);
        if (to && etaDate && etaDate > to) return false;
      }

      if (filters.search) {
        const term = filters.search.toLowerCase()
        const haystack = [
          quote.id,
          quote.customer,
          quote.pol,
          quote.pod,
          quote.commodity,
          quote.mode,
          quote.shipmentType,
          quote.etd,
          quote.eta,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()

        if (!haystack.includes(term)) return false
      }

      return true
    }
// Build a score for each quote based on how much it matches
const scoreQuote = (quote) => {
  let score = 0;

  // Mode relevance
  if (data.mode && quote.mode === data.mode) score += 5;

  // Cargo type relevance
  if (data.cargoType && quote.cargoType === data.cargoType) score += 3;

  // POL match
  if (filters.pol && quote.pol?.toLowerCase().includes(filters.pol.toLowerCase()))
    score += 2;

  // POD match
  if (filters.pod && quote.pod?.toLowerCase().includes(filters.pod.toLowerCase()))
    score += 2;

  // Search term match
  if (filters.search) {
    const term = filters.search.toLowerCase();
    const haystack = (
      quote.id +
      quote.customer +
      quote.pol +
      quote.pod +
      quote.commodity +
      quote.mode +
      quote.shipmentType
    ).toLowerCase();

    if (haystack.includes(term)) score += 4;
  }

  // Max transit days relevance
  if (filters.maxTransit != null && quote.transitTimeDays != null) {
    if (quote.transitTimeDays <= filters.maxTransit) score += 2;
  }

  // ETD date score only (no filtering)
  const etdDate = parseDate(quote.etd);
  if (filters.etdFrom) {
    const from = parseDate(filters.etdFrom);
    if (from && etdDate && etdDate >= from) score += 1;
  }
  if (filters.etdTo) {
    const to = parseDate(filters.etdTo);
    if (to && etdDate && etdDate <= to) score += 1;
  }

  return score;
};

// Filter and sort quotes based on filters and score
let filtered = dummyQuotes
  .filter(quote => matchesStore(quote) && matchesFilters(quote))
  .map((q) => ({ ...q, _score: scoreQuote(q) }))
  .sort((a, b) => b._score - a._score); // highest score first


    return {
      filteredQuotes: filtered,
      availableModes: modes,
      availableCargoTypes: cargoTypes,
    }
  }, [data.mode, data.cargoType, filters, isCombinedMode])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">Available options</h3>
          <p className="text-sm text-muted-foreground">
            Showing {filteredQuotes.length} option{filteredQuotes.length !== 1 && "s"} based on your booking.
          </p>
        </div>

        {/* <Filter
          filters={filters}
          onChange={handleFiltersChange}
          modes={availableModes}
          cargoTypes={availableCargoTypes}
          showModeCargoFilters={isCombinedMode}
        /> */}
        <FilterPopup
          filters={filters}
          onChange={setFilters}
          modes={availableModes}
          cargoTypes={availableCargoTypes}
          showModeCargoFilters={isCombinedMode}
        />

      </div>

      <ResultsBody quotes={filteredQuotes} />

      {onBackToBooking && (
        <div className="pt-2">
          <Button
            onClick={onBackToBooking}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to booking
          </Button>
        </div>
      )}
     
    </div>
  )
}
