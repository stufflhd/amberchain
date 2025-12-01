import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import BookBookingForm from "@/features/book/step1/BookBookingForm"
import PreBookDiv from "@/features/book/step1/PreBookDiv"
import BookResults from "@/features/book/step2/BookResults"
import { useShipmentStore } from "@/store/shipmentStore"

export default function Book() {
  const { t } = useTranslation()
  const [step, setStep] = useState("pre") // "pre" | "form" | "results"
  const { reset } = useShipmentStore()

  const handleUseQuote = () => {
    setStep("form")
  }

  const handleCreateNew = () => {
    reset()
    setStep("form")
  }

  const handleFormComplete = () => {
    setStep("results")
  }

  const handleBackToBooking = () => {
    setStep("form")
  }

  const handleBackToPre = () => {
    setStep("pre")
  }

  return (
    <div className="gap-4 flex flex-col">
      <DashNav DashTitle={t("pageTitles.book")} />
      <h2 className="text-base font-semibold">
        {t("book.pageTitle")}
      </h2>

      {step === "pre" && (
        <div className="flex justify-center mt-2">
          <PreBookDiv
            showCreateNew
            onCreateNew={handleCreateNew}
            onSelectQuote={handleUseQuote}
          />
        </div>
      )}

      {step === "form" && (
        <BookBookingForm 
          onComplete={handleFormComplete} 
          onBack={handleBackToPre}
        />
      )}

      {step === "results" && <BookResults onBackToBooking={handleBackToBooking} />}
    </div>
  )
}
