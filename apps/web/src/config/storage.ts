export const STORAGE_KEYS = {
    USERNAME: 'app_username',
    DEVICE_ID: 'app_deviceId',
    AUDIO_SETTINGS: 'app_audioSettings',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
