import { useMemo, useState } from "react";

export function useContainerFilters(fetchedData) {
    const [columnFilters, setColumnFilters] = useState([]);

    const activeMode = useMemo(() => {
        const modeFilter = columnFilters.find(f => f.id === 'mode');
        return modeFilter ? modeFilter.value : 'all';
    }, [columnFilters]);

    const statusFilterOptions = useMemo(() => {
        const rows = Array.isArray(fetchedData) ? fetchedData : [];
        const unique = Array.from(new Set(rows.map(r => r.status).filter(Boolean)));
        return unique.map(s => ({ value: s, label: s }));
    }, [fetchedData]);

    const typeFilterOptions = [
        { value: "40' Reefer High", label: "40' Reefer High" },
        { value: "Reefer", label: "Reefer" },
        { value: "40' Dry Van", label: "40' Dry Van" },
        { value: "Small Parcel", label: "Small Parcel" },
    ];

    return {
        columnFilters,
        setColumnFilters,
        activeMode,
        statusFilterOptions,
        typeFilterOptions,
    };
}


