import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from 'src/pages/settings';

export const Route = createFileRoute('/settings/')({
    component: SettingsPage,
});
