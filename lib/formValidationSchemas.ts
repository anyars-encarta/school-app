import { z } from "zod";

export const subjectSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Subject Name must be at least 3 characters long!' })
        .max(20, { message: 'Subject Name must be at most 20 characters long!' }),
    // teachers: z.string().min(1, { message: "Teacher's is required!" }),
});

export type SubjectInputs = z.infer<typeof subjectSchema>;