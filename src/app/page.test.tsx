import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('should render the Next.js logo', () => {
    // 1. Homeコンポーネントをレンダリングする
    render(<Home />)

    // 2. "Next.js Logo" という代替テキストを持つ画像を探す
    // getByRole('img') は <img> タグを探し、nameはそのアクセシビリティ名(altテキストなど)を指す
    const logoImage = screen.getByRole('img', { name: /Next.js Logo/i })

    // 3. その画像がドキュメント内に存在することを検証する
    expect(logoImage).toBeInTheDocument()
  })
})
