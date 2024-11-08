import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z
        .string()
        .min(3, { message: 'Subject Name must be at least 3 characters long!' })
        .max(20, { message: 'Subject Name must be at most 20 characters long!' }),
    teachers: z.array(z.string()).optional(), //teacher ids
});

export type SubjectInputs = z.infer<typeof subjectSchema>;