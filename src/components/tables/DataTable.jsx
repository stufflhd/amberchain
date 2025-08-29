import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getExpandedRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { DataTablePagination } from "./DataTablePagination";
import DataTableToolbar from "./DataTableToolbar";
import DataTableBody from "./DataTableBody";

export function DataTable({
    columns,
    data,
    isLoading,
    tabsFilter,
    dropdownFilters,
    initialColumnVisibility,
    expandable = false,
    renderExpandedRow = () => null,
    columnFilters,
    setColumnFilters,
    searchTerm,
    onClearSearch,
    bulkActions,
}) {
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [expanded, setExpanded] = useState({});
    const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility || {});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            columnVisibility,
            ...(expandable && { expanded }),
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        ...(expandable && { getExpandedRowModel: getExpandedRowModel() }),
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onExpandedChange: setExpanded,
    });

    useEffect(() => {
        if (searchTerm && data.length === 1) {
            setExpanded({ "0": true });
        } else {
            setExpanded({});
        }
    }, [data, searchTerm]);
    
    const handleRowClick = (row) => {
        const newExpandedState = {};
        if (!row.getIsExpanded()) {
            newExpandedState[row.id] = true;
        }
        setExpanded(newExpandedState);
    };

    return (
        <>
            <DataTableToolbar
                table={table}
                tabsFilter={tabsFilter}
                dropdownFilters={dropdownFilters}
                searchTerm={searchTerm}
                onClearSearch={onClearSearch}
                bulkActions={bulkActions} 
            />
            <DataTableBody
                table={table}
                columns={columns}
                expandable={expandable}
                renderExpandedRow={renderExpandedRow}
                onRowClick={handleRowClick}
                isLoading={isLoading}
            />
            <DataTablePagination table={table} />
        </>
    );
}