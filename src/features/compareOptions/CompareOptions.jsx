import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import ShipmentForm from "./component/step1/ShipmentForm"
import CompareResults from "./component/step2/CompareResults"
import { useShipmentStore } from "@/store/shipmentStore"
import { DUMMY_SHIPMENT } from "@/constants/dummyShipment"
import { MOCK_SHIPPING_OPTIONS } from "@/constants/compareOptionsResults"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CompareOptions({
  enableServicePopup = true,
  resultsCtaLabel = "Book Now",
  enableBookingPopup = true,
  onResultsCtaClick,
  prefillDummy = false,
} = {}) {
  const { t } = useTranslation()
  const [showResults, setShowResults] = useState(false)
  const setField = useShipmentStore((s) => s.setField)
  const setWizardSelection = useShipmentStore((s) => s.setWizardSelection)

  useEffect(() => {
    if (!prefillDummy) return
    // Prefill shipment store with dummy data once
    Object.entries(DUMMY_SHIPMENT).forEach(([key, value]) => {
      if (key === "wizardSelection") return
      setField(key, value)
    })
    if (DUMMY_SHIPMENT.wizardSelection) {
      setWizardSelection(DUMMY_SHIPMENT.wizardSelection)
    }
    setShowResults(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillDummy])

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
        <ShipmentForm onFormComplete={handleFormComplete} enableServicePopup={enableServicePopup} />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-muted/20 border rounded-md px-3 py-2">
            <Button variant="outline" size="sm" onClick={() => setShowResults(false)} className="gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-sm text-muted-foreground">
              {MOCK_SHIPPING_OPTIONS.length} options found
            </div>
          </div>
          {MOCK_SHIPPING_OPTIONS.map((opt) => (
            <CompareResults
              key={opt.id}
              ctaLabel={resultsCtaLabel}
              enableBookingPopup={enableBookingPopup}
              onCtaClick={onResultsCtaClick}
              priceOverride={opt.price}
              resultMeta={opt}
            />
          ))}
        </div>
      )}
    </div>
  )
}
