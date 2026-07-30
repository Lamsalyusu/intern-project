import express from 'express';
const taskCollaboratorRouter = express.Router();
import taskCollaboratorController from '../controllers/taskCollaboratorController';
import { collaboratorschema } from '../validators/taskCollaboratorValidator';
import { validation } from '../middlewares/validatemiddleware';
import authMiddleware from '../middlewares/authmiddleware';

taskCollaboratorRouter.post('/:id/collaborators', authMiddleware, validation(collaboratorschema), taskCollaboratorController.create);
taskCollaboratorRouter.get('/:id/collaborators', authMiddleware, taskCollaboratorController.getCollaborator);
taskCollaboratorRouter.delete('/:id/collaborators/:userId', authMiddleware, taskCollaboratorController.deleteCollaborators);

export default taskCollaboratorRouter;