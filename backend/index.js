require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./utils/logger');

// ルーティングを定義
const taskRoutes = require("./routers/tasksRouter");
const bookRoutes = require("./routers/booksRouter");
const goalsRoutes = require("./routers/goalsRouter");
const historyiesRoutes = require("./routers/studyHistoriesRouter");
const userRoutes = require("./routers/userRouter");
const authRoutes = require("./routers/authRouter");

const app = express();
const port = process.env.BACKEND_PORT || process.env.PORT || 3000;
const prisma = require('./prismaClient');

// CORS設定
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// ログミドルウェア
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    logger.info(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

const db = mysql.createConnection({
    host: process.env.BACKEND_DB_HOST || process.env.DB_HOST,
    user: process.env.BACKEND_DB_USER || process.env.DB_USER,
    password: process.env.BACKEND_DB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.BACKEND_DB_NAME || process.env.DB_NAME,
    port: process.env.BACKEND_DB_PORT || process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        logger.error('DB connection failed:', err);
    } else {
        logger.info('Connected to MySQL');
    }
});
const swaggerDocument = YAML.load(path.join(__dirname, './document/OpenAPI/OpenAPI_v1.yaml'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Study Habit Management API",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true
  }
}));

// Health check endpoint（既存のルート設定の前に追加）
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

app.use('/tasks',taskRoutes);
app.use('/books',bookRoutes);
app.use('/goals',goalsRoutes);
app.use('/history',historyiesRoutes);
app.use('/user',userRoutes);
app.use('/auth',authRoutes);


app.get('/', (req, res) => {
    logger.info('Root endpoint accessed');
    res.json({ message: 'Hello, Backend is running!', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});

app.get('/users', async (req, res) => {
    logger.info('Get users endpoint called');
    try {
        const users = await prisma.users.findMany();
        logger.info(`✅ Found ${users.length} users`);
        res.json({ status: 'success', data: users });
    } catch (error) {
        logger.error('❌ Error fetching users:', error);
        res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
});
