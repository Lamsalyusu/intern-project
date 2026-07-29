import {z} from 'zod';
const collaboratorschema = z.object({
    email:z.string().email("invalid email format"),
});
export type taskcollaborator = z.infer<typeof collaboratorschema>;