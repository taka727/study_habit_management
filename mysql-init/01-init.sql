-- MySQL 8.0 初期化スクリプト
-- Docker起動時に自動実行される

-- ROOTユーザーの権限確認
SELECT 'ROOT user grants:' as info;
SHOW GRANTS FOR 'root'@'%';

-- study_userに全権限付与（シャドウDB作成用）
GRANT ALL PRIVILEGES ON *.* TO 'study_user'@'%' WITH GRANT OPTION;
GRANT CREATE ON *.* TO 'study_user'@'%';
FLUSH PRIVILEGES;

-- データベースが存在しない場合は作成
CREATE DATABASE IF NOT EXISTS study_habit_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- study_userにstudy_habit_dbの全権限付与
GRANT ALL PRIVILEGES ON study_habit_db.* TO 'study_user'@'%';
FLUSH PRIVILEGES;

-- 権限確認
SELECT 'Study user grants:' as info;
SHOW GRANTS FOR 'study_user'@'%';

-- 作成されたデータベース確認
SHOW DATABASES;

SELECT 'MySQL初期化完了' as status;