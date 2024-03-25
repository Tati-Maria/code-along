import {z} from 'zod';

export const roomSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(10).max(255),
    tags: z.string().min(1).max(255),
    gitUrl: z.string().url(),
});

export type Room = z.infer<typeof roomSchema>;