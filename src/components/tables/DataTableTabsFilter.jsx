import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function DataTableTabsFilter({
  table,
  columnId,
  options = [],
  defaultValue = "all",
  includeAll = true,
  allLabel = "All",
  className = "*:data-[slot=toggle-group-item]:!px-4",
}) {
  const [value, setValue] = React.useState(defaultValue)

  React.useEffect(() => {
    const col = table.getColumn(columnId)
    if (!col) return
    if (value === "all") {
      col.setFilterValue(undefined)
    } else {
      col.setFilterValue(String(value))
    }
  }, [value, table, columnId])

  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && setValue(v)}
      variant="outline"
      className={className}
    >
      {includeAll && <ToggleGroupItem value="all">{allLabel}</ToggleGroupItem>}
      {options.map((opt) => (
        <ToggleGroupItem key={opt.value} value={String(opt.value)} className={'flex-none whitespace-nowrap w-max'}>
          {opt.label ?? opt.value}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}