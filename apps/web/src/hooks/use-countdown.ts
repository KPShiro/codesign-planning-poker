import { useCallback, useRef, useState } from 'react';

type UseCountdownProps = {
    seconds: number;
    onStart?: () => void;
    onStop?: () => void;
};

export function useCountdown(props: UseCountdownProps) {
    const [secondsLeft, setSecondsLeft] = useState<number>(props.seconds);

    const [isRunning, setIsRunning] = useState<boolean>(false);

    const interval = useRef<number | null>(null);

    const stopCountdown = useCallback(() => {
        if (interval.current) {
            clearInterval(interval.current);
        }

        setSecondsLeft(props.seconds);
        setIsRunning(false);
        props.onStop?.();
    }, [props]);

    const startCountdown = useCallback(() => {
        if (isRunning) {
            stopCountdown();
        }

        const now = Date.now();
        const endDate = now + props.seconds * 1_000;

        props.onStart?.();
        setIsRunning(true);

        interval.current = setInterval(() => {
            const secondsLeft = Math.ceil(Math.max(0, endDate - Date.now()) / 1_000);

            if (secondsLeft > 0) {
                setSecondsLeft(secondsLeft);
            } else {
                stopCountdown();
            }
        }, 1_000);
    }, [isRunning, props, stopCountdown]);

    return {
        isRunning,
        secondsLeft,
        startCountdown,
        stopCountdown,
    };
}
