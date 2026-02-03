import AccountSettingsPage from '@features/settings/components/account-settings-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/settings/account')({
    component: AccountSettingsPage,
});
