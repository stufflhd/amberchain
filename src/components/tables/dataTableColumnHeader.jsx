import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export function DataTableColumnHeader({ column, title, className }) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                <span>{title}</span>
                {column.getIsSorted() === "desc" ? (
                    <ArrowDown />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUp />
                ) : (
                    <ChevronsUpDown />
                )}
            </Button>
        </div>
    )
}
