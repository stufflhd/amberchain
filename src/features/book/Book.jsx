import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import BookBookingForm from "@/features/book/step1/BookBookingForm"
import PreBookDiv from "@/features/book/step1/PreBookDiv"
import { useShipmentStore } from "@/store/shipmentStore"

export default function Book() {
  const { t } = useTranslation()
  const [showNewBooking, setShowNewBooking] = useState(false)
  const { reset } = useShipmentStore()
  const handleUseQuote = () => {
    setShowNewBooking(true)
  }

  const handleCreateNew = () => {
    reset()
    setShowNewBooking(true)
  }

  return (
    <div className="gap-4 flex flex-col">
      <DashNav DashTitle={t("pageTitles.book")} />
      <h2 className="text-base font-semibold">
        {t("book.pageTitle")}
      </h2>

      {!showNewBooking && (
        <div className="flex justify-center mt-2">
          <PreBookDiv
            showCreateNew
            onCreateNew={handleCreateNew}
            onSelectQuote={handleUseQuote}
          />
        </div>
      )}

      {showNewBooking && <BookBookingForm />}
    </div>
  )
}
