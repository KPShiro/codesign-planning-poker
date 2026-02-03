export const AUDIO_CONFIG = {
    music: {
        defaultVolume: 0.5,
        minVolume: 0.0,
        maxVolume: 1.0,
        files: [
            {
                id: 'gingersweet_by_massobeats',
                label: 'Gingersweet (Massobeats)',
                src: '/audio/music/gingersweet_by_massobeats.mp3',
            },
            {
                id: 'time_by_avanti',
                label: 'Time (Avanti)',
                src: '/audio/music/time_by_avanti.mp3',
            },
        ],
    },
    sfx: {
        defaultVolume: 0.7,
        minVolume: 0.0,
        maxVolume: 1.0,
        files: [
            {
                id: 'simple_click',
                label: 'Simple Click',
                src: '/audio/sfx/simple_click.wav',
            },
            {
                id: 'level_up_by_universfield',
                label: 'Level Up (Universfield)',
                src: '/audio/sfx/level_up_by_universfield.mp3',
            },
        ],
    },
    notifications: {
        defaultVolume: 1.0,
        minVolume: 0.0,
        maxVolume: 1.0,
        files: [
            {
                id: 'high_blip',
                label: 'High Blip',
                src: '/audio/notifications/high_blip.mp3',
            },
            {
                id: 'gentle_marimba',
                label: 'Gentle Marimba',
                src: '/audio/notifications/gentle_marimba.mp3',
            },
        ],
    },
} as const;

export type AudioConfig = typeof AUDIO_CONFIG;
export type AudioTrackId = keyof AudioConfig;
export type AudioFileId<T extends AudioTrackId> = AudioConfig[T]['files'][number]['id'];
export type AudioFile<T extends AudioTrackId> = AudioConfig[T]['files'][number];
