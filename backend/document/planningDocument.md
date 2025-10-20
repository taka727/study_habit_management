# 計画文書
# study_habit_management_app — 個人開発まとめ

> **目的**：資格の取得やこれまでの勉強などを記録しやすくし勉強習慣や継続的な自己研鑽を助けるアプリの作成

## 1. 技術選定
- **FE**：Vue 3, TypeScript, Vite, Pinia, SCSS
- **BE**：Express（**TS化**）, Prisma, Jest, supertest, Zod, pino
- **DB**：MySQL（AWS RDS想定）
- **Infra**：AWS（Lambda, API Gateway, RDS, CloudWatch, EventBridge）→ P2でIaC
- **CI/CD**：GitHub Actions（lint/test/build バッジ）＋（将来）CodePipeline
- **Security/Other**：JWT、最小権限IAM、Dependabot、CodeQL

