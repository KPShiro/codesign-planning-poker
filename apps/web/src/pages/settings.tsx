import { SettingsPageLayout } from '@components/page-layout/settings-page-layout';
import { PageHeader } from '@components/page/page-header';
import { Section } from '@components/section';
import { usePlayerAccount } from '@hooks/use-player-account';
import { useNavigate } from '@tanstack/react-router';
import { LocalStorage } from '@utils/local-storage';

export function SettingsPage() {
    const playerAccount = usePlayerAccount();
    const navigate = useNavigate();

    const handleOnClearStoredDataClick = () => {
        const message =
            'Are you sure you want to clear all stored data? This action cannot be undone.';

        if (!window.confirm(message)) {
            return;
        }

        LocalStorage.clearData();
        navigate({ to: '/' });
    };

    return (
        <SettingsPageLayout>
            <PageHeader
                title={'Settings'}
                description={
                    'Lorem ipsum dolor sit amet consectetur. Integer sit arcu nisi laoreet varius. Turpis eget nibh dictum sagittis at senectus tortor.'
                }
            />
            <Section
                title="Personal Information"
                description="Your information is stored locally on your device and is not shared with anyone. It is used to identify you in the app and to sync data across devices."
                actions={[
                    {
                        label: 'Account',
                        value: playerAccount.username ?? '',
                        onClick: () => navigate({ to: '/settings/account' }),
                    },
                ]}
            />
            <Section
                title="Danger Zone"
                description="Please proceed with caution and make sure you understand the implications of each action before proceeding."
                actions={[
                    {
                        color: 'danger',
                        variant: 'button',
                        label: 'Clear stored data',
                        onClick: handleOnClearStoredDataClick,
                    },
                ]}
            />
        </SettingsPageLayout>
    );
}
