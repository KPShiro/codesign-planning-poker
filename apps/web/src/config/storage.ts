export const STORAGE_KEYS = {
    USERNAME: 'app_username',
    DEVICE_ID: 'app_deviceId',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
