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
    allowSearchFiltering = false,
    globalFilter,
    setGlobalFilter,
    actionTitle,
    setSelectedRows,
    externalRowSelectionResetKey,
    initialExpandedRowIndex,
}) {
    const [sorting, setSorting] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [expanded, setExpanded] = useState({});
    const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility || {});

    const table = useReactTable({
        data,
        columns,
        autoResetPageIndex: false,
        state: {
            sorting,
            rowSelection,
            columnFilters,
            columnVisibility,
            globalFilter,
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
        table.setPageIndex(0);
    }, [columnFilters, sorting]);

    useEffect(() => {
        if (searchTerm && data.length === 1) {
            setExpanded({ "0": true });
        } else {
            setExpanded({});
        }
    }, [data, searchTerm]);

    // Allow parent to request an initial expanded row (by row index)
    useEffect(() => {
        if (!expandable) return;
        if (initialExpandedRowIndex === undefined || initialExpandedRowIndex === null) return;
        if (!data.length) return;
        setExpanded({ [String(initialExpandedRowIndex)]: true });
    }, [initialExpandedRowIndex, expandable, data]);

    // Expose selected rows to parent when requested
    useEffect(() => {
        if (!setSelectedRows) return;
        const selected = table.getFilteredSelectedRowModel().rows.map(r => r.original);
        setSelectedRows(selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowSelection, table]);

    // Allow parent to request clearing selection
    useEffect(() => {
        if (externalRowSelectionResetKey === undefined) return;
        setRowSelection({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [externalRowSelectionResetKey]);

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
                allowSearchFiltering={allowSearchFiltering}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                actionTitle={actionTitle}
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