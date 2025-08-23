// モックは対象モジュールを import する前に登録する
jest.mock('../../i18n/client', () => ({
  useTranslation: (lang: string) => ({
    t: (key: string) => {
      if (key === 'title') {
        return lang === 'ja' ? 'アーチャー伝説2 ラボ' : 'Archero2 Lab'
      }
      return key
    },
  }),
}))

import { render, screen } from '@testing-library/react'
// サーバー（async）な page ではなくクライアントコンポーネントをテストする
import HomePageClient from './HomePageClient'

describe('Home Page (client)', () => {
  it('should render the title in English', () => {
    render(<HomePageClient lang="en" />)
    const heading = screen.getByRole('heading', { name: /Archero2 Lab/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render the title in Japanese', () => {
    render(<HomePageClient lang="ja" />)
    const heading = screen.getByRole('heading', {
      name: /アーチャー伝説2 ラボ/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
