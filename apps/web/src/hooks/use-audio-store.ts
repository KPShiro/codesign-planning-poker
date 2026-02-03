import { AUDIO_CONFIG, type AudioFileId, type AudioTrackId } from '@config/audio-config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AudioStoreState = {
    volumes: { [K in AudioTrackId]: number };
    selectedFiles: Record<AudioTrackId, string>;
    setVolume: (trackId: AudioTrackId, volume: number) => void;
    setSelectedFile: <T extends AudioTrackId>(trackId: T, fileId: AudioFileId<T>) => void;
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
                sfx: AUDIO_CONFIG.sfx.files[0].id,
                music: AUDIO_CONFIG.music.files[0].id,
                notifications: AUDIO_CONFIG.notifications.files[0].id,
            },
            setVolume: (trackId, volume) =>
                set((state) => ({
                    volumes: { ...state.volumes, [trackId]: volume },
                })),
            setSelectedFile: (trackId, fileId) =>
                set((state) => ({
                    selectedFiles: { ...state.selectedFiles, [trackId]: fileId },
                })),
        }),
        { name: 'audio-storage' },
    ),
);
