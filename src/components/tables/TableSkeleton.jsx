import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { TableRow, TableCell } from '@/components/ui/table'

export default function TableSkeleton({ columnCount, rowCount = 5 }) {
    return (
        <>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columnCount }).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}