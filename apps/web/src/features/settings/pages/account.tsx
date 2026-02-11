import AccountForm from '@components/account-form/account-form';
import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { useNotifications } from '@hooks/use-notifications';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function AccountSettingsPage() {
    const notifications = useNotifications();

    const handleOnSubmit = () => {
        notifications.addNotification('Account information updated');
    };

    return (
        <SecondaryPageLayout
            header={'Personal Information'}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            <AccountForm onSubmit={handleOnSubmit} />
        </SecondaryPageLayout>
    );
}

export default AccountSettingsPage;
