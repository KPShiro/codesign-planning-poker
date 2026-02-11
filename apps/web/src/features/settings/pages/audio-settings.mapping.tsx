import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import AudioFileSelector from '../components/audio-file-selector';
import Section from '@components/section';

function AudioSettingsMappingPage() {
    const params = useParams({
        from: '/_authenticated/settings/audio/$audioTrackId/$audioEventId',
    });

    const navigate = useNavigate();

    return (
        <SecondaryPageLayout
            header={params.audioEventId}
            action={
                <Button
                    size="sm"
                    variant="outlined"
                    icon={<ArrowLeftIcon />}
                    onClick={() =>
                        navigate({
                            to: '/settings/audio/$audioTrackId',
                            params: { audioTrackId: params.audioTrackId },
                        })
                    }
                />
            }
        >
            <Section title="Audio files">
                <AudioFileSelector
                    audioTrackId={params.audioTrackId}
                    audioEventId={params.audioEventId}
                />
            </Section>
        </SecondaryPageLayout>
    );
}

export default AudioSettingsMappingPage;
