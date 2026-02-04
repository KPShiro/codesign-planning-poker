import AccountSettingsPage from '@features/settings/pages/account';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/account')({
    component: AccountSettingsPage,
});
