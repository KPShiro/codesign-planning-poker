import type { User } from '@codesign-planning-poker/shared';
import { useStickyState } from './use-sticky-state';
import { generateUUID } from '@utils/generate-uuid';

export function usePlayerAccount() {
    const [username, updateUsername] = useStickyState<User['name']>({
        storageKey: 'account-username',
        defaultValue: null,
    });

    const [accountId, updateAccountId] = useStickyState<User['id']>({
        storageKey: 'account-id',
        defaultValue: generateUUID(),
    });

    return {
        username,
        updateUsername,
        accountId,
        updateAccountId,
    };
}
