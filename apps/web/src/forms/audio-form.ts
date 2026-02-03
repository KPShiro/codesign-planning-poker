import { AUDIO_CONFIG } from '@config/audio-config';
import z from 'zod';

export const audioFormSchema = z.object({
    music: z.object({
        volume: z.number().min(AUDIO_CONFIG.music.minVolume).max(AUDIO_CONFIG.music.maxVolume),
    }),
    sfx: z.object({
        volume: z.number().min(AUDIO_CONFIG.sfx.minVolume).max(AUDIO_CONFIG.sfx.maxVolume),
    }),
    notifications: z.object({
        volume: z
            .number()
            .min(AUDIO_CONFIG.notifications.minVolume)
            .max(AUDIO_CONFIG.notifications.maxVolume),
    }),
});

export type AudioFormOutput = z.output<typeof audioFormSchema>;
export type AudioFormInput = z.input<typeof audioFormSchema>;
