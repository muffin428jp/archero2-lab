import type { ReactNode } from 'react'

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode
  params?: Promise<{ lang: string }>
}) {
  const resolved = params ? await params : { lang: 'en' }
  const { lang } = resolved
  return <div data-lang={lang}>{children}</div>
}
