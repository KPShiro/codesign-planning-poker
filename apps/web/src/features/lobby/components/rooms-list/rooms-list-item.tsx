import { CardSets, type Room } from '@codesign-planning-poker/shared';
import { useDeleteRoomAction } from '@features/lobby/hooks/use-delete-room.action';
import { useEmoji } from '@hooks/use-emoji';
import { useNavigate } from '@tanstack/react-router';
import type { ComponentProps } from 'react';
import { RoomWidget } from './room-widget';

type RoomsListItemProps = Pick<ComponentProps<'div'>, 'className'> & {
    room: Pick<Room, 'id' | 'emojiId' | 'name' | 'cardSetId'>;
};

export function RoomsListItem({ room, className }: RoomsListItemProps) {
    const navigate = useNavigate();

    const { getEmojiById } = useEmoji();
    const emoji = getEmojiById(room.emojiId);

    const deleteRoomAction = useDeleteRoomAction();

    const handleOnGamesListItemClick = (roomId: Room['id']) => {
        navigate({ to: `/gameplay/${roomId}` });
    };

    const handleOnEditRoomClick = (roomId: Room['id']) => {
        throw new Error(`[${roomId}] Not Implemented!`);
    };

    return (
        <RoomWidget
            icon={emoji.symbol}
            textPrimary={room.name}
            textSecondary={CardSets[room.cardSetId].name}
            disabled={deleteRoomAction.isPending}
            onDeleteClick={async () => {
                await deleteRoomAction.execute({
                    id: room.id,
                    name: room.name,
                });
            }}
            onEditClick={() => handleOnEditRoomClick(room.id)}
            onJoinClick={() => handleOnGamesListItemClick(room.id)}
            className={className}
        />
    );
}
