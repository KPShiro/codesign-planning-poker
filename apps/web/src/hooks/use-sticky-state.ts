import { LocalStorage } from '@utils/local-storage';
import { useEffect, useState } from 'react';

type UseStickyStateArgs<T = unknown> = {
    storageKey: string;
    defaultValue: T | null;
};

export function useStickyState<T = unknown>({ storageKey, defaultValue }: UseStickyStateArgs<T>) {
    const [value, setValue] = useState<T>(() => {
        const storedValue = LocalStorage.getData(storageKey);

        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        LocalStorage.saveData(storageKey, JSON.stringify(value));
    }, [storageKey, value]);

    return [value, setValue] as const;
}
