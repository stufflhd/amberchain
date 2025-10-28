import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import QuotationDetails from "./QuotationDetails.jsx";
import { useMemo, useState } from "react";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import DashNav from "@/components/dashboard/DashNav";
import { useQuotationsQuery } from "@/queries/useQuotationsQuery";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";


export default function QuotationsOverview({ data: propData }) {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = useState([]);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  useEffect(() => {
    const booking = localStorage.getItem("submittedBooking");
    if (booking) {
      setShowSuccessBanner(true);
      // Optionally remove after showing once
      localStorage.removeItem("submittedBooking");
    }
  }, []);

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
         {showSuccessBanner && (
   <div className="flex items-start gap-3 bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-800 rounded-lg p-4 shadow-sm animate-slideDown">
  <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6 mt-0.5 flex-shrink-0" />
  <div className="text-sm text-green-800 dark:text-green-200">
    <p className="font-semibold text-green-900 dark:text-green-100">
    Your booking has been successfully submitted!
    </p>
    <p className="text-green-700 dark:text-green-300">
      Request Reference Number:{" "}
      <span className="font-medium text-green-900 dark:text-green-200">
        REF-{Math.floor(100000 + Math.random() * 900000)}
      </span>
    </p>
    <p className="text-green-700 dark:text-green-300">
      You will shortly receive an email confirming your submission. Within 2 hours, our team will review and validate your request.
    </p>
    <p className="font-semibold text-green-900 dark:text-green-100 mt-1">
      Thank you for choosing our service — we appreciate your trust.
    </p>
  </div>
</div>

      )}
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