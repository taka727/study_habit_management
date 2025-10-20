export type Task = {
    type: string;
    duration: number;
    content: string;
    category: string;
    comment?: string;
};

export type DayData = {
    total: number;
    minimum: number;
    tasks: Task[];
};

export type TaskData = {
    [key: string]: {
        [day: string]: DayData;
    };
};

export const taskData: TaskData = {
    "week1": {
        "09/01(月)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "基本的なレッスンおよび単語を覚えるために必要な記憶と復習を行う。今日は新単語で復習されます",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "実践的なスピーキングトレーニング。今日は5分での英語ヒアリングについて学習する",
                    comment: "佐藤さん。こんにちは。パートナーコードの更新です！制限セッションは終了しました。また6日の今回は先生との「TOEIC900」という見学に向けで見つめた体験をお楽しみします！とっても楽しくお願いします！",
                    category: "online"
                }
            ]
        },
        "09/02(火)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "2日連続で復習学習に慣れ、オンライン英会話にも慣れた場面で楽に記憶させることがらい学習と。明日は新しく勉強する",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "回線通の修業状態を確保できています。遅延電源のような3つです明確に事項までします分野月はそれけどそのは単語の理解らしがあるとできるで消化しましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/03(水)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "自習はついに、勉強して昨日、数学会の日にも解決済み上げることできて業務です",
                    category: "english"
                },
                {
                    type: "英単語帳",
                    duration: 50,
                    content: "",
                    category: "english"
                }
            ]
        },
        "09/04(木)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "日本の銀行から確定について。なんとな目標フリけいっぽたたち",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    comment: "この3日間に自習確認にどうと思いでした。とをし、明日さミニ日月頻度でとさらな高速されている英語をいていされた！制約学習の復習電した、復習内省ことる6分らはそれ、恥を取らラ場違っていきましょう！",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "して明日の12層ら機能もらりました上(Itshoothot Mしいなども、少して分数数時作られて部門でる学習ではでしょうか、これからも一緒に練習っていきましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/05(金)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/06(土)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/07(日)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        }
    },
    "week2": {
        "09/08(月)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "基本的なレッスンおよび単語を覚えるために必要な記憶と復習を行う。今日は新単語で復習されます",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "実践的なスピーキングトレーニング。今日は5分での英語ヒアリングについて学習する",
                    comment: "佐藤さん。こんにちは。パートナーコードの更新です！制限セッションは終了しました。また6日の今回は先生との「TOEIC900」という見学に向けで見つめた体験をお楽しみします！とっても楽しくお願いします！",
                    category: "online"
                }
            ]
        },
        "09/09(火)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "2日連続で復習学習に慣れ、オンライン英会話にも慣れた場面で楽に記憶させることがらい学習と。明日は新しく勉強する",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "回線通の修業状態を確保できています。遅延電源のような3つです明確に事項までします分野月はそれけどそのは単語の理解らしがあるとできるで消化しましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/10(水)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "自習はついに、勉強して昨日、数学会の日にも解決済み上げることできて業務です",
                    category: "english"
                },
                {
                    type: "英単語帳",
                    duration: 50,
                    content: "",
                    category: "english"
                }
            ]
        },
        "09/11(木)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "日本の銀行から確定について。なんとな目標フリけいっぽたたち",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    comment: "この3日間に自習確認にどうと思いでした。とをし、明日さミニ日月頻度でとさらな高速されている英語をいていされた！制約学習の復習電した、復習内省ことる6分らはそれ、恥を取らラ場違っていきましょう！",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "して明日の12層ら機能もらりました上(Itshoothot Mしいなども、少して分数数時作られて部門でる学習ではでしょうか、これからも一緒に練習っていきましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/12(金)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/13(土)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/14(日)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        }
    },
    "week3": {
        "09/15(月)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "基本的なレッスンおよび単語を覚えるために必要な記憶と復習を行う。今日は新単語で復習されます",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "実践的なスピーキングトレーニング。今日は5分での英語ヒアリングについて学習する",
                    comment: "佐藤さん。こんにちは。パートナーコードの更新です！制限セッションは終了しました。また6日の今回は先生との「TOEIC900」という見学に向けで見つめた体験をお楽しみします！とっても楽しくお願いします！",
                    category: "online"
                }
            ]
        },
        "09/16(火)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "2日連続で復習学習に慣れ、オンライン英会話にも慣れた場面で楽に記憶させることがらい学習と。明日は新しく勉強する",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "回線通の修業状態を確保できています。遅延電源のような3つです明確に事項までします分野月はそれけどそのは単語の理解らしがあるとできるで消化しましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/17(水)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "自習はついに、勉強して昨日、数学会の日にも解決済み上げることできて業務です",
                    category: "english"
                },
                {
                    type: "英単語帳",
                    duration: 50,
                    content: "",
                    category: "english"
                }
            ]
        },
        "09/18(木)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "日本の銀行から確定について。なんとな目標フリけいっぽたたち",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    comment: "この3日間に自習確認にどうと思いでした。とをし、明日さミニ日月頻度でとさらな高速されている英語をいていされた！制約学習の復習電した、復習内省ことる6分らはそれ、恥を取らラ場違っていきましょう！",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "して明日の12層ら機能もらりました上(Itshoothot Mしいなども、少して分数数時作られて部門でる学習ではでしょうか、これからも一緒に練習っていきましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/19(金)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/20(土)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/21(日)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        }
    },
    "week4": {
        "09/22(月)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "基本的なレッスンおよび単語を覚えるために必要な記憶と復習を行う。今日は新単語で復習されます",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "実践的なスピーキングトレーニング。今日は5分での英語ヒアリングについて学習する",
                    comment: "佐藤さん。こんにちは。パートナーコードの更新です！制限セッションは終了しました。また6日の今回は先生との「TOEIC900」という見学に向けで見つめた体験をお楽しみします！とっても楽しくお願いします！",
                    category: "online"
                }
            ]
        },
        "09/23(火)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "2日連続で復習学習に慣れ、オンライン英会話にも慣れた場面で楽に記憶させることがらい学習と。明日は新しく勉強する",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "回線通の修業状態を確保できています。遅延電源のような3つです明確に事項までします分野月はそれけどそのは単語の理解らしがあるとできるで消化しましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/24(水)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "自習はついに、勉強して昨日、数学会の日にも解決済み上げることできて業務です",
                    category: "english"
                },
                {
                    type: "英単語帳",
                    duration: 50,
                    content: "",
                    category: "english"
                }
            ]
        },
        "09/25(木)": {
            total: 100,
            minimum: 10,
            tasks: [
                {
                    type: "英単語帳（基本中）",
                    duration: 20,
                    content: "日本の銀行から確定について。なんとな目標フリけいっぽたたち",
                    category: "english"
                },
                {
                    type: "オンライン英会話",
                    duration: 30,
                    content: "",
                    comment: "この3日間に自習確認にどうと思いでした。とをし、明日さミニ日月頻度でとさらな高速されている英語をいていされた！制約学習の復習電した、復習内省ことる6分らはそれ、恥を取らラ場違っていきましょう！",
                    category: "online"
                },
                {
                    type: "英語リスニング",
                    duration: 50,
                    content: "",
                    comment: "して明日の12層ら機能もらりました上(Itshoothot Mしいなども、少して分数数時作られて部門でる学習ではでしょうか、これからも一緒に練習っていきましょう！（コーチ 田中）",
                    category: "listening"
                }
            ]
        },
        "09/26(金)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/27(土)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        },
        "09/28(日)": {
            total: 80,
            minimum: 10,
            tasks: [
                {
                    type: "浄英単語（基本中）",
                    duration: 20,
                    content: "日本の銀行から度分の、新潟りしてチ明示目標にーで職業、なんとか日ミミコルて結晴らしい時上げたかも",
                    category: "review"
                }
            ]
        }
    },
};

