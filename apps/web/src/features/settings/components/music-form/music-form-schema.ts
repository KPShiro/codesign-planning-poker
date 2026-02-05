import { AUDIO_CONFIG } from '@config/audio-config';
import z from 'zod';

export const musicFormSchema = z.object({
    volume: z.number().min(AUDIO_CONFIG.music.minVolume).max(AUDIO_CONFIG.music.maxVolume),
});

export type MusicFormOutput = z.output<typeof musicFormSchema>;
export type MusicFormInput = z.input<typeof musicFormSchema>;
