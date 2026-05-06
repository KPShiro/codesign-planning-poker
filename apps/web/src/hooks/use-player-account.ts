import type { User } from '@codesign-planning-poker/shared';
import { generateUUID } from '@utils/generate-uuid';
import { useStickyState } from './use-sticky-state';

export function usePlayerAccount() {
    const [username, setUsername] = useStickyState<User['name']>({
        storageKey: 'app_username',
    });

    const [userColor, setUserColor] = useStickyState<User['color']>({
        storageKey: 'app_userColor',
    });

    const [deviceId, setDeviceId] = useStickyState<User['id']>({
        storageKey: 'app_deviceId',
        defaultValue: generateUUID(),
    });

    return {
        username,
        setUsername,
        userColor,
        setUserColor,
        deviceId,
        setDeviceId,
    };
}
