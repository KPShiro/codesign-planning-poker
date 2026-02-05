import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import MusicForm from '../components/music-form/music-form';

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
            <MusicForm trackId="notifications" />
        </SecondaryPageLayout>
    );
}

export default NotificationsSettingsPage;
