import { AccountSettingsPage } from '@features/account';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/account')({
    component: AccountSettingsPage,
});
