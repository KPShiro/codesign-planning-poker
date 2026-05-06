import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@utils/is-authenticated';

export const Route = createFileRoute('/gameplay')({
    beforeLoad: () => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/account/create',
            });
        }
    },
});
