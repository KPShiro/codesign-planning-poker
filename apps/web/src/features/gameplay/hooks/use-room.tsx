import type { Room, User } from '@codesign-planning-poker/shared';
import { useSocketListener } from '@hooks/use-socket-listener';
import { LocalStorage } from '@utils/local-storage';
import { useEffect, useState } from 'react';
import { socket } from 'src/socket';

type UseRoomProps = {
    onUserJoined?: (username: User['name']) => void;
    onUserLeft?: (username: User['name']) => void;
};

export function useRoom(roomId: Room['id'], options?: UseRoomProps) {
    const [room, setRoom] = useState<Room | null>(null);

    useSocketListener('room:updated', (updatedRoom) => {
        setRoom(updatedRoom);
    });

    useSocketListener('room:user-joined', (username) => {
        options?.onUserJoined?.(username);
    });

    useSocketListener('room:user-left', (username) => {
        options?.onUserLeft?.(username);
    });

    useEffect(() => {
        const deviceId = LocalStorage.getData('app_deviceId');
        const username = LocalStorage.getData('app_username');

        if (!username || !deviceId) {
            return;
        }

        socket.auth = {
            deviceId: deviceId,
            username: username,
        };

        socket.connect();
        socket.emit('room:join', roomId);

        LocalStorage.saveData('app_recentRoomId', roomId);

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return {
        room,
    };
}
