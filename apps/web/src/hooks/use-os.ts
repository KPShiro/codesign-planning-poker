import { useMemo } from 'react';

export type OS = 'android' | 'ios' | 'macos' | 'windows' | 'linux' | 'unknown';

export function useOS(): OS {
    return useMemo(() => {
        const ua = window.navigator.userAgent;
        const platform = window.navigator.platform;

        if (/android/i.test(ua)) {
            return 'android';
        }

        if (
            /iPad|iPhone|iPod/.test(ua) ||
            (platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
        ) {
            return 'ios';
        }

        if (/Macintosh|Mac OS X/i.test(ua)) {
            return 'macos';
        }

        if (/Windows/i.test(ua)) {
            return 'windows';
        }

        if (/Linux/i.test(ua)) {
            return 'linux';
        }

        return 'unknown';
    }, []);
}
