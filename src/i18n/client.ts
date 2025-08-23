'use client'

import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
} from 'react-i18next'

import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, defaultNS } from './settings'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ['path', 'htmlTag'],
    },
  })

export function useTranslation(
  lng: string,
  ns: string = defaultNS,
  options?: UseTranslationOptions<string>
) {
  if (i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng)
  }
  return useTranslationOrg(ns, options)
}
