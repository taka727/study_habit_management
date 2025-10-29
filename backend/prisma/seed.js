const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seed 実行開始');
    
    // Prismaクライアントの接続確認
    await prisma.$connect();
    console.log('✅ データベース接続成功');

    // データベースクリア（開発環境のみ）
    console.log('🗑️ 既存データをクリア中...');
    // リレーション系のテーブルから削除
    await prisma.taskGoalRelations?.deleteMany({}).catch(() => console.log('TaskGoalRelations テーブルが存在しません'));
    await prisma.subTasks?.deleteMany({}).catch(() => console.log('SubTasks テーブルが存在しません'));
    await prisma.taskRecords?.deleteMany({}).catch(() => console.log('TaskRecords テーブルが存在しません'));
    await prisma.userSessions?.deleteMany({}).catch(() => console.log('UserSessions テーブルが存在しません'));
    await prisma.books?.deleteMany({}).catch(() => console.log('Books テーブルが存在しません'));
    
    // メインテーブル削除
    await prisma.tasks?.deleteMany({}).catch(() => console.log('Tasks テーブルが存在しません'));
    await prisma.goals?.deleteMany({}).catch(() => console.log('Goals テーブルが存在しません'));
    await prisma.users?.deleteMany({}).catch(() => console.log('Users テーブルが存在しません'));
    await prisma.statuses?.deleteMany({}).catch(() => console.log('Statuses テーブルが存在しません'));
    await prisma.securityQuestions?.deleteMany({}).catch(() => console.log('SecurityQuestions テーブルが存在しません'));


    // セキュリティ質問作成（個別作成で確実にIDを取得）
    console.log('🔐 セキュリティ質問を作成中...');
    const questionFood = await prisma.securityQuestion.create({
        data: { content: '好きな食べ物は？' }
    });
    
    await prisma.securityQuestion.createMany({
        data: [
            { content: '出身地の市区町村は？' },
            { content: '初めて飼ったペットの名前は？' },
            { content: '母親の旧姓は？' },
            { content: '通っていた小学校名は？' }
        ],
    });

    // ステータス作成（個別作成で確実にIDを取得）
    console.log('📊 ステータスを作成中...');
    const statusNotStarted = await prisma.status.create({
        data: { status_name: '未着手' }
    });
    const statusInProgress = await prisma.status.create({
        data: { status_name: '進行中' }
    });
    const statusCompleted = await prisma.status.create({
        data: { status_name: '完了' }
    });
    
    await prisma.status.createMany({
        data: [
            { status_name: '保留' },
            { status_name: 'キャンセル' }
        ],
    });

    // 複数ユーザー作成
    console.log('👥 ユーザーを作成中...');
    const user1 = await prisma.user.create({
        data: {
            username: 'test_user',
            userQuestionId: questionFood.id,
            userAnswer: 'カレー',
            isDeleted: false,
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'demo_user',
            userQuestionId: questionFood.id,
            userAnswer: 'ラーメン',
            isDeleted: false,
        },
    });

    // 複数ゴール作成
    console.log('🎯 ゴールを作成中...');
    const goal1 = await prisma.goal.create({
        data: {
            userId: user1.id,
            title: 'AWS資格を取る',
            description: '30日以内にCloud Practitioner合格',
            goalStartDate: new Date(),
            goalEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    const goal2 = await prisma.goal.create({
        data: {
            userId: user1.id,
            title: 'プログラミング学習',
            description: 'Vue.js完全習得',
            goalStartDate: new Date(),
            goalEndDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    const goal3 = await prisma.goal.create({
        data: {
            userId: user2.id,
            title: '健康管理',
            description: '毎日30分の運動習慣',
            goalStartDate: new Date(),
            goalEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    // 複数タスク作成（異なるステータス）
    console.log('📝 タスクを作成中...');
    const task1 = await prisma.task.create({
        data: {
            userId: user1.id,
            taskStatusId: statusInProgress.id,
            taskTitle: 'テキストを3章まで読む',
            taskDescription: '黒本を毎日1章ずつ進める',
            taskStartTime: new Date(),
            taskEndTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    const task2 = await prisma.task.create({
        data: {
            userId: user1.id,
            taskStatusId: statusNotStarted.id,
            taskTitle: 'Vue.js公式チュートリアル',
            taskDescription: 'コンポーネントの基礎を学ぶ',
            taskStartTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
            taskEndTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    const task3 = await prisma.task.create({
        data: {
            userId: user2.id,
            taskStatusId: statusCompleted.id,
            taskTitle: '朝のジョギング',
            taskDescription: '30分間の軽いジョギング',
            taskStartTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
            taskEndTime: new Date(Date.now() - 23.5 * 60 * 60 * 1000),
            createdAt: new Date(),
        },
    });

    // タスクとゴールの関連付け
    console.log('🔗 タスクとゴールを関連付け中...');
    await prisma.taskGoalRelation.createMany({
        data: [
            { taskId: task1.id, goalId: goal1.id },
            { taskId: task2.id, goalId: goal2.id },
            { taskId: task3.id, goalId: goal3.id }
        ]
    });

    // サブタスク作成
    console.log('📋 サブタスクを作成中...');
    await prisma.subTask.createMany({
        data: [
            { parentTaskId: task1.id, title: '第1章を読む' },
            { parentTaskId: task1.id, title: '第2章を読む' },
            { parentTaskId: task1.id, title: '第3章を読む' },
            { parentTaskId: task2.id, title: 'プロジェクト作成' },
            { parentTaskId: task2.id, title: 'コンポーネント作成' },
            { parentTaskId: task3.id, title: 'ウォーミングアップ' },
            { parentTaskId: task3.id, title: 'メインジョギング' },
            { parentTaskId: task3.id, title: 'クールダウン' }
        ],
    });

    console.log('✅ Seed 完了 - 以下のデータを作成しました:');
    console.log('   👥 ユーザー: 2名');
    console.log('   🎯 ゴール: 3件');
    console.log('   📝 タスク: 3件');
    console.log('   📋 サブタスク: 8件');
    console.log('   📊 ステータス: 5種類');
    console.log('   🔐 セキュリティ質問: 5件');
}

main()
    .catch((e) => {
        console.error('❌ Seed実行エラー:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });