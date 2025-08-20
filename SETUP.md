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

### 4：CI/CDパイプラインの確立 (GitHub Actions)

このフェーズの目的は、GitHubリポジトリへの変更をトリガーに、アプリケーションのビルドとGitHub Pagesへのデプロイを自動化するCI/CDパイプラインを構築することである。

#### 1. GitHubリポジトリの設定変更

ワークフローがリポジトリへの書き込みとデプロイを実行できるよう、必要な権限を付与する。

- **Actionsの書き込み権限許可:**
  - `Settings` > `Actions` > `General` へ移動する。
  - `Workflow permissions` を `Read and write permissions` に設定する。
- **Pagesのデプロイ元設定:**
  - `Settings` > `Pages` へ移動する。
  - `Build and deployment` の `Source` を `GitHub Actions` に設定する。

#### 2. Next.js設定ファイルの修正

GitHub Pagesがサブディレクトリで公開されることに対応するため、`next.config.mjs`を修正する。

- `basePath` と `assetPrefix` を設定に追加する。
- これらの設定は、環境変数 `GITHUB_ACTIONS` が `true` の場合にのみ有効になるよう条件分岐させる。これにより、ローカル開発環境に影響が出るのを防ぐ。

#### 3. ワークフローファイルの分割と作成

責務に応じて、CI（品質チェック）とCD（デプロイ）のワークフローファイルを分割する。

- **`push-check.yml` (プッシュ時スモークテスト):**
  - フィーチャーブランチへの`push`をトリガーに実行される。`main`ブランチは対象外とする。
  - 高速なフィードバックを提供するため、依存関係のインストールとビルドチェックのみを実行する。
- **`pull_request-check.yml` (PR時クオリティゲート):**
  - `main`ブランチをターゲットとする`pull_request`をトリガーに実行される。
  - マージ前の品質を担保するため、リントチェック、テスト、ビルドなど、包括的なチェックを実行する。
- **`deploy.yml` (デプロイ):**
  - `main`ブランチへの`push`（マージ）をトリガーに実行される。
  - ビルド成果物をアーティファクトとしてアップロードし、GitHub Pagesへデプロイする。

#### 4. `.nvmrc`ファイルの追加

CI環境とローカル環境のNode.jsバージョンを確実に一致させるため、`.nvmrc`ファイルに現在のNode.jsバージョンをファイルに書き出す。

```bash
node --version > .nvmrc
```

#### 5. ブランチ保護ルールの設定

`main`ブランチの品質を保護するため、マージに条件を設定する。

- `Settings` > `Branches` で、`main`ブランチの保護ルールを編集する。
- `Require status checks to pass before merging` を有効にする。
- 必須チェックとして、`pull_request-check.yml`で定義したジョブ（例: `quality-check`）を指定する。
