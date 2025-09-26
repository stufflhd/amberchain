import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import QuotationDetails from "./QuotationDetails.jsx";
import { useMemo, useState } from "react";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import DashNav from "@/components/dashboard/DashNav";
import { useQuotationsQuery } from "@/queries/useQuotationsQuery";

export default function QuotationsOverview({ data: propData }) {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = useState([]);

    const { data: fetchedData, isLoading: isFetching } = useQuotationsQuery({
        enabled: !propData,
    });

    const tableData = propData || fetchedData;
    const isLoading = propData ? false : isFetching;

    const activeMode = useMemo(() => {
        const modeFilter = columnFilters.find(f => f.id === 'mode');
        return modeFilter ? String(modeFilter.value) : 'all';
    }, [columnFilters]);
    
    const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);

    const modeFilterOptions = [
        { value: "Sea", label: t('quotations.modes.sea') },
        { value: "Air", label: t('quotations.modes.air') },
        { value: "Road", label: t('quotations.modes.road') },
        { value: "Rail", label: t('quotations.modes.rail') },
        { value: "E-BUSINESS", label: t('quotations.modes.ebusiness') },
    ];

    const statusFilterOptions = [
        { value: "pending", label: t('quotations.common.pending') },
        { value: "expired", label: t('quotations.common.expired') },
        { value: "confirmed", label: t('quotations.common.confirmed') },
    ];

    return (
        <>
            {!propData && (
                <div className="gap-4 flex flex-col">
                    <DashNav DashTitle={t('quotations.pageTitle')} />
                    <DashboardSearch />
                </div>
            )}
            <div className="flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={tableData || []}
                    isLoading={isLoading}
                    expandable={true}
                    renderExpandedRow={(qObj) => <QuotationDetails quotation={qObj} />}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    tabsFilter={{
                        columnId: "mode",
                        options: modeFilterOptions,
                        allLabel: t('quotations.common.all'),
                    }}
                    dropdownFilters={[{
                        columnId: "status",
                        title: t('quotations.filters.status'),
                        options: statusFilterOptions,
                    }]}
                    initialColumnVisibility={{ mode: false }}
                />
            </div>
        </>
    );
}