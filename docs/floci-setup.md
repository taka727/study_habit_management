# Floci 環境構築手順

Floci は LocalStack 代替の AWS ローカルエミュレータ。S3 / SQS / DynamoDB / Lambda / Cognito など 20 以上の AWS サービスを、実際の AWS アカウントなしでローカル実行できる。起動が非常に速く（数十ms、LocalStack は約3秒）、メモリ使用量も約13MiBと軽量なため、ローカル開発や CI に向いている。

- 公式リポジトリ: https://github.com/floci-io/floci
- 公式ドキュメント: https://floci.io/floci/

## 前提条件

- Docker 20.10 以降
- Docker Compose v2 以降（`docker compose` プラグイン構文）

このプロジェクトは Devbox で開発環境を管理しているが、Floci は Docker コンテナとして動くため devbox.json の変更は不要。

## Docker イメージの種類

| イメージ | 用途 |
|---|---|
| `floci/floci:latest` | ネイティブイメージ（推奨）。1秒未満で起動、メモリ約13MiB |
| `floci/floci:latest-jvm` | 標準 OpenJDK 実行環境。非標準アーキテクチャやプロファイリング用 |
| `floci/floci:latest-compat` | AWS CLI / Python3 / boto3 同梱。初期化フックで aws コマンドを使う場合 |

> 注意: 旧イメージ `hectorvent/floci` は更新が停止しているので使わないこと。

## 起動方法

### 方法1: docker run（お試し用）

```bash
docker run -d --name floci \
  -p 4566:4566 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -u root \
  floci/floci:latest
```

※ Docker ソケットのマウントと `-u root` は Lambda など、コンテナを起動するサービスを使う場合に必要。S3 や SQS だけなら省略可。

### 方法2: docker compose（このプロジェクトへの組み込み）

既存の `docker-compose.yml` にサービスを追加する例（プロジェクトの profiles / networks 構成に合わせてある）:

```yaml
  # Floci (AWSローカルエミュレータ)
  floci:
    profiles: ["dev", "full"]
    image: floci/floci:latest
    container_name: ${APP_NAME}_floci
    ports:
      - "4566:4566"
    environment:
      FLOCI_HOSTNAME: floci            # コンテナ間通信用（他コンテナから http://floci:4566 で接続）
      FLOCI_STORAGE_MODE: memory       # 永続化する場合は persistent / hybrid に変更
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock   # Lambda等を使う場合のみ必要
    networks:
      - app_network
```

起動:

```bash
docker compose --profile dev up -d floci
```

### 方法3: 公式 CLI

```bash
floci start
eval $(floci env)   # AWS_ENDPOINT_URL 等の環境変数を自動設定
```

## AWS CLI / SDK からの接続

全サービスのエンドポイントはポート 4566 に集約されている。認証情報は空でなければ何でもよい（ダミー値で動作、実 AWS アカウント不要）。

```bash
export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_DEFAULT_REGION=us-east-1
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test

# 動作確認
aws s3 mb s3://test-bucket
aws s3 ls
```

Node.js（AWS SDK v3）からの接続例:

```ts
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL ?? "http://localhost:4566",
  region: "us-east-1",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
  forcePathStyle: true, // S3はパススタイル推奨
});
```

バックエンドコンテナから接続する場合のエンドポイントは `http://floci:4566`（compose のサービス名で解決）。

## ポート構成

| サービス | ポート | 説明 |
|---|---|---|
| 全 AWS API | 4566 | メインエントリーポイント |
| ElastiCache | 6379-6399 | TCP プロキシ |
| RDS | 7001-7099 | TCP プロキシ |
| ECR | 5100-5199 | サイドカー直接バインド |

## データの永続化

デフォルトはメモリモード（コンテナ停止でデータ消滅）。永続化する場合:

```yaml
    environment:
      FLOCI_STORAGE_MODE: hybrid            # memory / persistent / hybrid / wal
      FLOCI_STORAGE_PERSISTENT_PATH: /app/data
      # サービス単位で上書きも可能
      FLOCI_STORAGE_SERVICES_DYNAMODB_MODE: persistent
      FLOCI_STORAGE_SERVICES_SQS_MODE: memory
    volumes:
      - floci_data:/app/data
```

- `memory`: 最速。テスト向け
- `persistent`: 同期書き込み
- `hybrid`: 非同期書き込み（速度と永続化のバランス）
- `wal`: 追記型ログ

## 初期化フック

起動シーケンスの各段階でスクリプトを実行できる:

1. **BOOT** (`boot.d`): AWS API 利用不可の段階
2. ストレージ読み込み
3. HTTP 開始（ポート 4566 バインド）
4. **START / READY** (`start.d` / `ready.d`): AWS API 利用可能

バケット作成などの初期化は `ready.d` にスクリプトを置く。aws コマンドを使うなら `latest-compat` イメージを利用する。

## LocalStack からの移行

LocalStack の環境変数は自動変換される:

| LocalStack | Floci |
|---|---|
| `PERSISTENCE=1` | `FLOCI_STORAGE_MODE=persistent` |
| `LOCALSTACK_HOST` | `FLOCI_HOSTNAME` |
| `DEBUG=1` | `QUARKUS_LOG_LEVEL=DEBUG` |

## 対応サービス（主要）

S3, SQS, SNS, DynamoDB, Lambda, API Gateway (v1/v2), Cognito, KMS, Kinesis, Secrets Manager, SSM, CloudFormation, Step Functions, IAM, STS, ElastiCache, RDS, EventBridge, CloudWatch

## 参考リンク

- [floci-io/floci (GitHub)](https://github.com/floci-io/floci)
- [Getting Started | floci-io/floci (DeepWiki)](https://deepwiki.com/floci-io/floci/1.1-getting-started)
- [LocalStack Community Editionの代替として登場したFlociを試してみた (DevelopersIO)](https://dev.classmethod.jp/articles/floci-localstack-alternative-aws-emulator-try/)
- [ローカルAWSエミュレータとしてFlociを利用し始めたので紹介します (コドモン)](https://tech.codmon.com/entry/2026/05/20/171020)
- [FlociとTerraformでAWSローカル検証環境を作って永続化まで確認した (Zenn)](https://zenn.dev/curry_katsu/articles/8da508e921345e)
