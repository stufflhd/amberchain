import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import BookBookingForm from "@/features/book/BookBookingForm"
import QuoteHelperCard from "@/features/book/QuoteHelperCard"

export default function Book() {
  const { t } = useTranslation()
  const [showNewBooking, setShowNewBooking] = useState(false)
  const handleUseQuote = () => {
    setShowNewBooking(true)
  }

  const handleCreateNew = () => {
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
          <QuoteHelperCard
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
