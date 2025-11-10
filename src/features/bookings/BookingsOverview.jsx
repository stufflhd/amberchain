import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import BookingDetails from "./BookingDetails.jsx";
import { useMemo, useState, useCallback, useEffect } from "react";
import { useBookingsQuery } from "@/queries/useBookingsQuery";
import DashNav from "@/components/dashboard/DashNav.jsx";
import DashboardSearch from "@/components/dashboard/DashboardSearch.jsx";
import { buildStatusFilterOptions, buildTabsFilterConfig } from "./utils/filters";
import SuccessBanner from "@/components/ui/SuccessBanner";

export default function BookingsOverview({ data: propData }) {
  const { t } = useTranslation();
  const [columnFilters, setColumnFilters] = useState([]);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // ✅ Success banner logic (same as QuotationsOverview)
  useEffect(() => {
    const raw = localStorage.getItem("submittedBooking");
    if (!raw) return;

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      localStorage.removeItem("submittedBooking");
      return;
    }

    const expiresAt = parsed?.expiresAt ? Number(parsed.expiresAt) : Date.now() + 30 * 1000;
    const remainingMs = expiresAt - Date.now();
    if (remainingMs <= 0) {
      localStorage.removeItem("submittedBooking");
      return;
    }

    setShowSuccessBanner(true);
    setCountdown(Math.ceil(remainingMs / 1000));

    const timerId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setShowSuccessBanner(false);
          try {
            localStorage.removeItem("submittedBooking");
          } catch (e) {
            void e;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleDismissBanner = () => {
    setShowSuccessBanner(false);
    try {
      localStorage.removeItem("submittedBooking");
    } catch (e) {
      void e;
    }
  };

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
    (bookingObj) => <BookingDetails booking={bookingObj} />,
    []
  );

  return (
    <>
      {showSuccessBanner && (
        <SuccessBanner
          title="Your booking has been successfully submitted!"
          onClose={handleDismissBanner}
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
