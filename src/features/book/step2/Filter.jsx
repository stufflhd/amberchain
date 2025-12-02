import React from "react"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

// Format the date label for ETD/ETA
const formatRangeLabel = (from, to, emptyLabel) => {
  if (!from && !to) return emptyLabel

  const fmt = (value) => {
    if (!value) return "…"
    const [y, m, d] = value.split("-").map(Number)
    const date = new Date(y, m - 1, d)
    if (Number.isNaN(date.getTime())) return value

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

  return `${fmt(from)} → ${fmt(to)}`
}

// Count active filters
const countActiveFilters = (filters) => {
  const keys = ["etdFrom", "etdTo", "etaFrom", "etaTo", "pol", "pod", "maxTransit"]
  return keys.filter((k) => filters[k] !== "" && filters[k] !== undefined).length
}

export default function Filter({ filters, onChange }) {
  
  // Single source of truth for changing filters
  const handleFilterChange = (newValues) => {
    onChange({
      ...filters,
      ...newValues,
    })
  }

  // Uniform date → yyyy-mm-dd
  const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
  }

  const activeFiltersCount = countActiveFilters(filters)

  const clearAll = () => {
    handleFilterChange({
      etdFrom: "",
      etdTo: "",
      etaFrom: "",
      etaTo: "",
      pol: "",
      pod: "",
      maxTransit: undefined,
    })
  }

  return (
    <div className="space-y-3">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-2 -mx-4 px-4">
        <div className="text-sm text-muted-foreground">
          {activeFiltersCount > 0 ? (
            <span className="font-medium">
              {activeFiltersCount} active filter{activeFiltersCount > 1 ? "s" : ""}
            </span>
          ) : (
            "No active filters"
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* SCROLLABLE FILTER ROW */}
      <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 -mx-4 px-4">

        {/* ETD RANGE */}
        <div className="flex-shrink-0 w-48">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">ETD range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-9 w-full justify-between px-2 text-xs font-normal">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatRangeLabel(filters.etdFrom, filters.etdTo, "Any ETD dates")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={8} className="p-3 w-auto">
              <Calendar
                mode="range"
                selected={{
                  from: filters.etdFrom ? new Date(filters.etdFrom) : undefined,
                  to: filters.etdTo ? new Date(filters.etdTo) : undefined,
                }}
                onSelect={(range) =>
                  handleFilterChange({
                    etdFrom: range?.from ? formatDate(range.from) : "",
                    etdTo: range?.to ? formatDate(range.to) : "",
                  })
                }
                numberOfMonths={2}
                className="rounded-md border"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 h-7 px-2 text-[11px]"
                onClick={() => handleFilterChange({ etdFrom: "", etdTo: "" })}
              >
                Clear
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* POL */}
        <div className="flex-shrink-0 w-48">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">POL</label>
          <input
            type="text"
            value={filters.pol}
            onChange={(e) => handleFilterChange({ pol: e.target.value })}
            placeholder="e.g. Rotterdam"
            className="h-9 w-full rounded-md border px-2 text-sm"
          />
        </div>

        {/* POD */}
        <div className="flex-shrink-0 w-48">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">POD</label>
          <input
            type="text"
            value={filters.pod}
            onChange={(e) => handleFilterChange({ pod: e.target.value })}
            placeholder="e.g. New York"
            className="h-9 w-full rounded-md border px-2 text-sm"
          />
        </div>

        {/* ETA RANGE */}
        <div className="flex-shrink-0 w-48">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">ETA range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-9 w-full justify-between px-2 text-xs font-normal">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatRangeLabel(filters.etaFrom, filters.etaTo, "Any ETA dates")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={8} className="p-3 w-auto">
              <Calendar
                mode="range"
                selected={{
                  from: filters.etaFrom ? new Date(filters.etaFrom) : undefined,
                  to: filters.etaTo ? new Date(filters.etaTo) : undefined,
                }}
                onSelect={(range) =>
                  handleFilterChange({
                    etaFrom: range?.from ? formatDate(range.from) : "",
                    etaTo: range?.to ? formatDate(range.to) : "",
                  })
                }
                numberOfMonths={2}
                className="rounded-md border"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 h-7 px-2 text-[11px]"
                onClick={() => handleFilterChange({ etaFrom: "", etaTo: "" })}
              >
                Clear
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* MAX TRANSIT DAYS */}
        <div className="flex-shrink-0 w-48">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Max Transit Days</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="365"
              value={filters.maxTransit ?? ""}
              onChange={(e) =>
                handleFilterChange({
                  maxTransit: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Any"
              className="h-9 w-full rounded-md border px-2 text-sm"
            />
            {filters.maxTransit !== undefined && (
              <button
                type="button"
                className="h-4 w-4 flex items-center justify-center text-muted-foreground hover:text-foreground"
                onClick={() => handleFilterChange({ maxTransit: undefined })}
              >
                ×
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
