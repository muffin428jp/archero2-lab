import React from 'react'
import HomePageClient from './HomePageClient'
import { generateLangStaticParams } from '../../lib/generateStaticParams'
export { generateLangStaticParams as generateStaticParams }

// Homeページコンポーネント本体
export default async function Home({
  params,
}: {
  params?: Promise<{ lang: string }>
}) {
  const resolved = params ? await params : { lang: 'en' }
  const { lang } = resolved
  // サーバーコンポーネントからクライアントコンポーネントにpropsを渡す
  return <HomePageClient lang={lang} />
}
