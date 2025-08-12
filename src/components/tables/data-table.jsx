import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { useState } from "react"
import { DataTablePagination } from "@/components/tables/DataTablePagination"
import DataTableGlobalSearch from "@/components/tables/DataTableGlobalSearch"
import DataTableTabsFilter from "@/components/tables/DataTableTabsFilter"

export function DataTable({
    columns,
    data,
    tabsFilter,
    initialColumnVisibility,
    hideSearch = false,
    meta,
}) {
    const [sorting, setSorting] = useState([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [rowSelection, setRowSelection] = useState({})
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility || {})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            globalFilter,
            rowSelection,
            columnFilters,
            columnVisibility,
        },
        globalFilterFn: (row, columnId, value) => {
            return String(row.getValue(columnId))
                .toLowerCase()
                .includes(String(value).toLowerCase())
        },
        meta,
    })

    return (
        <div className="table w-full space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
                {!hideSearch && (
                    <DataTableGlobalSearch
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                )}
                {tabsFilter?.columnId && Array.isArray(tabsFilter?.options) && (
                    <DataTableTabsFilter
                        table={table}
                        columnId={tabsFilter.columnId}
                        options={tabsFilter.options}
                        defaultValue={tabsFilter.defaultValue ?? "all"}
                        includeAll={tabsFilter.includeAll ?? true}
                        allLabel={tabsFilter.allLabel ?? "All"}
                        className={tabsFilter.className}
                    />
                )}
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table} />
        </div>
    )
}