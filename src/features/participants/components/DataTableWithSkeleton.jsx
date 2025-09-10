import { useEffect, useRef, useState } from 'react';
import { DataTable } from '@/components/tables/DataTable';
import TableSkeleton from '@/components/tables/TableSkeleton';
import { Table, TableBody } from '@/components/ui/table';

export default function DataTableWithSkeleton({ isLoading, columns, data, columnCount, rowCount = 3, ...props }) {
    const [showTable, setShowTable] = useState(false);
    const skeletonRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(null);

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
        <div style={{ width: containerWidth ? `${containerWidth}px` : 'auto' }} className='space-y-4 [&_.dataTablePagination]:hidden [&_.dataTableBulkActions]:-mt-10'>
            <DataTable
                columns={columns}
                data={data}
                {...props}
            />
        </div>
    );
}