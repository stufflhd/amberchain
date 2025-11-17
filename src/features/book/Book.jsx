import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DashNav from "@/components/dashboard/DashNav"
import BookBookingForm from "@/features/book/BookBookingForm"

export default function Book() {
  const { t } = useTranslation()

  return (
    <div className="gap-4 flex flex-col">
      <DashNav DashTitle={t("pageTitles.book")} />
      <h2 className="text-base font-semibold">
        {t("book.pageTitle")}
      </h2>
      <BookBookingForm />
    </div>
  )
}
