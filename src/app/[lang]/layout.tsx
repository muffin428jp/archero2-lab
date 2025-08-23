import './globals.css'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang } = await params
  return <div data-lang={lang}>{children}</div>
}
