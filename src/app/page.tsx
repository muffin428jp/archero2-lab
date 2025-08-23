'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fallbackLng, languages } from '../i18n/settings'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // ブラウザの言語設定を取得 (例: 'ja-JP', 'en-US', 'en')
    const browserLang = navigator.language

    // 'ja' が含まれていれば日本語、それ以外はデフォルト言語(en)に
    const targetLang =
      languages.find((lang) => browserLang.startsWith(lang)) || fallbackLng

    // 決定した言語のページにリダイレクト
    // replace: ブラウザ履歴にリダイレクト元(`/`)を残さない
    router.replace(`/${targetLang}`)
  }, [router])

  // リダイレクトが実行されるまでの間、短いローディング表示をする
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <p>Loading...</p>
    </div>
  )
}
