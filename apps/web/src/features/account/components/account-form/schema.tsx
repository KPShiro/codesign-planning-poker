import z from 'zod';

export const accountFormSchema = z.object({
    username: z
        .string()
        .min(3, {
            error: 'Username must be at least 3 characters long',
        })
        .max(24, {
            error: 'Username must be at most 24 characters long',
        }),
    color: z
        .string()
        .length(7, {
            error: 'Color must be a valid hex code',
        })
        .regex(/^#([0-9A-Fa-f]{6})$/, {
            error: 'Color must be a valid hex code',
        }),
});

export type AccountFormOutput = z.output<typeof accountFormSchema>;
export type AccountFormInput = z.input<typeof accountFormSchema>;
