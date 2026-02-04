import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@utils/is-authenticated';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: () => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/create-account',
            });
        }
    },
});
