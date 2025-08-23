'use client'
import Image from 'next/image'
import { useTranslation } from '../../i18n/client'

export default function HomePageClient({ lang }: { lang: string }) {
  const { t } = useTranslation(lang)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute ...">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        {/* ... */}
      </div>
    </main>
  )
}
