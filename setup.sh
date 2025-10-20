#!/bin/bash

# .envファイルの読み込み
if [ -f .env ]; then
    source .env
else
    echo ".envファイルが見つかりません"
    exit 1
fi

echo "Docker環境セットアップ開始"

# Docker Composeコマンドの確認と設定
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo "Docker Composeが見つかりません"
    echo "Dockerをインストールしてください: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✅ 使用するコマンド: $DOCKER_COMPOSE"

# 既存のコンテナをクリーンアップ
echo "既存のコンテナとボリュームをクリーンアップ中..."
$DOCKER_COMPOSE down -v

# 既存マイグレーション削除
echo "既存マイグレーション履歴を削除中..."
rm -rf backend/prisma/migrations

# mysql-initディレクトリ作成
mkdir -p mysql-init

# MySQLコンテナ起動
echo "MySQLコンテナを起動中..."
$DOCKER_COMPOSE up -d mysql

# MySQLの健康状態チェック
echo "MySQLの起動を待機中..."
for i in {1..30}; do
    if $DOCKER_COMPOSE exec mysql mysqladmin ping -h localhost -u root -p"${MYSQL_ROOT_PASSWORD}" --silent; then
        echo "MySQL起動完了"
        break
    fi
    echo "待機中... ($i/30)"
    sleep 5
done

# 初期化確認
echo "MySQL初期化状況確認..."
$DOCKER_COMPOSE logs mysql | tail -20

# Backendコンテナ起動
echo "Backendを起動中..."
$DOCKER_COMPOSE up -d backend

# Backendの起動待機
echo "Backendの起動を待機中..."
sleep 15

# 新しいマイグレーション作成
echo "新しいマイグレーションを作成中..."
$DOCKER_COMPOSE exec backend npx prisma migrate dev --name fresh-docker-init

if [ $? -eq 0 ]; then
    echo "マイグレーション完了"
    
    # シードデータ投入
    echo "シードデータを投入中..."
    $DOCKER_COMPOSE exec backend npm run seed
    
    if [ $? -eq 0 ]; then
        echo "シード投入完了"
    else
        echo "シード投入に失敗しました"
        $DOCKER_COMPOSE logs backend
    fi
else
    echo "マイグレーションに失敗しました"
    $DOCKER_COMPOSE logs backend
    exit 1
fi

# Frontendコンテナ起動
echo "Frontendを起動中..."
$DOCKER_COMPOSE up -d frontend

echo "✅ セットアップ完了!"
echo "📱 Frontend: http://localhost:${FRONTEND_PORT}"
echo "🔗 Backend: http://localhost:${BACKEND_PORT}"
echo "🗄️ Database: localhost:${MYSQL_PORT}"
echo ""
echo "🔧 有用なコマンド:"
echo "   docker compose logs backend  # Backendログ確認"
echo "   docker compose logs mysql    # MySQLログ確認"
echo "   docker compose exec backend npx prisma studio  # Prisma Studio起動"