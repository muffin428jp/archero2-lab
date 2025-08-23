import React from 'react'
import HomePageClient from './HomePageClient'
import { generateLangStaticParams } from '../../lib/generateStaticParams'
export { generateLangStaticParams as generateStaticParams }

// Homeページコンポーネント本体
export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params
  // サーバーコンポーネントからクライアントコンポーネントにpropsを渡す
  return <HomePageClient lang={lang} />
}
