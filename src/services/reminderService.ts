import {findDueReminders,markReminderAsSent} from "../repositories/reminderRepository";
import { createNotification } from "../services/notificationService";
import  {getIO}  from '../sockets/index';

async function processReminder(){
    //find due reminder 
    const dueReminders = await findDueReminders();
    if(!dueReminders || dueReminders.length === 0){
        console.log("No due reminders found");
        return;
    }
    const io = getIO();
    //loop through each reminder
    for(const reminder of dueReminders){
        //create notification
        await createNotification(
            reminder.owner_id,'reminder',
            {
                task_id:reminder.id,
                title:reminder.title,
                description:reminder.description,
                due_date:reminder.due_date
            });
        //emit socket.io event
        // const io = getIO();
        io.to(reminder.owner_id).emit('reminder', 
            {
                task_id:reminder.id, 
                title:reminder.title,
                description:reminder.description,
                due_date:reminder.due_date
            });
        //mark reminder as sent
        await markReminderAsSent(reminder.id);
    }
    
}
export default processReminder;