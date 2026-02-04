import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function SfxSettingsPage() {
    return (
        <SecondaryPageLayout
            header={'SFX'}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            SFX_SETTINGS
        </SecondaryPageLayout>
    );
}

export default SfxSettingsPage;
