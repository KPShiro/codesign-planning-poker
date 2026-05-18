import type { Room } from '@codesign-planning-poker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function deleteRoom(id: Room['id']): Promise<Room[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create room: ${response.statusText}`);
    }

    return response.json();
}

type DeleteRoomMutationArgs = Pick<Room, 'id'>;

export function useDeleteRoomMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-room'],
        mutationFn: async ({ id }: DeleteRoomMutationArgs) => {
            const [result] = await Promise.all([
                deleteRoom(id),
                new Promise((resolve) => setTimeout(resolve, 1_000)),
            ]);

            return result as Room[];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rooms'] });
        },
    });
}
