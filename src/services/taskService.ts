// import messages from "../models/messageModel";
import { findById,create,findByOwner,remove,update} from "../repositories/taskRepository";
import { taskqueryschema,Taskrequire } from "../validators/taskValidator";

async function createTask(data:Taskrequire,owner_id:string){
    const Tasks = await create({
        priority : data.priority,
        description:data.description,
        status:data.status,
        title :data.title,
        due_date:data.due_date,
        reminder_at:data.reminder_at,
        owner_id
    });
    return Tasks;
}

async function getTaskById(id:string,reqid:string){
    const gettask = await findById(id);
    if(!gettask){
        throw {status:404,message:"doesnot exists"}
    }
    if(gettask.owner_id !== reqid){
        throw {status:403,message:'not their tasks'}
    }
    return gettask;
}


async function getTasksByOwner(owner_id:string,filter:taskqueryschema){
const getownertask = await findByOwner(owner_id,filter);
return getownertask;
}


async function updateTask(data:any,reqid:string,id:string){
    // const uptask = await update(data,id)
    const uptask = await findById(id);
    if(!uptask){
        throw {status:404,message:"task doesnot exists"}
    }
    if(uptask.owner_id !== reqid){
        throw {status:403,message:'not their task'}
    }
    const newuptask = await update(id,data);
    return newuptask;
}

async function deleteTask(id:string,reqid:string){
    const tsktodel = await findById(id);
    if (!tsktodel){
        throw {status:404,message:'task doesnot exists'}
    }
    if (tsktodel.owner_id !== reqid){
        throw {status:403,message:'not their task'}
    }
    const deltask = await remove(id);
    return deltask;
}

export {createTask,deleteTask,updateTask,getTaskById,getTasksByOwner}