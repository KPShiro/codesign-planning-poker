import { useCallback, useEffect, useRef, useState } from 'react';

type UseCountdownProps = {
    seconds: number;
    onStart?: () => void;
    onStop?: () => void;
    onTick?: (secondsLeft: number) => void;
};

export function useCountdown({ seconds, onStart, onStop, onTick }: UseCountdownProps) {
    const [secondsLeft, setSecondsLeft] = useState<number>(seconds);

    const [isRunning, setIsRunning] = useState<boolean>(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const onStartRef = useRef(onStart);
    const onStopRef = useRef(onStop);
    const onTickRef = useRef(onTick);
    const secondsRef = useRef(seconds);

    useEffect(() => {
        onStartRef.current = onStart;
        onStopRef.current = onStop;
        onTickRef.current = onTick;
        secondsRef.current = seconds;
    }, [onStart, onStop, onTick, seconds]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const stopCountdown = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setSecondsLeft(secondsRef.current);
        setIsRunning(false);
        onStopRef.current?.();
    }, []);

    const startCountdown = useCallback(() => {
        if (intervalRef.current) {
            stopCountdown();
        }

        const currentSeconds = secondsRef.current;
        const now = Date.now();
        const endDate = now + currentSeconds * 1_000;

        onStartRef.current?.();
        setIsRunning(true);
        setSecondsLeft(currentSeconds);

        intervalRef.current = setInterval(() => {
            const timeLeft = Math.ceil(Math.max(0, endDate - Date.now()) / 1_000);

            if (timeLeft > 0) {
                onTickRef.current?.(timeLeft);
                setSecondsLeft(timeLeft);
            } else {
                stopCountdown();
            }
        }, 1_000);
    }, [stopCountdown]);

    return {
        isRunning,
        secondsLeft,
        startCountdown,
        stopCountdown,
    };
}
