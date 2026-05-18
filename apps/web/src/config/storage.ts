export const STORAGE_KEYS = {
    USERNAME: 'app_userName',
    USER_COLOR: 'app_userColor',
    DEVICE_ID: 'app_deviceId',
    RECENT_ROOM_ID: 'app_recentRoomId',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
