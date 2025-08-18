# 📝 プロジェクト初期セットアップログ：Archero 2 Lab

このドキュメントは、本プロジェクトがどのように初期セットアップされたかに関する**作業ログ**である。

---

## 1. コンテナ環境のセットアップ

本プロジェクトの初期セットアップは、以下の設定を持つ**Dev Container** 内で実行されました。
VS Code で Dev Container の設定ファイルの生成をした。

- **Dev Container Configuration**: `.devcontainer/devcontainer.json`
- **Base Image / Dockerfile**: 上記 json の image を参照

コンテナがビルドされ、VS Codeがコンテナ環境に接続された後、以下の手順でプロジェクトの初期化を行った。

## 2. Next.js スケルトンの生成

プロジェクトディレクトリ (`archero2-lab`) の作成とNext.jsスケルトンの生成は、以下の `npx create-next-app` コマンドを用いて行われました。

```bash
# プロジェクトルートディレクトリで実行
npx create-next-app@latest . \
  --typescript \         # TypeScriptを使用する (デフォルト)
  --eslint \             # ESLintを使用する
  --tailwind \           # Tailwind CSSを使用する (デフォルト)
  --app \                # App Routerを使用する (デフォルト)
  --src-dir \            # `src/` ディレクトリを使用する
  --turbopack \          # Turbopackを使用する (デフォルト)
  --import-alias '@/*'   # import alias を変更しない (対話式にしないため明示的に指定)
```

## 3. 開発環境の整備（コード品質の強制）

### Prettier コードフォーマッターの導入

npm install --save-dev prettier eslint-config-prettier
