import type { Room } from '@codesign-planning-poker/shared';
import { useMutation } from '@tanstack/react-query';

async function createRoom(
    name: Room['name'],
    emojiId: Room['emojiId'],
    cardSetId: Room['cardSetId'],
): Promise<Room[]> {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emojiId, cardSetId }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create room: ${response.statusText}`);
    }

    return response.json();
}

type CreateRoomMutationArgs = Pick<Room, 'name' | 'emojiId' | 'cardSetId'>;

export function useCreateRoomMutation() {
    return useMutation({
        mutationKey: ['create-room'],
        mutationFn: async ({ name, emojiId, cardSetId }: CreateRoomMutationArgs) => {
            const [result] = await Promise.all([
                createRoom(name, emojiId, cardSetId),
                new Promise((resolve) => setTimeout(resolve, 1_000)),
            ]);

            return result as Room[];
        },
    });
}
