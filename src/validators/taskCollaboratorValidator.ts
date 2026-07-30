import {z} from 'zod';
export const collaboratorschema = z.object({
    email:z.string().email("invalid email format"),
});
export type taskcollaboratorvalidation = z.infer<typeof collaboratorschema>;