import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function MusicSettingsPage() {
    return (
        <SecondaryPageLayout
            header={'Music'}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            MUSIC_SETTINGS
        </SecondaryPageLayout>
    );
}

export default MusicSettingsPage;
