import React from "react";
import { useTranslation } from "react-i18next";
import DashNav from "@/components/dashboard/DashNav";
import ShipmentForm from "./component/ShipmentForm";

export default function CompareOptions() {
  const { t } = useTranslation();
  return (
    <>
      <div className="gap-4 flex flex-col">
        <DashNav DashTitle={t("pageTitles.compare-options")} />
        <ShipmentForm />
      </div>

      <h2 className="text-base font-semibold">
        {t("compareOptions.pageTitle")}
      </h2>
    </>
  );
}
