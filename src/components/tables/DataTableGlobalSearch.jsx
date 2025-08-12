import React from 'react'
import { Input } from '../ui/input'

export default function DataTableGlobalSearch({globalFilter,setGlobalFilter}) {
    return (
        <div className="flex items-center">
            <Input
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(String(e.target.value))}
                placeholder="Search..."
                className="min-w-sm w-min"
            />
        </div>
    )
}
