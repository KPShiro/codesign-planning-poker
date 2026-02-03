import { type ComponentProps } from 'react';
import { useSettingsForm } from '../hooks/use-settings-form';
import { cn } from '@utils/cn';
import FormField from '@components/form/form-field';
import FormLabel from '@components/form/form-label';
import TextInput from '@components/form/text-input';
import FormError from '@components/form/form-error';
import { useNotifications } from '@features/notifications/hooks/use-notifications';
import SliderInput from '@components/form/slider-input';
import { useAudioController } from '@hooks/use-audio-controller';
import { AUDIO_CONFIG } from '@config/audio-config';
import { Volume2Icon, VolumeIcon } from 'lucide-react';
import { useCountdown } from '@hooks/use-countdown';
import Section from '@components/section';

type SettingsFormProps = Pick<ComponentProps<'form'>, 'className'>;

function SettingsForm({ className }: SettingsFormProps) {
    const { addNotification } = useNotifications();

    const audioController = useAudioController();

    const form = useSettingsForm({
        onSubmit: () => {
            addNotification('Settings saved successfully');
        },
    });

    const musicTrackTestCountdown = useCountdown({
        seconds: 5,
        onStart: () => {
            audioController.playTrack('music');
        },
        onStop: () => {
            audioController.stopTrack('music');
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className={cn('flex flex-col gap-6', className)}
        >
            <Section title="Account">
                <Section.Container>
                    <form.Field
                        name="account.username"
                        children={(field) => (
                            <FormField>
                                <FormLabel htmlFor={field.name}>Username</FormLabel>
                                <TextInput
                                    id={field.name}
                                    name={field.name}
                                    placeholder="e.g. DefinitelyNotKacper"
                                    autoComplete="given-name"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onValueChange={(value) => {
                                        field.handleChange(value);
                                    }}
                                />
                                {!field.state.meta.isValid && field.state.meta.isDirty ? (
                                    <FormError>
                                        {field.state.meta.errors
                                            .map((error) => error?.message)
                                            .join(', ')}
                                    </FormError>
                                ) : null}
                            </FormField>
                        )}
                    />
                </Section.Container>
            </Section>
            <Section title="Music">
                <Section.Container>
                    <form.Field
                        name="audio.music.volume"
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
                                        audioController.setTrackVolume('music', value);
                                    }}
                                    onValueCommit={() => {
                                        musicTrackTestCountdown.startCountdown();
                                    }}
                                    iconLeft={<VolumeIcon size={20} className="-mr-2" />}
                                    iconRight={<Volume2Icon size={20} />}
                                />
                            </FormField>
                        )}
                    />
                </Section.Container>
                <Section.Button
                    label="Change audio file"
                    value={audioController.selectedFiles.music}
                />
            </Section>
            <Section title="SFX">
                <Section.Container>
                    <form.Field
                        name="audio.sfx.volume"
                        children={(field) => (
                            <FormField>
                                <SliderInput
                                    id={field.name}
                                    name={field.name}
                                    min={AUDIO_CONFIG.sfx.minVolume}
                                    max={AUDIO_CONFIG.sfx.maxVolume}
                                    step={0.1}
                                    defaultValue={[field.state.value]}
                                    onValueChange={([value]) => {
                                        field.handleChange(value);
                                        audioController.setTrackVolume('sfx', value);
                                    }}
                                    onValueCommit={() => {
                                        audioController.playTrack('sfx');
                                    }}
                                    iconLeft={<VolumeIcon size={20} className="-mr-2" />}
                                    iconRight={<Volume2Icon size={20} />}
                                />
                            </FormField>
                        )}
                    />
                </Section.Container>
                <Section.Button
                    label="Change audio file"
                    value={audioController.selectedFiles.sfx}
                />
            </Section>
            <Section title="Notifications">
                <Section.Container>
                    <form.Field
                        name="audio.notifications.volume"
                        children={(field) => (
                            <FormField>
                                <SliderInput
                                    id={field.name}
                                    name={field.name}
                                    min={AUDIO_CONFIG.notifications.minVolume}
                                    max={AUDIO_CONFIG.notifications.maxVolume}
                                    step={0.1}
                                    defaultValue={[field.state.value]}
                                    onValueChange={([value]) => {
                                        field.handleChange(value);
                                        audioController.setTrackVolume('notifications', value);
                                    }}
                                    onValueCommit={() => {
                                        audioController.playTrack('notifications');
                                    }}
                                    iconLeft={<VolumeIcon size={20} className="-mr-2" />}
                                    iconRight={<Volume2Icon size={20} />}
                                />
                            </FormField>
                        )}
                    />
                </Section.Container>
                <Section.Button
                    label="Change audio file"
                    value={audioController.selectedFiles.notifications}
                />
            </Section>
        </form>
    );
}

export default SettingsForm;
