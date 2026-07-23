import  sequelize  from "../config/db";
import User from "./userModel";
import Task from "./taskModel";
import TaskCollaborator from "./taskCollaboratorModel";
import Message from "./messageModel";
import Notification from "./notificationModel";


// User.hasMany()
// User.hasMany(Task,{})
// User.hasMany(Task, { foreignKey:'owner_id', as: "owner" });
// Task.belongsTo(User,{foreignKey:'owner_id', as: "owner"});
export {sequelize,User,Task,TaskCollaborator,Notification,Message}