import { Button } from '@components/button';
import { SettingsPageLayout } from '@components/page-layout/settings-page-layout';
import { PageHeader } from '@components/page/page-header';
import { useNotifications } from '@hooks/use-notifications';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { AccountForm } from '../components/account-form';

export function AccountSettingsPage() {
    const notifications = useNotifications();

    const handleOnSubmit = () => {
        notifications.addNotification({
            type: 'info',
            message: 'Account information updated',
        });
    };

    return (
        <SettingsPageLayout
            actions={[
                <Link to="/settings">
                    <Button
                        variant="outlined"
                        size="sm"
                        label="Back to Settings"
                        icon={<ArrowLeftIcon />}
                    />
                </Link>,
            ]}
        >
            <PageHeader title={'Account'} description={'Change how others see your profile.'} />
            <AccountForm onSubmit={handleOnSubmit} submitLabel="Save Changes" />
        </SettingsPageLayout>
    );
}