let currentWeek: string = "1";

export function selectWeek(week: number, event: MouseEvent) {
    currentWeek = week.toString();
    document.querySelectorAll('.week-tab').forEach(tab => tab.classList.remove('active'));
    (event.target as HTMLElement).classList.add('active');
    renderBoard();
}

export function renderBoard() {
    const board = document.getElementById('taskBoard');
    const data = taskData[`week${currentWeek}`] || {};

    if (board === null) return;
    board.innerHTML = '';

    Object.entries(data).forEach(([day, dayData]) => {
        const dayColumn = createDayColumn(day, dayData);
        board.appendChild(dayColumn);
    });
}

function createDayColumn(day: string, dayData: DayData) {
    const column = document.createElement('div');
    column.className = 'day-column';

    const totalCompleted = dayData.tasks.reduce((sum, task) => sum + task.duration, 0);
    const progressPercent = Math.min((totalCompleted / dayData.total) * 100, 100);

    column.innerHTML = `
                <div class="day-header">
                    <div class="day-title">${day}</div>
                    <div class="day-stats">
                        <div class="stat-badge">${totalCompleted}/${dayData.total}分</div>
                        <div class="stat-badge">最低${dayData.minimum}分</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="task-list">
                    ${dayData.tasks.map(task => createTaskCard(task)).join('')}
                </div>
                <button class="add-task-btn" onclick="addTask('${day}')">
                    ➕ タスクを追加
                </button>
            `;

    return column;
}

function createTaskCard(task: Task) {
    return `
                <div class="task-card ${task.category}" onclick="editTask(this)">
                    <div class="task-header">
                        <div class="task-type">${task.type}</div>
                        <div class="task-duration">${task.duration}分</div>
                    </div>
                    ${task.content ? `<div class="task-content">${task.content}</div>` : ''}
                    ${task.comment ? `<div class="task-comment">💬 ${task.comment}</div>` : ''}
                </div>
            `;
}

export function addTask(day: string) {
    alert(`${day}にタスクを追加する機能を実装予定です`);
}

export function editTask(element: HTMLElement) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = '';
        alert('タスク編集機能を実装予定です');
    }, 150);
}

// 初期化
renderBoard();