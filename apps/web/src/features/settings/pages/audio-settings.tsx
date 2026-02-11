import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeftIcon, Volume2Icon, VolumeIcon } from 'lucide-react';
import { useAudioController } from '@hooks/use-audio-controller';
import Section from '@components/section';
import SliderInput from '@components/form/slider-input';
import { AUDIO_CONFIG, type AudioFileMapKey } from '@config/audio-config';

function AudioSettingsPage() {
    const params = useParams({ from: '/_authenticated/settings/audio/$audioTrackId/' });
    const audioController = useAudioController();
    const navigate = useNavigate();

    const audioFilesMaping = audioController.getTrackMap(params.audioTrackId);

    const getAudioFileLabel = (key: AudioFileMapKey<typeof params.audioTrackId>) => {
        const audioFile = audioController.getTrackAudioFile(params.audioTrackId, key);

        if (!audioFile) {
            throw new Error('Audio file not found');
        }

        return audioFile.label;
    };

    return (
        <SecondaryPageLayout
            header={params.audioTrackId}
            action={
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<ArrowLeftIcon />} />
                </Link>
            }
        >
            <div className="flex flex-col gap-6">
                <Section description="Controls the volume of all SFX sounds in the app">
                    <Section.Container>
                        <SliderInput
                            min={AUDIO_CONFIG[params.audioTrackId].minVolume}
                            max={AUDIO_CONFIG[params.audioTrackId].maxVolume}
                            step={0.1}
                            value={[audioController.volumes[params.audioTrackId]]}
                            onValueChange={([value]) => {
                                audioController.setTrackVolume(params.audioTrackId, value);
                            }}
                            iconLeft={<VolumeIcon size={20} className="-mr-2" />}
                            iconRight={<Volume2Icon size={20} />}
                        />
                    </Section.Container>
                </Section>
                <Section>
                    {audioFilesMaping.map((value) => (
                        <Section.Button
                            key={value.key}
                            label={value.key}
                            value={getAudioFileLabel(value.key)}
                            onClick={() => {
                                navigate({
                                    to: '/settings/audio/$audioTrackId/$audioEventId',
                                    params: {
                                        audioTrackId: params.audioTrackId,
                                        audioEventId: value.key,
                                    },
                                });
                            }}
                        />
                    ))}
                </Section>
            </div>
        </SecondaryPageLayout>
    );
}

export default AudioSettingsPage;
