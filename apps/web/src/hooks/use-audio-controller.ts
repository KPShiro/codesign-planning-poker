import { useEffect, useCallback, useMemo } from 'react';
import {
    AUDIO_CONFIG,
    type AudioTrackId,
    type AudioFileId,
    type AudioFile,
    type AudioFileMapKey,
} from '@config/audio-config';
import { useAudioStore } from './use-audio-store';

const audioInstances = new Map<AudioTrackId, HTMLAudioElement>();

if (typeof window !== 'undefined') {
    const { volumes } = useAudioStore.getState();

    (Object.keys(AUDIO_CONFIG) as AudioTrackId[]).forEach((id) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.volume = volumes[id];

        audioInstances.set(id, audio);
    });
}

const getTrackAudioFiles = <T extends AudioTrackId>(audioTrackId: T) => {
    return AUDIO_CONFIG[audioTrackId].files as readonly AudioFile<T>[];
};

export const useAudioController = () => {
    const setSelectedAudioFile = useAudioStore((state) => state.setSelectedFile);
    const selectedAudioFilesIds = useAudioStore((state) => state.selectedFiles);
    const volumes = useAudioStore((state) => state.volumes);

    useEffect(() => {
        audioInstances.forEach((audio, id) => {
            audio.volume = volumes[id as AudioTrackId];
        });
    }, [volumes]);

    const getTrackAudioFile = useCallback(
        <T extends AudioTrackId>(audioTrackId: T, audioEventId: AudioFileMapKey<T>) => {
            const selectedFileId = selectedAudioFilesIds[audioTrackId][audioEventId];
            const audioFiles = getTrackAudioFiles(audioTrackId);
            const audioFile = audioFiles.find((f) => f.id === selectedFileId);

            return audioFile;
        },
        [selectedAudioFilesIds],
    );

    const getTrackMap = useCallback(
        <T extends AudioTrackId>(audioTrackId: T) => {
            const { files } = AUDIO_CONFIG[audioTrackId];
            const mapping = selectedAudioFilesIds[audioTrackId];
            const result: { key: AudioFileMapKey<T>; file: AudioFile<T> }[] = [];

            Object.entries(mapping).forEach(([key, fileId]) => {
                const file = files.find((f) => f.id === fileId);

                if (file) {
                    result.push({
                        key: key as AudioFileMapKey<T>,
                        file,
                    });
                }
            });

            return result;
        },
        [selectedAudioFilesIds],
    );

    const playTrack = useCallback(
        <T extends AudioTrackId>(
            audioTrackId: T,
            audioEventId: AudioFileMapKey<T>,
            forceRestart = true,
        ) => {
            const audio = audioInstances.get(audioTrackId);

            const { selectedFiles } = useAudioStore.getState();
            const selectedFileId = selectedFiles[audioTrackId][audioEventId];
            const audioFile = getTrackAudioFiles(audioTrackId).find((f) => f.id === selectedFileId);

            if (!audio || !audioFile) {
                return;
            }

            const currentSrc = new URL(audioFile.src, window.location.href).href;

            if (audio.src !== currentSrc) {
                audio.src = audioFile.src;
                audio.load();
            } else if (forceRestart) {
                audio.currentTime = 0;
            }

            // eslint-disable-next-line no-console
            audio.play().catch(console.error);
        },
        [],
    );

    const stopTrack = useCallback((audioTrackId: AudioTrackId) => {
        const audio = audioInstances.get(audioTrackId);

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, []);

    const stopAllTracks = useCallback(() => {
        audioInstances.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
    }, []);

    const setTrackVolume = useCallback((audioTrackId: AudioTrackId, volume: number) => {
        const config = AUDIO_CONFIG[audioTrackId];

        const clampedVolume = Math.min(Math.max(volume, config.minVolume), config.maxVolume);

        const { setVolume } = useAudioStore.getState();
        setVolume(audioTrackId, clampedVolume);
    }, []);

    const setTrackAudioFile = useCallback(
        <T extends AudioTrackId>(
            audioTrackId: T,
            audioEventId: AudioFileMapKey<T>,
            fileId: AudioFileId<T>,
        ) => {
            const audio = audioInstances.get(audioTrackId);
            const audioFile = getTrackAudioFiles(audioTrackId).find((f) => f.id === fileId);

            if (!audio || !audioFile) {
                return;
            }

            setSelectedAudioFile(audioTrackId, audioEventId, fileId);
        },
        [setSelectedAudioFile],
    );

    const getTrackDuration = useCallback(
        <T extends AudioTrackId>(
            audioTrackId: T,
            audioEventId: AudioFileMapKey<T>,
            mode: 'seconds' | 'milliseconds' = 'seconds',
        ): Promise<number> => {
            const { selectedFiles } = useAudioStore.getState();
            const selectedFileId = selectedFiles[audioTrackId][audioEventId];
            const audioFile = getTrackAudioFiles(audioTrackId).find((f) => f.id === selectedFileId);

            if (!audioFile) {
                return Promise.resolve(0);
            }

            return new Promise((resolve) => {
                const tempAudio = new Audio(audioFile.src);
                tempAudio.preload = 'metadata';

                tempAudio.onloadedmetadata = () => {
                    if (mode === 'milliseconds') {
                        resolve(tempAudio.duration * 1000);
                        return;
                    }

                    resolve(tempAudio.duration);
                };

                tempAudio.onerror = () => {
                    resolve(0);
                };
            });
        },
        [],
    );

    return useMemo(
        () => ({
            volumes,
            selectedAudioFilesIds,
            getTrackAudioFiles,
            getTrackAudioFile,
            getTrackMap,
            getTrackDuration,
            setTrackVolume,
            setTrackAudioFile,
            playTrack,
            stopTrack,
            stopAllTracks,
        }),
        [
            volumes,
            selectedAudioFilesIds,
            getTrackAudioFile,
            getTrackMap,
            getTrackDuration,
            setTrackVolume,
            setTrackAudioFile,
            playTrack,
            stopTrack,
            stopAllTracks,
        ],
    );
};
