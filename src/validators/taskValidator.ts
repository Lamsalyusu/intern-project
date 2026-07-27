import {z} from 'zod';
export const taskSchema = z.object({
    title:z.string().min(1,"title is reqired"),
    description:z.string().optional(),
    status:z.enum(["pending","completed","in_progress"]).optional(),
    priority:z.enum(["low","medium","high"]).optional(),
    due_date: z.string().datetime().optional(),
    reminder_at: z.string().datetime().optional(),
})