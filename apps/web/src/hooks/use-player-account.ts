import type { User } from '@codesign-planning-poker/shared';
import { useStickyState } from './use-sticky-state';
import { generateUUID } from '@utils/generate-uuid';

export function usePlayerAccount() {
    const [username, setUsername] = useStickyState<User['name']>({
        storageKey: 'app_username',
    });

    const [deviceId, setDeviceId] = useStickyState<User['id']>({
        storageKey: 'app_deviceId',
        defaultValue: generateUUID(),
    });

    return {
        username,
        setUsername,
        deviceId,
        setDeviceId,
    };
}
