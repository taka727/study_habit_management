# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

習慣化管理アプリ (Study Habit Management App) - A full-stack web application for task management and habit tracking.

## Tech Stack

- **Backend**: Node.js + Express + Prisma + MySQL
- **Frontend**: Vue.js 3 + TypeScript + Vite + Pinia
- **Database**: MySQL 8.0 with Prisma ORM
- **API Documentation**: OpenAPI 3.0 + Swagger UI at `/docs`

## Commands

### Backend (from `backend/` directory)

```bash
npm start                    # Start server with nodemon
npm test                     # Run all tests (Jest)
npm run test:unit            # Run unit tests only
npm run test:integration     # Run integration tests only
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Generate coverage report
npm run migration            # Create Prisma migration
npm run seed                 # Seed database
```

### Frontend (from `frontend/` directory)

```bash
npm run dev                  # Start Vite dev server (port 5173)
npm run build                # Type-check and build for production
npm run test:unit            # Run Vitest unit tests
npm run lint                 # Run ESLint with auto-fix
npm run format               # Format code with Prettier
npm run type-check           # Run Vue TypeScript compiler
```

### Docker (from root)

```bash
bash setup.sh                           # Full setup with DB initialization
docker compose --profile full up -d     # All services
docker compose --profile dev up -d      # MySQL + Backend only
```

## Architecture

```
study_habit_management/
├── backend/
│   ├── controller/          # Request handlers (authController, tasksController, etc.)
│   ├── routers/             # Route definitions
│   ├── middleware/auth.js   # JWT authentication middleware
│   ├── utils/               # Utilities (jwt, logger, password, response, constants)
│   ├── prisma/              # Database schema and seeds
│   ├── tests/               # Jest tests (unit/ and integration tests)
│   └── document/OpenAPI/    # OpenAPI 3.0 specs
├── frontend/
│   ├── src/components/      # Vue components (TaskManager, History, Milestone, etc.)
│   ├── src/stores/          # Pinia state management
│   └── src/assets/script/   # Router, navigation, and business logic
└── docker-compose.yml
```

## Key Patterns

- **Authentication**: JWT-based with Bearer token in Authorization header
- **Logging**: Centralized Pino logger (`backend/utils/logger.js`)
- **Response formatting**: Standardized via `backend/utils/response.js`
- **Database**: Prisma ORM with soft deletes (`deleateed_at` field)
- **Task status**: Enum values - TODO, IN_PROGRESS, COMPLETED, CANCELLED

## Database

Schema is defined in `backend/prisma/schema.prisma`. Key models:
- `users`, `tasks`, `goals`, `task_goals`, `study_histories`, `book_managements`
- `security_questions`, `security_question_answers`

Run migrations: `npx prisma migrate dev`
Generate client: `npx prisma generate`

## Code Style

- Frontend uses Prettier (100 char line width, single quotes, no semicolons)
- ESLint configured for Vue 3 + TypeScript
- Backend uses Express patterns with centralized error handling

## API Endpoints

- `/tasks` - Task CRUD
- `/books` - Book management
- `/goals` - Goal management
- `/history` - Study history
- `/user` - User profile
- `/auth` - Authentication (login/logout)
- `/docs` - Swagger API documentation
