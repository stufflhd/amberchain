import React from 'react';
import DataTableTabsFilter from "./DataTableTabsFilter";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import DataTableSearchStatus from "./DataTableSearchStatus";
import DataTableBulkActions from './DataTableBulkActions';

export default function DataTableToolbar({ table, tabsFilter, dropdownFilters, searchTerm, onClearSearch, bulkActions }) {
    return (
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2 flex-wrap">
                {tabsFilter?.columnId && (
                    <DataTableTabsFilter
                        table={table}
                        columnId={tabsFilter.columnId}
                        options={tabsFilter.options}
                        allLabel={tabsFilter.allLabel}
                    />
                )}
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
            <div className='flex items-center gap-2 w-fit'>
                <DataTableBulkActions table={table} actions={bulkActions} />
                <DataTableSearchStatus searchTerm={searchTerm} onClear={onClearSearch} />
            </div>
        </div>
    );
}