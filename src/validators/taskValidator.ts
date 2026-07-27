import {z} from 'zod';
// taskSchema --> "is the task data itself valid"
export const taskSchema = z.object({
    title:z.string().min(1,"title is reqired"),
    description:z.string().optional(),
    status:z.enum(["pending","completed","in_progress"]).optional(),
    priority:z.enum(["low","medium","high"]).optional(),
    due_date: z.string().datetime().optional(),
    reminder_at: z.string().datetime().optional(),
});

// taskQuery --> are the instructions for fetching.filtering a list of tasks valid?
export const taskQuery = z.object({
    status:z.enum([ "pending","completed","in_progress"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: z.enum(["due_date", "priority", "created_at"]).optional().default("created_at"),
    order: z.enum(["asc", "desc"]).optional().default("desc"),
})
export type Taskrequire = z.infer<typeof taskSchema>;
export type taskqueryschema = z.infer<typeof taskQuery>;