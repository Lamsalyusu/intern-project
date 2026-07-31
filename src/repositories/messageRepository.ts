import { Message } from "../models";

async function createMessage(task_id:string,sender_id:string,body:string){
    return Message.create({task_id,sender_id,body})
}

async function findByTask(task_id:string,page:number,limit:number){
const offset = (page - 1) * limit;

  return Message.findAndCountAll({
    where: { task_id },
    limit,
    offset,
    order: [["created_at", "ASC"]],
  });
}

export {createMessage,findByTask}