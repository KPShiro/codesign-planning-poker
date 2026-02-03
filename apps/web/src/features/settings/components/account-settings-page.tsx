import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import Section from '@components/section';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function AccountSettingsPage() {
    return (
        <SecondaryPageLayout
            header={'Account'}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            <Section title="Account">
                <Section.Button label="Username" />
            </Section>
        </SecondaryPageLayout>
    );
}

export default AccountSettingsPage;
