#!/usr/bin/env python3
import os

import aws_cdk as cdk

from study_habit.study_habit_stack import StudyHabitStack

app = cdk.App()

# -c env=prod のようにコンテキストで環境を切り替える(デフォルトは dev)
env_name = app.node.try_get_context("env") or "dev"
if env_name not in ("dev", "prod"):
    raise ValueError(f"不正な env コンテキストです: {env_name}(dev / prod のいずれかを指定)")

StudyHabitStack(
    app,
    f"StudyHabit-{env_name}",
    env_name=env_name,
    env=cdk.Environment(
        account=os.getenv("CDK_DEFAULT_ACCOUNT"),
        region=os.getenv("CDK_DEFAULT_REGION", "ap-northeast-1"),
    ),
    tags={
        "Project": "study-habit-management",
        "Environment": env_name,
    },
)

app.synth()
