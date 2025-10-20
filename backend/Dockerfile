FROM node:22-slim

WORKDIR /app

# パッケージファイルをコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# MySQLクライアントをインストール
RUN apt-get update && apt-get install -y default-mysql-client

# アプリケーションコードをコピー
COPY . .

# Prismaのクライアントを生成
RUN npx prisma generate

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "dev"]
