task-reminder-system/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── swagger.ts
│   │
│   ├── database/
│   │   ├── migrations/
│   │   │   ├── 001-create-users.ts
│   │   │   ├── 002-create-tasks.ts
│   │   │   ├── 003-create-task-collaborators.ts
│   │   │   ├── 004-create-messages.ts
│   │   │   └── 005-create-notifications.ts
│   │   └── seeders/
│   │       ├── 001-demo-users.ts
│   │       ├── 002-demo-tasks.ts
│   │       └── 003-demo-messages.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── task.model.ts
│   │   ├── taskCollaborator.model.ts
│   │   ├── message.model.ts
│   │   ├── notification.model.ts
│   │   └── index.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── task.routes.ts
│   │   ├── message.routes.ts
│   │   ├── notification.routes.ts
│   │   └── index.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── task.controller.ts
│   │   ├── message.controller.ts
│   │   └── notification.controller.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── task.service.ts
│   │   ├── message.service.ts
│   │   ├── notification.service.ts
│   │   └── reminder.service.ts
│   │
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   ├── task.repository.ts
│   │   ├── message.repository.ts
│   │   └── notification.repository.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   ├── errorHandler.middleware.ts
│   │   ├── rateLimiter.middleware.ts
│   │   └── requestId.middleware.ts
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── task.validator.ts
│   │   └── message.validator.ts
│   │
│   ├── sockets/
│   │   ├── index.ts
│   │   ├── socketAuth.middleware.ts
│   │   ├── chat.handlers.ts
│   │   └── socketRoomGuard.ts
│   │
│   ├── jobs/
│   │   └── reminder.cron.ts
│   │
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── apiResponse.ts
│   │   ├── asyncHandler.ts
│   │   └── jwt.ts
│   │
│   ├── types/
│   │   ├── express.d.ts
│   │   └── index.ts
│   │
│   ├── docs/
│   │   └── swagger.json
│   │
│   ├── app.ts
│   └── server.ts
│
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       ├── auth.test.ts
│       ├── tasks.test.ts
│       └── reminders.test.ts
│
├── dist/                (gitignored)
├── node_modules/         (gitignored)
│
├── .env                 (gitignored, never commit)
├── .env.example
├── .gitignore
├── .sequelizerc
├── .eslintrc.json
├── .prettierrc
├── .husky/
│   └── pre-commit
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.js
├── ARCHITECTURE.md
├── README.md
└── postman_collection.json