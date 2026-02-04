import { createFileRoute, redirect } from '@tanstack/react-router';
import CreateAccountPage from '@features/create-account/pages/create-account';
import { isAuthenticated } from '@utils/is-authenticated';

export const Route = createFileRoute('/create-account')({
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({
                to: '/',
            });
        }
    },
    component: CreateAccountPage,
});
