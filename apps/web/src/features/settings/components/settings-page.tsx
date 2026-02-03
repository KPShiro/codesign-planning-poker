import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import Section from '@components/section';
import { useAudioController } from '@hooks/use-audio-controller';
import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

function SettingsPage() {
    const audioController = useAudioController();

    return (
        <SecondaryPageLayout
            header={'Settings'}
            action={
                <Link to="/">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            <Section title="Account">
                <Link to="/settings/account">
                    <Section.Button label="Username" />
                </Link>
            </Section>
            <Section title="Sounds & Haptics">
                <Section.Button label="Music" value={audioController.selectedFiles.music} />
                <Section.Button label="SFX" value={audioController.selectedFiles.sfx} />
                <Section.Button
                    label="Notifications"
                    value={audioController.selectedFiles.notifications}
                />
            </Section>
        </SecondaryPageLayout>
    );
}

export default SettingsPage;
