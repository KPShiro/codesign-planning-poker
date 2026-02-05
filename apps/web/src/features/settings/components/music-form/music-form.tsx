import { type ComponentProps } from 'react';
import { cn } from '@utils/cn';
import FormField from '@components/form/form-field';
import { useNotifications } from '@hooks/use-notifications';
import SliderInput from '@components/form/slider-input';
import { useAudioController } from '@hooks/use-audio-controller';
import { AUDIO_CONFIG, type AudioTrackId } from '@config/audio-config';
import { Volume2Icon, VolumeIcon } from 'lucide-react';
import Section from '@components/section';
import { useForm } from '@tanstack/react-form';
import { musicFormSchema, type MusicFormOutput } from './music-form-schema';
import SelectableList from '@components/selectable-list';
import SelectableListItem from '@components/selectable-list/selectable-list-item';
import { useCountdown } from '@hooks/use-countdown';

type MusicFormProps = Pick<ComponentProps<'form'>, 'className'> & {
    trackId: AudioTrackId;
    onSubmit?: (value: MusicFormOutput) => void;
};

// TODO: Make sure to STOP music from playing when this component is destroyed
function MusicForm({ onSubmit, trackId, ...props }: MusicFormProps) {
    const audioController = useAudioController();
    const notifications = useNotifications();

    const selectedAudioFile = audioController.getSelectedAudioFile(trackId);
    const audioFiles = audioController.getAudioFiles(trackId);

    const audioFilePreview = useCountdown({
        onStart: () => audioController.playTrack(trackId),
        onStop: () => audioController.stopTrack(trackId),
        seconds: 5,
    });

    const form = useForm({
        defaultValues: {
            volume: audioController.volumes[trackId],
        },
        validators: {
            onChange: musicFormSchema,
        },
        onSubmit: async ({ value }) => {
            audioController.setTrackVolume(trackId, value.volume);
            notifications.addNotification('Settings saved successfully');

            await onSubmit?.(value);
            form.reset(value);
        },
    });

    if (!selectedAudioFile) {
        return null;
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className={cn('flex flex-col gap-6', props.className)}
        >
            <Section title="Volume">
                <Section.Container>
                    <form.Field
                        name="volume"
                        children={(field) => (
                            <FormField>
                                <SliderInput
                                    id={field.name}
                                    name={field.name}
                                    min={AUDIO_CONFIG.music.minVolume}
                                    max={AUDIO_CONFIG.music.maxVolume}
                                    step={0.1}
                                    defaultValue={[field.state.value]}
                                    onValueChange={([value]) => {
                                        field.handleChange(value);
                                        audioController.setTrackVolume(trackId, value);
                                    }}
                                    iconLeft={<VolumeIcon size={20} className="-mr-2" />}
                                    iconRight={<Volume2Icon size={20} />}
                                />
                            </FormField>
                        )}
                    />
                </Section.Container>
            </Section>
            <Section title="Audio file">
                <SelectableList>
                    {audioFiles.map((file) => (
                        <SelectableListItem
                            key={file.id}
                            primaryText={file.label}
                            isSelected={file.id === selectedAudioFile.id}
                            onClick={() => {
                                audioController.setTrackAudioFile(trackId, file.id);
                                audioFilePreview.stopCountdown();

                                setTimeout(() => {
                                    audioFilePreview.startCountdown();
                                }, 0);
                            }}
                        />
                    ))}
                </SelectableList>
            </Section>
        </form>
    );
}

export default MusicForm;
