import SfxSettingsPage from '@features/settings/pages/sfx-settings';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/sfx')({
    component: SfxSettingsPage,
});
