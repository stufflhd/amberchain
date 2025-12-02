import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SlidersHorizontal } from "lucide-react"
import Filter from "./Filter"

// Helper function to get active filter count
const getActiveFilterCount = (filters) => {
  return Object.entries(filters).filter(([key, value]) => {
    if (['search', 'mode', 'cargoType'].includes(key)) return false;
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) return false;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== undefined && v !== '');
    }
    return true;
  }).length;
};

export default function FilterPopup({ filters, onChange, modes, cargoTypes, showModeCargoFilters, onClearAll }) {
  const activeFilterCount = getActiveFilterCount(filters);
  
  const clearAllFilters = onClearAll || (() => {
    onChange({
      ...filters,
      etdFrom: "",
      etdTo: "",
      etaFrom: "",
      etaTo: "",
      pol: "",
      pod: "",
      maxTransit: undefined,
    });
  });

  return (
    <div className="flex flex-col gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </DialogTrigger>

<DialogContent className="w-[80vw] max-w-[80vw] sm:max-w-[80vw] md:max-w-[80vw] lg:max-w-6xl max-h-[85vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter Quotes</DialogTitle>
        </DialogHeader>

        {/* Your whole existing filter UI goes here */}
        <Filter
          filters={filters}
          onChange={onChange}
          modes={modes}
          cargoTypes={cargoTypes}
          showModeCargoFilters={showModeCargoFilters}
        />
      </DialogContent>
      </Dialog>
      
      {activeFilterCount > 0 && (
        <div className="flex items-center justify-between bg-muted/30 rounded-md p-2 text-sm">
          <span className="text-muted-foreground">
            {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
          </span>
          <button
            onClick={clearAllFilters}
            className="text-primary hover:underline text-sm font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
