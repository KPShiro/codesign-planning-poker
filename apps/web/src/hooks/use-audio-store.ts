import {
    AUDIO_CONFIG,
    type AudioFileId,
    type AudioFileMap,
    type AudioTrackId,
} from '@config/audio-config';
import { STORAGE_KEYS } from '@config/storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AudioStoreState = {
    volumes: { [K in AudioTrackId]: number };
    selectedFiles: {
        [K in AudioTrackId]: AudioFileMap<K>;
    };
    setVolume: (trackId: AudioTrackId, volume: number) => void;
    setSelectedFile: <T extends AudioTrackId>(
        trackId: T,
        mappingKey: keyof AudioFileMap<T>,
        fileId: AudioFileId<T>,
    ) => void;
};

export const useAudioStore = create<AudioStoreState>()(
    persist(
        (set) => ({
            volumes: {
                sfx: AUDIO_CONFIG.sfx.defaultVolume,
                music: AUDIO_CONFIG.music.defaultVolume,
                notifications: AUDIO_CONFIG.notifications.defaultVolume,
            },
            selectedFiles: {
                sfx: AUDIO_CONFIG.sfx.mapping,
                music: AUDIO_CONFIG.music.mapping,
                notifications: AUDIO_CONFIG.notifications.mapping,
            },
            setVolume: (trackId, volume) =>
                set((state) => ({
                    volumes: { ...state.volumes, [trackId]: volume },
                })),
            setSelectedFile: (trackId, mappingKey, fileId) =>
                set((state) => ({
                    selectedFiles: {
                        ...state.selectedFiles,
                        [trackId]: {
                            ...state.selectedFiles[trackId],
                            [mappingKey]: fileId,
                        },
                    },
                })),
        }),
        { name: STORAGE_KEYS['AUDIO_SETTINGS'] },
    ),
);
