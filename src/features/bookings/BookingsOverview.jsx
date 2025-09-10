import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import BookingDetails from "./BookingDetails.jsx";
import { useMemo, useState } from "react";
import { useBookingsQuery } from "@/queries/useBookingsQuery";
import DashNav from "@/components/dashboard/DashNav.jsx";
import DashboardSearch from "@/components/dashboard/DashboardSearch.jsx";

export default function BookingsOverview({ data: propData }) {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = useState([]);

    const { data: fetchedData, isLoading: isFetching } = useBookingsQuery({
        enabled: !propData,
    });

    const tableData = propData || fetchedData;
    const isLoading = propData ? false : isFetching;

    const activeMode = useMemo(() => {
        const modeFilter = columnFilters.find(f => f.id === 'mode');
        return modeFilter ? modeFilter.value : 'all';
    }, [columnFilters]);

    const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);

    const modeFilterOptions = [
        { value: "Sea", label: t('modes.sea') },
        { value: "Air", label: t('modes.air') },
        { value: "Road", label: t('modes.road') },
        { value: "Rail", label: t('modes.rail') },
        { value: "E-BUSINESS", label: t('modes.ebusiness') },
    ];

    const statusFilterOptions = [
        { value: "Confirmed", label: t('bookings.status.confirmed') },
        { value: "Pending", label: t('bookings.status.pending') },
        { value: "Cancelled", label: t('bookings.status.cancelled') },
    ];

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
                    renderExpandedRow={(bookingObj) => <BookingDetails booking={bookingObj} />}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    tabsFilter={{
                        columnId: "mode",
                        options: modeFilterOptions,
                        allLabel: t('common.all'),
                    }}
                    dropdownFilters={[
                        {
                            columnId: "status",
                            title: t('filters.status'),
                            options: statusFilterOptions,
                        },
                    ]}
                    initialColumnVisibility={{ mode: false }}
                />
            </div>
        </>
    );
}