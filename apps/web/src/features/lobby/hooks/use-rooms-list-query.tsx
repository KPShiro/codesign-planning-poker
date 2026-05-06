import type { Room } from '@codesign-planning-poker/shared';
import { useQuery } from '@tanstack/react-query';

async function fetchRoomsList(): Promise<Room[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch rooms: ${response.statusText}`);
    }

    return response.json();
}

export function useRoomsListQuery() {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: fetchRoomsList,
    });
}
