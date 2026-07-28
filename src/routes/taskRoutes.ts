import express from 'express';
const taskrouter = express.Router();

import taskController from '../controllers/taskController';
import authMiddleware from '../middlewares/authmiddleware';
import validation from '../middlewares/validatemiddleware';
import { taskSchema, taskQuery } from '../validators/taskValidator';

taskrouter.post('/', authMiddleware, validation(taskSchema), taskController.create);
taskrouter.get('/', authMiddleware, validation(taskQuery), taskController.getAll);
taskrouter.get('/:id', authMiddleware, taskController.getone);
taskrouter.put('/:id', authMiddleware, validation(taskSchema), taskController.update);
taskrouter.delete('/:id', authMiddleware, taskController.delete);

export default taskrouter;