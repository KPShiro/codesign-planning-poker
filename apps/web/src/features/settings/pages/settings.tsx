import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import Section from '@components/section';
import { usePlayerAccount } from '@hooks/use-player-account';
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from '@utils/local-storage';
import { ArrowLeftIcon } from 'lucide-react';

function SettingsPage() {
    const playerAccount = usePlayerAccount();
    const navigate = useNavigate();

    // TODO: Add confirmation popup, "window.confirm" is somehow blocked on mobile
    const handleOnClearStoredDataClick = () => {
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
                    onClick={() =>
                        navigate({
                            to: '/settings/audio/$audioTrackId',
                            params: { audioTrackId: 'music' },
                        })
                    }
                />
                <Section.Button
                    label="SFX"
                    onClick={() =>
                        navigate({
                            to: '/settings/audio/$audioTrackId',
                            params: { audioTrackId: 'sfx' },
                        })
                    }
                />
                <Section.Button
                    label="Notifications"
                    onClick={() =>
                        navigate({
                            to: '/settings/audio/$audioTrackId',
                            params: { audioTrackId: 'notifications' },
                        })
                    }
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
