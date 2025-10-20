# study_habit_management
習慣化管理アプリ作成

## 概要
タスク管理と習慣化をサポートするWebアプリケーション

## 技術スタック
- **Backend**: Node.js + Express + Prisma + MySQL
- **Frontend**: Vue.js 3 + TypeScript + Vite
- **API**: OpenAPI 3.0仕様

## セットアップ

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

## API仕様
`document/OpenAPI/OpenAPI.yaml` を参照
