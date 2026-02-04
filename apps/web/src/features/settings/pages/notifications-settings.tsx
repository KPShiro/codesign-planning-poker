import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function NotificationsSettingsPage() {
    return (
        <SecondaryPageLayout
            header={'Notifications'}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            NOTIFICATIONS_SETTINGS
        </SecondaryPageLayout>
    );
}

export default NotificationsSettingsPage;
