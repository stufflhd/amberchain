import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import BookingDetails from "./BookingDetails.jsx";
import { useMemo, useState, useCallback } from "react";
import { useBookingsQuery } from "@/queries/useBookingsQuery";
import DashNav from "@/components/dashboard/DashNav.jsx";
import DashboardSearch from "@/components/dashboard/DashboardSearch.jsx";
import { buildStatusFilterOptions, buildTabsFilterConfig } from "./utils/filters";

export default function BookingsOverview({ data: propData }) {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = useState([]);

    const { data: fetchedData, isLoading: isFetching } = useBookingsQuery({
        enabled: !propData,
    });

    const tableData = propData || fetchedData;
    const isLoading = propData ? false : isFetching;

    const activeMode = useMemo(() => {
        const modeFilter = columnFilters.find((filterItem) => filterItem.id === 'mode');
        return modeFilter ? modeFilter.value : 'all';
    }, [columnFilters]);

    const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);

    const statusFilterOptions = useMemo(() => buildStatusFilterOptions(t), [t]);
    const tabsFilterConfig = useMemo(() => buildTabsFilterConfig(t), [t]);

    const handleSetColumnFilters = useCallback((updater) => {
        setColumnFilters((prev) => {
            const next = typeof updater === 'function' ? updater(prev) : updater;
            return Array.isArray(next) ? next : prev;
        });
    }, []);

    const dropdownFilters = useMemo(() => ([
        {
            columnId: "status",
            title: t('filters.status'),
            options: statusFilterOptions,
        },
    ]), [statusFilterOptions, t]);

    const renderExpandedRow = useCallback((bookingObj) => (
        <BookingDetails booking={bookingObj} />
    ), []);

    return (
        <>
            {!propData && (
                <div className="gap-4 flex flex-col">
                    <DashNav DashTitle={t('pageTitles.bookings')} />
                    <DashboardSearch />
                </div>
            )}
            <div className="flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={tableData || []}
                    isLoading={isLoading}
                    expandable={true}
                    renderExpandedRow={renderExpandedRow}
                    columnFilters={columnFilters}
                    setColumnFilters={handleSetColumnFilters}
                    tabsFilter={tabsFilterConfig}
                    dropdownFilters={dropdownFilters}
                    initialColumnVisibility={{ mode: false }}
                />
            </div>
        </>
    );
}