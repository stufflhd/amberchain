import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function DataTableTabsFilter({
  table,
  columnId,
  options = [],
  includeAll = true,
  allLabel = "All",
  className = "*:data-[slot=toggle-group-item]:!px-4",
  onTabChange, 
}) {
  const column = table.getColumn(columnId);
  const currentFilterValue = column?.getFilterValue() || "all";

  const handleValueChange = (newValue) => {
    if (!newValue) return;

    if (newValue === "all") {
      column?.setFilterValue(undefined);
    } else {
      column?.setFilterValue(newValue);
    }

    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <ToggleGroup
      type="single" 
      value={currentFilterValue} 
      onValueChange={handleValueChange}
      variant="outline"
      className={className}
    >
      {includeAll && <ToggleGroupItem value="all">{allLabel}</ToggleGroupItem>}
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={String(opt.value)}
          className={"flex-none whitespace-nowrap w-max"}
        >
          {opt.label ?? opt.value}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}