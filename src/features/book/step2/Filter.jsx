import React from "react"
import { CalendarIcon, SearchIcon } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { addDays } from "date-fns"

// SAME LOGIC — just using nicer date picker
const formatRangeLabel = (from, to, emptyLabel) => {
  if (!from && !to) return emptyLabel

  const format = (value) => {
    if (!value) return "…"
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return value
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: d.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    })
  }

  return `${format(from)} → ${format(to)}`
}

export default function Filter({ filters, onChange, modes, cargoTypes, showModeCargoFilters }) {
  return (
    <div className="space-y-3">
      {/* --- ORIGINAL CONTENT KEPT --- */}
      {/* I ONLY replaced the ETD / ETA date pickers */}

      {/* General Search */}
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search quotes..."
          className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-4">

        {/* ETD RANGE (SHADCN DATE RANGE) */}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">ETD range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-9 w-full justify-between px-2 text-xs font-normal"
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatRangeLabel(filters.etdFrom, filters.etdTo, "Any ETD dates")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={8}
              className="p-3 w-auto max-w-[min(100vw-2rem,520px)]"
            >
              <Calendar
                mode="range"
                selected={{
                  from: filters.etdFrom ? new Date(filters.etdFrom) : undefined,
                  to: filters.etdTo ? new Date(filters.etdTo) : undefined,
                }}
                onSelect={(range) => {
                  onChange({
                    etdFrom: range?.from ? range.from.toISOString().slice(0, 10) : "",
                    etdTo: range?.to ? range.to.toISOString().slice(0, 10) : "",
                  })
                }}
                numberOfMonths={2}
                className="rounded-md border"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 h-7 px-2 text-[11px]"
                onClick={() => onChange({ etdFrom: "", etdTo: "" })}
              >
                Clear
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* ETA RANGE (SHADCN DATE RANGE) */}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">ETA range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-9 w-full justify-between px-2 text-xs font-normal"
              >
                <span className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatRangeLabel(filters.etaFrom, filters.etaTo, "Any ETA dates")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={8}
              className="p-3 w-auto max-w-[min(100vw-2rem,520px)]"
            >
              <Calendar
                mode="range"
                selected={{
                  from: filters.etaFrom ? new Date(filters.etaFrom) : undefined,
                  to: filters.etaTo ? new Date(filters.etaTo) : undefined,
                }}
                onSelect={(range) => {
                  onChange({
                    etaFrom: range?.from ? range.from.toISOString().slice(0, 10) : "",
                    etaTo: range?.to ? range.to.toISOString().slice(0, 10) : "",
                  })
                }}
                numberOfMonths={2}
                className="rounded-md border"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 h-7 px-2 text-[11px]"
                onClick={() => onChange({ etaFrom: "", etaTo: "" })}
              >
                Clear
              </Button>
            </PopoverContent>
          </Popover>
        </div>



        
        {/* POL */}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">POL</label>
          <input
            type="text"
            value={filters.pol}
            onChange={(e) => onChange({ pol: e.target.value })}
            placeholder="e.g. Rotterdam"
            className="h-9 w-full rounded-md border bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* POD */}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">POD</label>
          <input
            type="text"
            value={filters.pod}
            onChange={(e) => onChange({ pod: e.target.value })}
            placeholder="e.g. New York"
            className="h-9 w-full rounded-md border bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Transit Time Filter */}
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            Max Transit Days
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max="365"
              value={filters.maxTransit || ''}
              onChange={(e) => 
                onChange({ 
                  maxTransit: e.target.value ? parseInt(e.target.value, 10) : undefined 
                })
              }
              placeholder="Any"
              className="h-9 w-full rounded-md border bg-background px-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            {filters.maxTransit && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[11px] text-muted-foreground"
                onClick={() => onChange({ maxTransit: undefined })}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
