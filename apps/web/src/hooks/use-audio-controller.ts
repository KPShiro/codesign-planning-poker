import { useEffect, useRef, useCallback } from 'react';
import {
    AUDIO_CONFIG,
    type AudioTrackId,
    type AudioFileId,
    type AudioFile,
} from '@config/audio-config';
import { useAudioStore } from './use-audio-store';

export const useAudioController = () => {
    const { volumes, selectedFiles, setSelectedFile } = useAudioStore();

    const audioInstances = useRef<Map<AudioTrackId, HTMLAudioElement>>(
        new Map<AudioTrackId, HTMLAudioElement>([]),
    );

    useEffect(() => {
        (Object.keys(AUDIO_CONFIG) as AudioTrackId[]).forEach((id) => {
            if (audioInstances.current.has(id)) return;
            const audio = new Audio();
            audio.preload = 'auto';
            audioInstances.current.set(id, audio);
        });
    }, []);

    useEffect(() => {
        audioInstances.current.forEach((audio, id) => {
            audio.volume = volumes[id as AudioTrackId];
        });
    }, [volumes]);

    const getAudioFiles = useCallback(<T extends AudioTrackId>(trackId: T) => {
        const trackConfig = AUDIO_CONFIG[trackId];
        return trackConfig.files as readonly AudioFile<T>[];
    }, []);

    const playTrack = useCallback(
        <T extends AudioTrackId>(trackId: T, fileId?: AudioFileId<T>, forceRestart = true) => {
            const audio = audioInstances.current.get(trackId);
            const audioFiles = getAudioFiles(trackId);

            const targetFileId = fileId || (selectedFiles[trackId] as AudioFileId<T>);
            const audioFile = audioFiles.find((f) => f.id === targetFileId);

            if (!audio || !audioFile) {
                return;
            }

            if (audio.src !== audioFile.src || forceRestart) {
                audio.src = audioFile.src;
                audio.load();
            }

            audio.play().catch(console.error);
        },
        [getAudioFiles, selectedFiles],
    );

    const stopTrack = useCallback((trackId: AudioTrackId) => {
        const audio = audioInstances.current.get(trackId);

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, []);

    const stopAllTracks = useCallback(() => {
        audioInstances.current.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }, []);

    const setTrackVolume = useCallback((trackId: AudioTrackId, volume: number) => {
        const config = AUDIO_CONFIG[trackId];

        const clampedVolume = Math.min(Math.max(volume, config.minVolume), config.maxVolume);

        const audio = audioInstances.current.get(trackId);

        if (audio) {
            audio.volume = clampedVolume;
        }

        const { setVolume } = useAudioStore.getState();
        setVolume(trackId, clampedVolume);
    }, []);

    const setTrackAudioFile = useCallback(
        <T extends AudioTrackId>(trackId: T, fileId: AudioFileId<T>) => {
            const audio = audioInstances.current.get(trackId);
            const audioFile = getAudioFiles(trackId).find((f) => f.id === fileId);

            if (!audio || !audioFile) {
                return;
            }

            if (audio.src !== audioFile.src) {
                audio.src = audioFile.src;
                audio.load();
            }

            setSelectedFile(trackId, fileId);
        },
        [getAudioFiles, setSelectedFile],
    );

    return {
        volumes,
        selectedFiles,
        getAudioFiles,
        playTrack,
        stopTrack,
        stopAllTracks,
        setTrackVolume,
        setTrackAudioFile,
    };
};
