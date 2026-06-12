'use client'

import { useLocale } from '@/contexts/LocaleContext'

export default function HomeHeader() {
  const { t } = useLocale()
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-brand-blue mb-2">{t('home.title')}</h1>
      <p className="text-gray-600">{t('home.subtitle')}</p>
    </div>
  )
}
