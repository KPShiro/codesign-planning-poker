import type { StorageKey } from '@config/storage';
import { LocalStorage } from '@utils/local-storage';
import { useState } from 'react';

type UseStickyStateArgs<T = unknown> = {
    storageKey: StorageKey;
    defaultValue?: T | null;
};

export function useStickyState<T = unknown>({
    storageKey,
    defaultValue = null,
}: UseStickyStateArgs<T>) {
    const [value, setValue] = useState<T | null>(() => {
        const storedValue = LocalStorage.getData<T>(storageKey);

        if (storedValue !== null) {
            return storedValue;
        }

        if (defaultValue !== null && defaultValue !== undefined) {
            LocalStorage.saveData(storageKey, defaultValue);
            return defaultValue as T;
        }

        return null;
    });

    const setStickyValue = (newValue: T | null | ((prev: T | null) => T | null)) => {
        const resolvedValue = newValue instanceof Function ? newValue(value) : newValue;

        if (resolvedValue === null || resolvedValue === undefined) {
            LocalStorage.removeData(storageKey);
        } else {
            LocalStorage.saveData(storageKey, resolvedValue);
        }

        setValue(resolvedValue);
    };

    return [value, setStickyValue] as const;
}
