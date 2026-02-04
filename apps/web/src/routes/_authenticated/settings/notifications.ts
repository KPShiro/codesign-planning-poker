import NotificationsSettingsPage from '@features/settings/pages/notifications-settings';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/notifications')({
    component: NotificationsSettingsPage,
});
