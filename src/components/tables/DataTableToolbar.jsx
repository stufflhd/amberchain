import React from 'react';
import DataTableTabsFilter from "./DataTableTabsFilter";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import DataTableSearchStatus from "./DataTableSearchStatus";
import DataTableBulkActions from './DataTableBulkActions';
import DataTableGlobalSearch from './DataTableGlobalSearch';

export default function DataTableToolbar({ table, tabsFilter, dropdownFilters, searchTerm, onClearSearch, bulkActions, globalFilter, setGlobalFilter, actionTitle }) {
    return (
        <div className="dataTableToolbar flex items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
            {tabsFilter?.columnId && (
                <DataTableTabsFilter
                    table={table}
                    columnId={tabsFilter.columnId}
                    options={tabsFilter.options}
                    allLabel={tabsFilter.allLabel}
                />
            )}
            <div className="flex items-center gap-4 mr-auto">
                {dropdownFilters?.map((filter) =>
                    table.getColumn(filter.columnId) && (
                        <DataTableFacetedFilter
                            key={filter.columnId}
                            column={table.getColumn(filter.columnId)}
                            title={filter.title}
                            options={filter.options}
                        />
                    )
                )}
            </div>
            {globalFilter !== undefined && setGlobalFilter && (
                <DataTableGlobalSearch
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            )}
            <DataTableBulkActions table={table} actions={bulkActions} actionTitle={actionTitle} />
            <DataTableSearchStatus searchTerm={searchTerm} onClear={onClearSearch} />
        </div>
    );
}