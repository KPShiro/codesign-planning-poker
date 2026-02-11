import SelectableList from '@components/selectable-list';
import SelectableListItem from '@components/selectable-list/selectable-list-item';
import type { AudioFileMapKey, AudioTrackId } from '@config/audio-config';
import { useAudioController } from '@hooks/use-audio-controller';
import { useCountdown } from '@hooks/use-countdown';
import { useEffect, type ComponentProps } from 'react';

type AudioFileSelectorProps<T extends AudioTrackId> = ComponentProps<typeof SelectableList> & {
    audioTrackId: T;
    audioEventId: AudioFileMapKey<T>;
};

const PREVIEW_MILLISECONDS = 5_000;
const PREVIEW_SECONDS = PREVIEW_MILLISECONDS / 1_000;

function AudioFileSelector<T extends AudioTrackId>({
    audioTrackId,
    audioEventId,
    ...props
}: AudioFileSelectorProps<T>) {
    const { getTrackAudioFiles, getTrackAudioFile, setTrackAudioFile, playTrack, stopTrack } =
        useAudioController();

    const availableAudioFiles = getTrackAudioFiles(audioTrackId);
    const selectedAudioFile = getTrackAudioFile(audioTrackId, audioEventId);

    const countdown = useCountdown({
        onStart: () => {
            playTrack(audioTrackId, audioEventId);
        },
        onStop: () => {
            stopTrack(audioTrackId);
        },
        seconds: PREVIEW_SECONDS,
    });

    useEffect(() => {
        return () => {
            stopTrack(audioTrackId);
        };
    }, [stopTrack, audioTrackId]);

    return (
        <SelectableList {...props}>
            {availableAudioFiles.map((file) => (
                <SelectableListItem
                    key={file.id}
                    primaryText={file.label}
                    isSelected={file.id === selectedAudioFile?.id}
                    onClick={async () => {
                        setTrackAudioFile(audioTrackId, audioEventId, file.id);
                        countdown.startCountdown();
                    }}
                />
            ))}
        </SelectableList>
    );
}

export default AudioFileSelector;
