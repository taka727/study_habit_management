# study_habit_management
習慣化管理アプリ作成

## 概要
タスク管理と習慣化をサポートするWebアプリケーション

## 技術スタック
- **Backend**: Node.js + Express + Prisma + MySQL
- **Frontend**: Vue.js 3 + TypeScript + Vite
- **API**: OpenAPI 3.0仕様

## セットアップ

### 0. 開発環境の起動 (Devbox)
開発に必要なツール(Node.js 22 / MySQL 8.4 / Python 3.13 / AWS CLI など)は [Devbox](https://www.jetify.com/devbox) で管理しています。

```bash
# Devboxのインストール(未導入の場合)
curl -fsSL https://get.jetify.com/devbox | bash

# 開発シェルに入る(以降のコマンドはこのシェル内で実行)
devbox shell
```

### 1. Backend設定
```bash
cd backend
npm install
cp .env.example .env
# .envファイルを編集してデータベース情報を設定
npx prisma migrate dev
npm run seed
npm start
```

### 2. Frontend設定
```bash
cd frontend
npm install
npm run dev
```

### 3. テスト実行
```bash
cd backend
npm test
```

## フォルダ構造
- `backend/` - Node.js APIサーバー
- `frontend/` - Vue.js フロントエンド
- `document/` - API仕様書・設計書
- `infra/` - AWS CDK (Python) によるインフラ定義(詳細は `infra/README.md`)

## API仕様
`document/OpenAPI/OpenAPI.yaml` を参照
