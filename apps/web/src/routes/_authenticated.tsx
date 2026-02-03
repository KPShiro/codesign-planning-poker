import { createFileRoute, redirect } from '@tanstack/react-router';
import { generateUUID } from '@utils/generate-uuid';
import { LocalStorage } from '@utils/local-storage';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: () => {
        const accountId = LocalStorage.getData('account-id');
        const userName = LocalStorage.getData('account-username');

        if (!accountId) {
            LocalStorage.saveData('account-id', generateUUID());
        }

        if (!userName) {
            throw redirect({
                to: '/create-account',
            });
        }
    },
});
