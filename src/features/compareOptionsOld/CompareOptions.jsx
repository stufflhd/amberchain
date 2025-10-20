import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import DashNav from "@/components/dashboard/DashNav";
import CompareOptionsForm from "./components/CompareOptionsForm";
import CompareOptionsResults from "./results/CompareOptionsResults";

export default function CompareOptions() {
  const { t } = useTranslation();
  const [showResults, setShowResults] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([]);

  const handleFormComplete = (options) => {
    setShippingOptions(options);
    setShowResults(true);
  };

  const handleBackToForm = () => {
    setShowResults(false);
  };

  const handleBook = (option) => {
    console.log("Booking option:", option);
    // Navigate to booking page
  };

  if (showResults) {
    return (
      <CompareOptionsResults
        options={shippingOptions}
        onBook={handleBook}
        onBack={handleBackToForm}
      />
    );
  }

  return (
    <>
      <div className="gap-4 flex flex-col">
        <DashNav DashTitle={t("pageTitles.compare-options")} />
        <DashboardSearch />
      </div>

      <h2 className="text-2xl font-semibold">
        {t("compareOptions.pageTitle")}
      </h2>

      <CompareOptionsForm onComplete={handleFormComplete} />
    </>
  );
}
