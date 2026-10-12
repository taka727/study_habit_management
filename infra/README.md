# infra — AWS CDK (Python) によるインフラ管理

study_habit_management の AWS 環境を AWS CDK (Python) で管理するディレクトリです。

## 前提

- Python 3.10 以上(リポジトリの devbox.json に Python 3.13 を追加済み)
- Node.js(CDK CLI の実行に必要。devbox の Node 22 でOK)
- AWS CLI(`bootstrap` / `diff` / `deploy` / `destroy` を実行する場合のみ): `aws configure` または SSO で認証設定しておく。`synth` とユニットテストだけなら AWS 認証情報は不要
- CDK CLI は `package.json` にバージョン固定してあるため、グローバルインストール不要(`npx cdk` で実行)

## 初回セットアップ

```bash
cd infra

# Python 仮想環境を作成して有効化
python3 -m venv .venv
source .venv/bin/activate        # Windows の場合は .venv\Scripts\activate.bat(または source.bat)

# 依存パッケージ
pip install -r requirements.txt -r requirements-dev.txt

# CDK CLI(バージョン固定)
npm install

# 対象アカウント・リージョンで一度だけ実行(CDK 用の S3 バケット等を作成。AWS 認証情報が必要)
npx cdk bootstrap
```

`cdk.json` の app コマンドは `python app.py` のため、`npx cdk` は **venv を有効化した状態で** 実行してください。
新しいシェルを開いたら、`infra/` で `source .venv/bin/activate`(Windows では `source.bat`)を実行してから使います。

## 環境の切り替え

`-c env=dev`(デフォルト)/ `-c env=prod` で環境を切り替えます。
スタック名は `StudyHabit-dev` / `StudyHabit-prod` になります。
リージョンは既定で `ap-northeast-1`(`CDK_DEFAULT_REGION` で上書き可)。

## よく使うコマンド

```bash
npx cdk synth                    # CloudFormation テンプレートを生成して確認
npx cdk diff                     # デプロイ済みスタックとの差分を表示
npx cdk deploy                   # dev 環境へデプロイ
npx cdk deploy -c env=prod       # prod 環境へデプロイ
npx cdk destroy                  # スタックを削除
python -m pytest tests           # スタックのユニットテスト
```

## 構成

```
app.py                              # エントリポイント(環境の解決とスタックの生成)
study_habit/study_habit_stack.py    # メインスタック(リソース定義はここに追加)
tests/unit/                         # スタックのテスト(pytest)
cdk.json                            # CDK の設定・feature flags
requirements.txt                    # aws-cdk-lib / constructs
requirements-dev.txt                # pytest
package.json                        # CDK CLI のバージョン固定用(定義は Python)
```

## 今後の追加予定リソース

現時点ではスタックは空(Output のみ)です。以下を順次追加していく想定:

- VPC / サブネット
- バックエンド(Express + Prisma、`backend/Dockerfile` あり)の実行環境 — ECS Fargate など
- MySQL 8.0 互換のデータベース(RDS / Aurora)
- フロントエンド(Vue + Vite)の配信 — S3 + CloudFront など
- Secrets Manager(`DATABASE_URL` などの機密情報)
