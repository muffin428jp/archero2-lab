import React from 'react'

// このレイアウトは、src/app/page.tsx (リダイレクトページ) のために存在する
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html> と <body> タグを提供する
    // lang属性はリダイレクト先で設定されるため、ここでは不要
    <html>
      <body>{children}</body>
    </html>
  )
}
