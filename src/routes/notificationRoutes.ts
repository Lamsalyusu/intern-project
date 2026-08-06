import express from 'express';
const notifroutes = express.Router();
import notificationController from '../controllers/notificationController';
import authMiddleware from '../middlewares/authmiddleware';
import { validation } from '../middlewares/validatemiddleware';
import { notificationValidationSchema } from '../validators/notificationValidator';
import { notificationIdSchema } from '../validators/notificationIdSchema';
// notifroutes.post('/', authMiddleware, validation(notificationValidationSchema), notificationController.create);
notifroutes.put('/:id/read', authMiddleware, validation(notificationIdSchema), notificationController.markAsRead);
notifroutes.get('/', authMiddleware, validation(notificationValidationSchema), notificationController.getByUser);
notifroutes.get('/unread/count', authMiddleware, notificationController.countUnread);

export default notifroutes;