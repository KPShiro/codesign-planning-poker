import type { StorageKey } from '@config/storage';

export const LocalStorage = {
    saveData: <T>(key: StorageKey, value: T): void => {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`LocalStorage Save Error (key: ${key}):`, error);
        }
    },
    getData: <T>(key: StorageKey): T | null => {
        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue === null) return null;

            return JSON.parse(storedValue) as T;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`LocalStorage Get Error (key: ${key}):`, error);
            localStorage.removeItem(key);
            return null;
        }
    },
    removeData: (key: StorageKey) => {
        localStorage.removeItem(key);
    },
    clearData: () => {
        localStorage.clear();
    },
};
