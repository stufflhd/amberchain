import React, { Fragment } from 'react';
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from 'react-i18next';
import TableSkeleton from './TableSkeleton';

export default function DataTableBody({ table, columns, expandable, renderExpandedRow, onRowClick, isLoading }) {
    const { t } = useTranslation();

    const renderTableContent = () => {
        if (isLoading) {
            return <TableSkeleton columnCount={columns.length} />;
        }
        
        if (table.getRowModel().rows?.length) {
            return table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                    <TableRow
                        data-state={row.getIsSelected() && "selected"}
                        className={expandable ? "cursor-pointer hover:bg-muted/50" : ""}
                        onClick={expandable ? () => onRowClick(row) : undefined}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className={'text-sm'}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                    {expandable && row.getIsExpanded() && (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {renderExpandedRow(row.original)}
                            </TableCell>
                        </TableRow>
                    )}
                </Fragment>
            ));
        }

        return (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    {t('search.noResults')}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <div className="overflow-hidden rounded-md border">
            <Table className={'w-full'}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {renderTableContent()}
                </TableBody>
            </Table>
        </div>
    );
}