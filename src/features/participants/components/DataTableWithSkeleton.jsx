import { useEffect, useMemo, useRef, useState } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import TableSkeleton from '@/components/tables/TableSkeleton';
import { Table, TableBody } from '@/components/ui/table';

export default function DataTableWithSkeleton({ isLoading, columns, data, columnCount, rowCount = 3, setSelectedRows, selectedRows, ...props }) {
    const [showTable, setShowTable] = useState(false);
    const skeletonRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(null);
    
    const ColumnsWithClickToSelect = useMemo(() => (columns || []).map((col) => {
        if (col?.id === 'select') return col;
        const originalCell = col?.cell;
        return {
            ...col,
            cell: (ctx) => {
                const content = originalCell ? originalCell(ctx) : (typeof ctx.getValue === 'function' ? ctx.getValue() : null);
                return (
                    <div
                        className="cursor-pointer"
                        onClick={(e) => {
                            if (e.target.closest('button, a, input, label, [role="button"], [data-no-row-click], svg')) return;
                            e.stopPropagation();
                            ctx.row.toggleSelected(!ctx.row.getIsSelected());
                        }}
                    >
                        {content}
                    </div>
                );
            }
        };
    }), [columns]);

    useEffect(() => {
        if (isLoading) {
            setShowTable(false);
            return;
        }

        const timer = setTimeout(() => {
            if (skeletonRef.current && !containerWidth) {
                setContainerWidth(skeletonRef.current.offsetWidth);
            }
            setShowTable(true);
        }, 150);

        return () => clearTimeout(timer);
    }, [isLoading, containerWidth]);

    if (!showTable || isLoading) {
        return (
            <Table ref={skeletonRef} className={'w-full'}>
                <TableBody>
                    <TableSkeleton columnCount={columnCount} rowCount={rowCount} />
                </TableBody>
            </Table>
        );
    }

    return (
        <div style={{ width: containerWidth ? `${containerWidth}px` : 'auto' }} className='space-y-4 [&_.dataTablePagination]:hidden [&_.dataTableBulkActions]:mt-4'>
            <DataTable
                columns={ColumnsWithClickToSelect}
                data={data}
                setSelectedRows={setSelectedRows}
                {...props}
            />
        </div>
    );
}