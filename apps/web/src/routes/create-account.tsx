import { createFileRoute } from '@tanstack/react-router';
import CreateAccountPage from '@features/create-account/components/create-account-page';

export const Route = createFileRoute('/create-account')({
    component: CreateAccountPage,
});
