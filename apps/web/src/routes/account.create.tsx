import { CreateAccountPage } from '@features/account';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@utils/is-authenticated';

export const Route = createFileRoute('/account/create')({
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({
                to: '/',
            });
        }
    },
    component: CreateAccountPage,
});
