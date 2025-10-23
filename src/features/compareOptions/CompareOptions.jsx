import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import ShipmentForm from "./component/step1/ShipmentForm"
import CompareResults from "./component/step2/CompareResults"

export default function CompareOptions() {
  const { t } = useTranslation()
  const [showResults, setShowResults] = useState(false)

  const handleFormComplete = () => {
    setShowResults(true)
  }

  return (
    <div className="gap-4 flex flex-col">
      <DashNav DashTitle={t("pageTitles.compare-options")} />
      <h2 className="text-base font-semibold">
        {t("compareOptions.pageTitle")}
      </h2>

      {!showResults ? (
        <ShipmentForm onFormComplete={handleFormComplete} />
      ) : (
        <CompareResults />
      )}
    </div>
  )
}
