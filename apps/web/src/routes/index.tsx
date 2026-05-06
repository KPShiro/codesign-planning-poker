import { LobbyPage } from '@features/lobby';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { isAuthenticated } from '@utils/is-authenticated';

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/account/create',
            });
        }
    },
    component: LobbyPage,
});
