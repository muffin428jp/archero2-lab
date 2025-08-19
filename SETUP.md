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

### ブランチ

chore/setup-developer-tooling

### 1. Prettier コードフォーマッターの導入

コードの見た目をプロジェクト全体で統一し、スタイルに関する不要な議論をなくす。ファイル保存時に自動整形を行う。

```bash
# 関連パッケージのインストール
npm install --save-dev prettier eslint-config-prettier
```

### 2. コミット前品質チェック (Husky + lint-staged)

コミット直前にESLintとPrettierを自動実行し、品質の低いコードの混入を物理的に防ぐ。

```bash
# 関連パッケージのインストール
npm install --save-dev husky lint-staged

# Husky v9 の初期化
npx husky init

# pre-commitフックの設定
echo "lint-staged" > .husky/pre-commit
# package.json は手動で編集
```

### 3. コミットメッセージ規約 (commitlint)

Conventional Commits規約を強制し、Git履歴の可読性と一貫性を保つ。

```bash
# 関連パッケージのインストール
npm install --save-dev @commitlint/cli @commitlint/config-conventional

# 設定ファイルの作成
touch commitlint.config.js

# commit-msgフックの設定
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
```
