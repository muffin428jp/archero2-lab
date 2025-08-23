import './globals.css'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang } = await params
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  )
}
