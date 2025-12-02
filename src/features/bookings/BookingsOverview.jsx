import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import BookingDetails from "./BookingDetails.jsx";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { useBookingsQuery } from "@/queries/useBookingsQuery";
import DashNav from "@/components/dashboard/DashNav.jsx";
import DashboardSearch from "@/components/dashboard/DashboardSearch.jsx";
import { buildStatusFilterOptions, buildTabsFilterConfig } from "./utils/filters";
import SuccessBanner from "@/components/ui/SuccessBanner";
import { useSubmittedBookingBanner } from "@/hooks/useSubmittedBookingBanner";
import { useLocation } from "react-router-dom";

export default function BookingsOverview({ data: propData }) {
  const { t } = useTranslation();
  const [columnFilters, setColumnFilters] = useState([]);
  const location = useLocation();
  const { show: showSuccessBanner, dismiss } = useSubmittedBookingBanner();
  const [expandedRow, setExpandedRow] = useState({});
  const [shouldScroll, setShouldScroll] = useState(false);
  const expandedRowRef = useRef(null);

  // Handle expandRowId from navigation state
  useEffect(() => {
    if (location.state?.expandRowId !== undefined) {
        if (tableData?.length) {
    const firstId = tableData[0].id;
    setExpandedRow({ [firstId]: true });
    setShouldScroll(true);
  }
    }
  }, [location.state]);
  
  // Handle scrolling to expanded row
  useEffect(() => {
    if (shouldScroll && expandedRowRef.current) {
      const timer = setTimeout(() => {
        expandedRowRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setShouldScroll(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldScroll, expandedRow]);




  const { data: fetchedData, isLoading: isFetching } = useBookingsQuery({
    enabled: !propData,
  });

  const tableData = propData || fetchedData;
  const isLoading = propData ? false : isFetching;

  const activeMode = useMemo(() => {
    const modeFilter = columnFilters.find((filterItem) => filterItem.id === "mode");
    return modeFilter ? modeFilter.value : "all";
  }, [columnFilters]);

  const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);
  const statusFilterOptions = useMemo(() => buildStatusFilterOptions(t), [t]);
  const tabsFilterConfig = useMemo(() => buildTabsFilterConfig(t), [t]);

  const handleSetColumnFilters = useCallback((updater) => {
    setColumnFilters((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return Array.isArray(next) ? next : prev;
    });
  }, []);

  const dropdownFilters = useMemo(
    () => [
      {
        columnId: "status",
        title: t("filters.status"),
        options: statusFilterOptions,
      },
    ],
    [statusFilterOptions, t]
  );

  const renderExpandedRow = useCallback(
    (bookingObj) => {
      const isExpanded = expandedRow[bookingObj.id];
      return (
        <div 
          ref={isExpanded ? expandedRowRef : null}
          className="expanded-row-content"
        >
          <BookingDetails booking={bookingObj} />
        </div>
      );
    },
    [expandedRow]
  );

  return (
    <>
      {showSuccessBanner && (
        <SuccessBanner
          title="Your booking has been successfully submitted!"
          onClose={dismiss}
          className="animate-slideDown"
        >
          <p>
            Request Reference Number:{" "}
            <span className="font-medium text-green-900 dark:text-green-200">
              REF-125258
            </span>
          </p>
          <p>You will shortly receive an email confirming your submission</p>
          <p className="font-semibold text-green-900 dark:text-green-100 mt-1">
            Thank you for choosing our service — we appreciate your trust.
          </p>
         
        </SuccessBanner>
      )}

      {!propData && (
        <div className="gap-4 flex flex-col">
          <DashNav DashTitle={t("pageTitles.bookings")} />
          <DashboardSearch />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <DataTable
          columns={columns}
          data={tableData || []}
          isLoading={isLoading}
          columnFilters={columnFilters}
          setColumnFilters={handleSetColumnFilters}
          expanded={expandedRow}
          onExpandedChange={setExpandedRow}
          renderExpandedRow={renderExpandedRow}
          expandable={true}
          tabsFilter={tabsFilterConfig}
          dropdownFilters={dropdownFilters}
          initialColumnVisibility={{ mode: false }}
        />
      </div>
    </>
  );
}
