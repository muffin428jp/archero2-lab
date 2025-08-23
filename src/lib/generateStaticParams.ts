import { languages } from '../i18n/settings'

export function generateLangStaticParams() {
  return languages.map((lang: string) => ({ lang }))
}
