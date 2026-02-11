import { type AudioTrackId } from '@config/audio-config';
import AudioSettingsPage from '@features/settings/pages/audio-settings';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

const routeParamsSchema = z.object({
    audioTrackId: z.custom<AudioTrackId>(),
});

export const Route = createFileRoute('/_authenticated/settings/audio/$audioTrackId/')({
    component: AudioSettingsPage,
    params: {
        parse: (params) => routeParamsSchema.parse(params),
    },
});
