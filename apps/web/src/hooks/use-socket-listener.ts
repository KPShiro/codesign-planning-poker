import { useEffect } from 'react';
import type { ServerToClientEvents } from '@codesign-planning-poker/shared';
import { socket } from 'src/socket';

export function useSocketListener<K extends keyof ServerToClientEvents>(
    eventName: K,
    callback: ServerToClientEvents[K],
) {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        socket.on(eventName, callback as any);

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            socket.off(eventName, callback as any);
        };
    }, [eventName, callback]);
}
