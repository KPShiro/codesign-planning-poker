import type { User } from '@codesign-planning-poker/shared';
import { LocalStorage } from './local-storage';

export function isAuthenticated(): boolean {
    const username = LocalStorage.getData<User['name']>('app_username');
    const deviceId = LocalStorage.getData<User['id']>('app_deviceId');

    const hasUsername = username !== null && username !== undefined && username !== '';
    const hasDeviceId = deviceId !== null && deviceId !== undefined && deviceId !== '';

    const isAuthenticated = hasUsername && hasDeviceId;

    return isAuthenticated;
}
