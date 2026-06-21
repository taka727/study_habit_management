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

export function selectWeek(_week: number, event: MouseEvent) {
    document.querySelectorAll('.week-tab').forEach(tab => tab.classList.remove('active'));
    (event.target as HTMLElement).classList.add('active');
    renderBoard();
}

export function renderBoard(weekData: { [day: string]: DayData } = {}) {
    const board = document.getElementById('taskBoard');
    if (board === null) return;
    board.innerHTML = '';

    Object.entries(weekData).forEach(([day, dayData]) => {
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
