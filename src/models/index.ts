import  sequelize  from "../config/db";
import User from "./userModel";
import Task from "./taskModel";
import TaskCollaborator from "./taskCollaboratorModel";
import Message from "./messageModel";
import Notification from "./notificationModel";


export {sequelize,User,Task,TaskCollaborator,Notification,Message}