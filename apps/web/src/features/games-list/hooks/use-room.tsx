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
        const userId = LocalStorage.getData('userId');
        const userName = LocalStorage.getData('userName');

        if (!userName || !userId) {
            return;
        }

        socket.auth = {
            userId: userId,
            userName: userName,
        };

        socket.connect();
        socket.emit('room:join', roomId);

        LocalStorage.saveData('recentRoomId', roomId);

        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return {
        room,
    };
}
