import express from 'express';
const taskCollaboratorRouter = express.Router();
import taskCollaboratorController from '../controllers/taskCollaboratorController';
import {taskcollaboratorvalidation}  from '../validators/taskCollaboratorValidator';
