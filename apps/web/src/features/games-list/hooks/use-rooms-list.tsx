import { LocalStorage } from '@utils/local-storage';
import { useMemo } from 'react';
import { useRoomsListQuery } from './use-rooms-list-query';

export function useRoomsList() {
    const { data } = useRoomsListQuery();

    const rooms = useMemo(() => {
        return data ?? [];
    }, [data]);

    const recentRoom = useMemo(() => {
        if (rooms.length === 0) {
            return undefined;
        }

        const recentRoomId = LocalStorage.getData('recentRoomId');
        return rooms.find((room) => room.id === recentRoomId);
    }, [rooms]);

    return { rooms, recentRoom };
}
