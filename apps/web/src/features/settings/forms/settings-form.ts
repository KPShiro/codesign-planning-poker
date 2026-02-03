import z from 'zod';
import { accountFormSchema } from '@forms/account-form';
import { audioFormSchema } from '@forms/audio-form';

export const settingsFormSchema = z.object({
    account: accountFormSchema,
    audio: audioFormSchema,
});

export type SettingsFormOutput = z.output<typeof settingsFormSchema>;
export type SettingsFormInput = z.input<typeof settingsFormSchema>;
