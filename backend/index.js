require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const taskRoutes = require("./routers/tasksRouter");

const app = express();
const port = process.env.BACKEND_PORT || process.env.PORT || 3000;
const prisma = require('./prismaClient');

// CORS設定
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ログミドルウェア
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
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
        console.error('DB connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});
const swaggerDocument = YAML.load(path.join(__dirname, './document/OpenAPI/dist/openapi-full.yaml'));

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

app.get('/', (req, res) => {
    console.log('✅ Root endpoint accessed');
    res.json({ message: 'Hello, Backend is running!', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📝 API endpoints available:`);
    console.log(`   GET  http://localhost:${port}/`);
    console.log(`   GET  http://localhost:${port}/tasks`);
    console.log(`   GET  http://localhost:${port}/tasks/:id`);
    console.log(`   GET  http://localhost:${port}/users`);
});

app.get('/users', async (req, res) => {
    console.log('👥 Get users endpoint called');
    try {
        const users = await prisma.users.findMany();
        console.log(`✅ Found ${users.length} users`);
        res.json({ status: 'success', data: users });
    } catch (error) {
        console.error('❌ Error fetching users:', error);
        res.status(500).json({ status: 'error', message: 'サーバーエラー' });
    }
});
