const { PrismaClient } = require('@prisma/client');
const dcrypt = require('bcryptjs');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

async function main() {
  logger.info('Seed start...');

  // Prismaクライアントの接続確認
  await prisma.$connect();
  logger.info('Database connect success...');

  // データベースクリア（開発環境のみ）
  logger.info('Clear existing data...');
  // リレーション系のテーブルから削除
  await prisma.task_goals
    ?.deleteMany({})
    .catch(() => logger.info('task_goals テーブルが存在しません'));
  await prisma.study_histories
    ?.deleteMany({})
    .catch(() => logger.info('study_histories テーブルが存在しません'));
  await prisma.book_managements
    ?.deleteMany({})
    .catch(() => logger.info('book_management テーブルが存在しません'));
  await prisma.goals
    ?.deleteMany({})
    .catch(() => logger.info('goals テーブルが存在しません'));
  await prisma.tasks
    ?.deleteMany({})
    .catch(() => logger.info('tasks テーブルが存在しません'));
  await prisma.security_question_answers
    ?.deleteMany({})
    .catch(() =>
      logger.info('security_question_answers テーブルが存在しません'),
    );
  await prisma.security_questions
    ?.deleteMany({})
    .catch(() => logger.info('security_questions テーブルが存在しません'));
  await prisma.users
    ?.deleteMany({})
    .catch(() => logger.info('users テーブルが存在しません'));

  // セキュリティ質問作成（個別作成で確実にIDを取得）
  logger.info('user create');

  const user1 = await prisma.users?.create({
    data: {
      name: 'テスト　太郎',
      login_name: 'test_tarou',
    },
  });
  const user2 = await prisma.users?.create({
    data: {
      name: 'テスト　次郎',
      login_name: 'test_zirou',
    },
  });

  logger.info('question create');
  const question1 = await prisma.security_questions?.create({
    data: { question: '好きな食べ物は？' },
  });
  const question2 = await prisma.security_questions?.create({
    data: { question: '昔買っていたペットの名前は？' },
  });

  logger.info('questions_answer create');
  const password = 'password132';
  const salt = await dcrypt.genSalt(10);
  const passwordHash = await dcrypt.hash(password, salt);
  const questions_answer = await prisma.security_question_answers?.createMany({
    data: [
      {
        question_id: question1.id,
        user_id: user1.id,
        answer_salt: salt,
        answer_hash: passwordHash,
      },
      {
        question_id: question2.id,
        user_id: user2.id,
        answer_salt: salt,
        answer_hash: passwordHash,
      },
    ],
  });

  logger.info('tasks create');
  const task1 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名',
      description: 'タスクの説明',
      exec_expected_date: null,
      deadline: null,
      status: 'TODO',
    },
  });
  const task2 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名2',
      description: 'タスクの説明2',
      exec_expected_date: null,
      deadline: null,
      status: 'IN_PROGRESS',
    },
  });
  const task3 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名3',
      description: 'タスクの説明3',
      exec_expected_date: null,
      deadline: null,
      status: 'COMPLETED',
    },
  });
  const task4 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名4',
      description: 'タスクの説明4',
      exec_expected_date: null,
      deadline: null,
      status: 'CANCELLED',
    },
  });
  const task5 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名',
      description: 'タスクの説明',
      exec_expected_date: null,
      deadline: null,
      status: 'TODO',
    },
  });
  const task6 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名',
      description: 'タスクの説明',
      exec_expected_date: null,
      deadline: null,
      status: 'TODO',
    },
  });
  const task7 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名3',
      description: 'タスクの説明3',
      exec_expected_date: null,
      deadline: null,
      status: 'COMPLETED',
    },
  });
  const task8 = await prisma.tasks?.create({
    data: {
      parent_task_id: null,
      name: 'タスク名4',
      description: 'タスクの説明4',
      exec_expected_date: null,
      deadline: null,
      status: 'CANCELLED',
    },
  });
  logger.info('goals create');
  const goal1 = await prisma.goals?.create({
    data: {
      name: '目標の名前1',
      description: '目標の説明1',
      goal_deadline: new Date('2025-12-12'),
    },
  });
  const goal2 = await prisma.goals?.create({
    data: {
      name: '目標の名前2',
      description: '目標の説明2',
      goal_deadline: new Date('2025-12-12'),
    },
  });
  const goal3 = await prisma.goals?.create({
    data: {
      name: '目標の名前1',
      description: '目標の説明2',
      goal_deadline: new Date('2025-12-12'),
    },
  });
  const goal4 = await prisma.goals?.create({
    data: {
      name: '目標の名前2',
      description: '目標の説明2',
      goal_deadline: new Date('2025-12-12'),
    },
  });

  logger.info('book_managements create');
  const book_managements = await prisma.book_managements?.createMany({
    data: [
      {
        title: '参考書１',
        desicription: '参考書の内容１',
      },
      {
        title: '参考書２',
        desicription: '参考書の説明２',
      },
      {
        title: '参考書３',
        desicription: '参考書の内容３',
      },
      {
        title: '参考書４',
        desicription: '参考書の説明４',
      },
    ],
  });

  logger.info('study_histories create');
  const start_at = new Date('2025-12-12T10:00:00');
  const end_at = new Date('2025-12-12T12:30:45');
  const study_histories = await prisma.study_histories?.createMany({
    data: [
      {
        task_id: task1.id,
        description: '今日の勉強の結果',
        occurreed_on: new Date(),
        started_at: start_at,
        ended_at: end_at,
        duration_seconds: Math.floor((end_at - start_at) / 1000),
      },
      {
        task_id: task2.id,
        description: '今日の作業の結果',
        occurreed_on: new Date(),
        started_at: start_at,
        ended_at: end_at,
        duration_seconds: Math.floor((end_at - start_at) / 1000),
      },
      {
        task_id: task5.id,
        description: '今日の勉強の結果',
        occurreed_on: new Date(),
        started_at: start_at,
        ended_at: end_at,
        duration_seconds: Math.floor((end_at - start_at) / 1000),
      },
      {
        task_id: task6.id,
        description: '今日の作業の結果',
        occurreed_on: new Date(),
        started_at: start_at,
        ended_at: end_at,
        duration_seconds: Math.floor((end_at - start_at) / 1000),
      },
    ],
  });

  logger.info('task_goals create');
  const task_goals = await prisma.task_goals?.createMany({
    data: [
      {
        goal_id: goal1.id,
        task_id: task1.id,
      },
      {
        goal_id: goal1.id,
        task_id: task2.id,
      },
      {
        goal_id: goal3.id,
        task_id: task5.id,
      },
      {
        goal_id: goal3.id,
        task_id: task6.id,
      },
    ],
  });

  logger.info('Seed complete');
  logger.info('ユーザー: 2名');
  logger.info('ログイン用質問作成: 2件');
  logger.info('ログイン用質問回答: 2件');
  logger.info('タスク作成: ８件');
  logger.info('目標作成: ４件');
  logger.info('参考書作成: ４件');
  logger.info('勉強履歴の作成: ４件');
  logger.info('目標とタスクの関係を作成: ４件');
}

main()
  .catch((e) => {
    logger.error('❌ Seed実行エラー:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
