import Button from '@components/button';
import SecondaryPageLayout from '@components/page-layout/secondary-page-layout';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeftIcon, TriangleAlertIcon, Volume2Icon, VolumeIcon } from 'lucide-react';
import { useAudioController } from '@hooks/use-audio-controller';
import Section from '@components/section';
import SliderInput from '@components/form/slider-input';
import { AUDIO_CONFIG, type AudioFileMapKey } from '@config/audio-config';
import { useOS } from '@hooks/use-os';

function AudioSettingsPage() {
    const params = useParams({ from: '/_authenticated/settings/audio/$audioTrackId/' });
    const audioController = useAudioController();
    const navigate = useNavigate();
    const os = useOS();

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
                {os !== 'ios' ? (
                    <Section
                        description={`Controls the volume of ${params.audioTrackId} in the app`}
                    >
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
                ) : (
                    <div className="bg-warning text-on-warning flex gap-4 rounded-md p-4">
                        <div className="flex aspect-square h-12 items-center justify-center rounded-sm bg-current/15">
                            <TriangleAlertIcon size={20} className="shrink-0 grow-0" />
                        </div>
                        <span className="text-sm">
                            Audio volume controls are not supported on iOS. Please use physical
                            buttons on your device to control audio volume.
                        </span>
                    </div>
                )}
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
