import aws_cdk as cdk
from constructs import Construct


class StudyHabitStack(cdk.Stack):
    """study_habit_management のメインスタック。

    今後ここに以下のようなリソースを追加していく想定:
    - VPC / サブネット
    - バックエンド(Express + Prisma)の実行環境(ECS Fargate など。Dockerfile あり)
    - データベース(MySQL 8.4 互換の RDS / Aurora)
    - フロントエンド(Vue + Vite)の配信(S3 + CloudFront など)
    - シークレット管理(DATABASE_URL などを Secrets Manager へ)
    """

    def __init__(self, scope: Construct, construct_id: str, *, env_name: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.env_name = env_name

        cdk.CfnOutput(
            self,
            "EnvName",
            value=env_name,
            description="このスタックがデプロイされている環境名",
        )
