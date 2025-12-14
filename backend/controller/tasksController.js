const prisma = require('../prismaClient');
const { Prisma } = require('@prisma/client');

const getAllTasks = async (req, res) => {
    console.log('📋 getAllTasks: Starting to fetch all tasks');
    try {
        const tasks = await prisma.task.findMany({
            include: {
                user: true,
                status: true,
                subtasks: true,
            },
        });
        console.log(`✅ getAllTasks: Successfully fetched ${tasks.length} tasks`);
        console.log('📊 Tasks data:', JSON.stringify(tasks, null, 2));
        res.json({ status: 'success', data: tasks, count: tasks.length });
    } catch (error) {
        console.error('❌ getAllTasks: Error occurred:', error);
        res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
};

const getTaskById = async (req, res) => {
    const { taskId } = req.params;
    console.log(`🔍 getTaskById: Fetching task with ID: ${taskId}`);
    
    try {
        const id = Number(taskId);
        if(!Number.isInteger(id) || id <= 0){
            console.log(`❌ getTaskById: Invalid task ID provided: ${taskId}`);
            return res.status(400).json({ status: 'error', message: '無効なタスクID'});
        }
        
        console.log(`🔎 getTaskById: Searching for task with valid ID: ${id}`);
        const task = await prisma.task.findUniqueOrThrow({
            where: { id: id }
        });
        
        console.log(`✅ getTaskById: Successfully found task:`, JSON.stringify(task, null, 2));
        res.json({ status: 'success', data: task });
    } catch (error) {
        console.error(`❌ getTaskById: Error occurred for taskId ${taskId}:`, error);
        if (error instanceof Prisma.NotFoundError) {
            console.log(`🚫 getTaskById: Task not found for ID: ${taskId}`);
            return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
        } else {
            return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
        }
    }
};

const createTask = async (req, res) => {
    console.log('➕ createTask: Starting to create new task');
    console.log('📝 Request body:', JSON.stringify(req.body, null, 2));
    
    try {
        const { taskTitle, taskDescription, userId, taskStatusId, taskStartTime, taskEndTime } = req.body;
        
        // バリデーション
        if (!taskTitle || !taskDescription) {
            console.log('❌ createTask: Missing required fields');
            return res.status(400).json({ 
                status: 'error', 
                message: 'タスクタイトルと説明は必須です' 
            });
        }
        
        const newTask = await prisma.task.create({
            data: {
                taskTitle,
                taskDescription,
                userId: userId || 1, // デフォルトユーザーID
                taskStatusId: taskStatusId || 1, // デフォルトステータス
                taskStartTime: taskStartTime ? new Date(taskStartTime) : new Date(),
                taskEndTime: taskEndTime ? new Date(taskEndTime) : new Date(),
            },
            include: {
                user: true,
                status: true,
                subtasks: true,
            },
        });
        
        console.log('✅ createTask: Successfully created task:', JSON.stringify(newTask, null, 2));
        res.status(201).json({ status: 'success', data: newTask });
    } catch (error) {
        console.error('❌ createTask: Error occurred:', error);
        res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    console.log(`✏️ updateTask: Starting to update task with ID: ${taskId}`);
    console.log('📝 Request body:', JSON.stringify(req.body, null, 2));
    
    try {
        const id = Number(taskId);
        if(!Number.isInteger(id) || id <= 0){
            console.log(`❌ updateTask: Invalid task ID provided: ${taskId}`);
            return res.status(400).json({ status: 'error', message: '無効なタスクID'});
        }
        
        const { taskTitle, taskDescription, taskStatusId, taskStartTime, taskEndTime } = req.body;
        
        const updateData = {};
        if (taskTitle !== undefined) updateData.taskTitle = taskTitle;
        if (taskDescription !== undefined) updateData.taskDescription = taskDescription;
        if (taskStatusId !== undefined) updateData.taskStatusId = taskStatusId;
        if (taskStartTime !== undefined) updateData.taskStartTime = new Date(taskStartTime);
        if (taskEndTime !== undefined) updateData.taskEndTime = new Date(taskEndTime);
        
        const updatedTask = await prisma.task.update({
            where: { id: id },
            data: updateData,
            include: {
                user: true,
                status: true,
                subtasks: true,
            },
        });
        
        console.log('✅ updateTask: Successfully updated task:', JSON.stringify(updatedTask, null, 2));
        res.json({ status: 'success', data: updatedTask });
    } catch (error) {
        console.error(`❌ updateTask: Error occurred for taskId ${taskId}:`, error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            console.log(`🚫 updateTask: Task not found for ID: ${taskId}`);
            return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
        } else {
            return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
        }
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    console.log(`🗑️ deleteTask: Starting to delete task with ID: ${taskId}`);
    
    try {
        const id = Number(taskId);
        if(!Number.isInteger(id) || id <= 0){
            console.log(`❌ deleteTask: Invalid task ID provided: ${taskId}`);
            return res.status(400).json({ status: 'error', message: '無効なタスクID'});
        }
        
        await prisma.task.delete({
            where: { id: id },
        });
        
        console.log(`✅ deleteTask: Successfully deleted task with ID: ${taskId}`);
        res.json({ status: 'success', message: 'タスクが削除されました' });
    } catch (error) {
        console.error(`❌ deleteTask: Error occurred for taskId ${taskId}:`, error);
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            console.log(`🚫 deleteTask: Task not found for ID: ${taskId}`);
            return res.status(404).json({ status: 'error', message: 'タスクが見つかりません' });
        } else {
            return res.status(500).json({ status: 'error', message: 'サーバーエラー' });
        }
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};