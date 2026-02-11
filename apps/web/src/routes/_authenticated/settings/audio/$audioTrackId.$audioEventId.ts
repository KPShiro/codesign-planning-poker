import type { AudioFileMapKey, AudioTrackId } from '@config/audio-config';
import AudioSettingsMappingPage from '@features/settings/pages/audio-settings.mapping';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

const routeParamsSchema = z.object({
    audioTrackId: z.custom<AudioTrackId>(),
    audioEventId: z.custom<AudioFileMapKey<AudioTrackId>>(),
});

export const Route = createFileRoute('/_authenticated/settings/audio/$audioTrackId/$audioEventId')({
    component: AudioSettingsMappingPage,
    params: {
        parse: (params) => routeParamsSchema.parse(params),
    },
});
