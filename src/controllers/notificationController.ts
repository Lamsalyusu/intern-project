import { NextFunction, Request,Response } from "express"
import { createNotification, markNotificationAsRead, getNotificationsByUser, countUnreadNotifications } from "../services/notificationService";
const notificationController = {
    create:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {user_id,type,payload} = req.body;
            const result = await createNotification(user_id,type,payload);
            return res.status(201).json({data:result,message:'notification created successfully'});
        }
        catch(error:any){
            next(error);
        }
    },

    markAsRead:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const notification_id = req.params.id as string;
            const user_id = (req as any).user.id;
            const result = await markNotificationAsRead(notification_id,user_id);
            return res.status(200).json({data:result,message:'notification marked as read successfully'});
        }
        catch(error:any){
            next(error);
        }
    },

    getByUser:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const user_id = (req as any).user.id;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await getNotificationsByUser(user_id,page,limit);
            return res.status(200).json({data:result,message:'notifications fetched successfully'});
        }
        catch(error:any){
            next(error);
        }
    },
    
    countUnread:async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const user_id = (req as any).user.id;
            const result = await countUnreadNotifications(user_id);
            return res.status(200).json({data:result,message:'unread notifications count fetched successfully'});
        }
        catch(error:any){
            next(error);
        }
    }
}

export default notificationController;