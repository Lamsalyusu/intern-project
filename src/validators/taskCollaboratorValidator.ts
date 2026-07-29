import {z} from 'zod';
const collaboratorschema = z.object({
    email:z.string().email("invalid email format"),
});
export type taskcollaboratorvalidation = z.infer<typeof collaboratorschema>;