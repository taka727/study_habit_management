#!/bin/bash
until mysql -h mysql -u root -p"${BACKEND_DB_PASSWORD}" -e 'SELECT 1'; do
    echo 'Waiting for MySQL...'
    sleep 2
done

mysql -h mysql -u root -p"${BACKEND_DB_PASSWORD}" -e "
    CREATE USER IF NOT EXISTS '${BACKEND_USER_ID}'@'%' IDENTIFIED BY '${BACKEND_DB_PASSWORD}';
    GRANT ALL PRIVILEGES ON *.* TO '${BACKEND_USER_ID}'@'%' WITH GRANT OPTION;
    GRANT CREATE ON *.* TO '${BACKEND_USER_ID}'@'%';
    FLUSH PRIVILEGES;
    " 

npm run dev