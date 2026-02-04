import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import Section from '@components/section';
import { useAudioController } from '@hooks/use-audio-controller';
import { usePlayerAccount } from '@hooks/use-player-account';
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from '@utils/local-storage';
import { ArrowLeftIcon } from 'lucide-react';

function SettingsPage() {
    const audioController = useAudioController();
    const playerAccount = usePlayerAccount();
    const navigate = useNavigate();

    const handleOnClearStoredDataClick = () => {
        const result = confirm(
            'Are you sure you want to clear all stored data? This action cannot be undone.',
        );

        if (!result) {
            return;
        }

        LocalStorage.clearData();
        navigate({ to: '/' });
    };

    return (
        <SecondaryPageLayout
            header={'Settings'}
            action={
                <Button
                    size="sm"
                    variant="outlined"
                    icon={<ArrowLeftIcon />}
                    onClick={() => navigate({ to: '/' })}
                />
            }
        >
            <Section title="Account">
                <Section.Button
                    label="Personal Information"
                    value={playerAccount.username ?? ''}
                    onClick={() => navigate({ to: '/settings/account' })}
                />
            </Section>
            <Section title="Sounds & Haptics">
                <Section.Button
                    label="Music"
                    value={audioController.getSelectedAudioFile('music')?.label}
                    onClick={() => navigate({ to: '/settings/music' })}
                />
                <Section.Button
                    label="SFX"
                    value={audioController.getSelectedAudioFile('sfx')?.label}
                    onClick={() => navigate({ to: '/settings/sfx' })}
                />
                <Section.Button
                    label="Notifications"
                    value={audioController.getSelectedAudioFile('notifications')?.label}
                    onClick={() => navigate({ to: '/settings/notifications' })}
                />
            </Section>
            <Section title="Daneger Zone">
                <Section.Button
                    label="Clear stored data"
                    onClick={handleOnClearStoredDataClick}
                    className="text-danger"
                />
            </Section>
        </SecondaryPageLayout>
    );
}

export default SettingsPage;
