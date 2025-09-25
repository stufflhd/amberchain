import React from 'react'
import { useTranslation } from 'react-i18next'

export default function AdminPage() {
  const { t } = useTranslation();
  return (
    <div>{t('pageTitles.admin')}</div>
  )
}
