import { useForm } from '@tanstack/react-form';
import {
    settingsFormSchema,
    type SettingsFormInput,
    type SettingsFormOutput,
} from '../forms/settings-form';
import { useAudioController } from '@hooks/use-audio-controller';
import { usePlayerAccount } from '@hooks/use-player-account';

type UseSettingsFormProps = {
    defaultValues?: Partial<SettingsFormInput>;
    onSubmit?: (value: SettingsFormOutput) => void | Promise<void>;
};

export const useSettingsForm = ({ defaultValues, onSubmit }: UseSettingsFormProps = {}) => {
    const playerAccount = usePlayerAccount();
    const audioController = useAudioController();

    const form = useForm({
        defaultValues: {
            audio: {
                music: {
                    volume: audioController.volumes.music,
                    ...defaultValues?.audio?.music,
                },
                sfx: {
                    volume: audioController.volumes.sfx,
                    ...defaultValues?.audio?.sfx,
                },
                notifications: {
                    volume: audioController.volumes.notifications,
                    ...defaultValues?.audio?.notifications,
                },
            },
            account: {
                username: playerAccount.username || '',
                ...defaultValues?.account,
            },
        },
        validators: {
            onChange: settingsFormSchema,
        },
        onSubmit: async ({ value }) => {
            playerAccount.updateUsername(value.account.username);
            await onSubmit?.(value);
            form.reset(value);
        },
    });

    return form;
};
