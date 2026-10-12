import aws_cdk as cdk
from aws_cdk.assertions import Template

from study_habit.study_habit_stack import StudyHabitStack


def test_synth_and_env_name_output():
    app = cdk.App()
    stack = StudyHabitStack(app, "StudyHabit-test", env_name="dev")
    template = Template.from_stack(stack)

    template.has_output("EnvName", {"Value": "dev"})
