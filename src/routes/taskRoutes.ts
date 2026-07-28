import express from 'express';
const taskrouter = express.Router();

import taskController from '../controllers/taskController';
import authMiddleware from '../middlewares/authmiddleware';
import {validation,validateQuery} from '../middlewares/validatemiddleware';
import { taskSchema, taskQuery } from '../validators/taskValidator';

taskrouter.post('/', authMiddleware, validation(taskSchema), taskController.create);
taskrouter.get('/', authMiddleware, validateQuery(taskQuery), taskController.getAll);
taskrouter.get('/:id', authMiddleware, taskController.getone);
taskrouter.put('/:id', authMiddleware, validation(taskSchema), taskController.update);
taskrouter.delete('/:id', authMiddleware, taskController.remove);   

export default taskrouter;