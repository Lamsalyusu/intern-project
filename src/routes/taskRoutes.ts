import express from 'express';
const router = express.Router();

import taskController from '../controllers/taskController';
import authMiddleware from '../middlewares/authmiddleware';
import validation from '../middlewares/validatemiddleware';
import { taskSchema, taskQuery } from '../validators/taskValidator';

router.post('/', authMiddleware, validation(taskSchema), taskController.create);
router.get('/', authMiddleware, validation(taskQuery), taskController.getAll);
router.get('/:id', authMiddleware, taskController.getone);
router.put('/:id', authMiddleware, validation(taskSchema), taskController.update);
router.delete('/:id', authMiddleware, taskController.delete);