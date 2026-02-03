import z from 'zod';

export const accountFormSchema = z.object({
    username: z.string().min(3).max(24),
});

export type AccountFormOutput = z.output<typeof accountFormSchema>;
export type AccountFormInput = z.input<typeof accountFormSchema>;
