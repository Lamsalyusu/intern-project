import { z } from "zod";

export const notificationIdSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid notification id"),
  }),
});

// export type NotificationIdSchema = z.infer<typeof notificationIdSchema>;