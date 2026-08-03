import express from 'express';
const messageRoutes = express.Router();
import messageControllers from '../controllers/messageController';
import authMiddleware from '../middlewares/authmiddleware';
import { validation } from '../middlewares/validatemiddleware';
import { messageValidationSchema } from '../validators/messageValidators';

messageRoutes.get('/:id/messages', authMiddleware, messageControllers.get);
messageRoutes.post('/:id/messages', authMiddleware, validation(messageValidationSchema), messageControllers.send);

export default messageRoutes;