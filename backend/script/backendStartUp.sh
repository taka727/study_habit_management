#!/bin/bash
# MySQLの起動を待機する。
# ユーザー作成と権限付与は MySQL イメージの MYSQL_USER 環境変数および
# mysql-init/01-init.sql が担当するため、ここでは行わない。
until mysql -h mysql -u root -p"${BACKEND_DB_PASSWORD}" -e 'SELECT 1'; do
    echo 'Waiting for MySQL...'
    sleep 2
done

npm run dev