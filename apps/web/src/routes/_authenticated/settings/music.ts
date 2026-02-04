import MusicSettingsPage from '@features/settings/pages/music-settings';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/music')({
    component: MusicSettingsPage,
});
