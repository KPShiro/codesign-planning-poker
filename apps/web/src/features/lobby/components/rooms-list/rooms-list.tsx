import { CardSets, type Room } from '@codesign-planning-poker/shared';
import { useDeleteRoomAction } from '@features/lobby/hooks/use-delete-room.action';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@utils/cn';
import { type ComponentProps } from 'react';
import { useRoomsList } from '../../hooks/use-rooms-list';
import { RoomsListGroup } from './rooms-list-group';
import { RoomsListItem } from './rooms-list-item';

type RoomsListProps = ComponentProps<'ul'>;

export function RoomsList({ className, ...props }: RoomsListProps) {
    const { rooms, recentRoom } = useRoomsList();
    const navigate = useNavigate();

    const deleteRoomAction = useDeleteRoomAction();

    const handleOnGamesListItemClick = (roomId: Room['id']) => {
        navigate({ to: `/gameplay/${roomId}` });
    };

    const handleOnEditRoomClick = (roomId: Room['id']) => {
        throw new Error(`[${roomId}] Not Implemented!`);
    };

    return (
        <div className="flex flex-col gap-10">
            {recentRoom ? (
                <RoomsListGroup label="Recently Visited">
                    <RoomsListItem
                        key={recentRoom.id}
                        emojiId={recentRoom.emojiId}
                        textPrimary={recentRoom.name}
                        textSecondary={CardSets[recentRoom.cardSetId].name}
                        disabled={deleteRoomAction.isPending}
                        onDeleteClick={async () => {
                            await deleteRoomAction.execute({
                                id: recentRoom.id,
                                name: recentRoom.name,
                            });
                        }}
                        onEditClick={() => handleOnEditRoomClick(recentRoom.id)}
                        onJoinClick={() => handleOnGamesListItemClick(recentRoom.id)}
                    />
                </RoomsListGroup>
            ) : null}
            {rooms.length > 0 ? (
                <RoomsListGroup label={`All Available (${rooms.length})`}>
                    <ul {...props} className={cn('flex w-full flex-col gap-2', className)}>
                        {rooms.map((room) => (
                            <RoomsListItem
                                key={room.id}
                                emojiId={room.emojiId}
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
                            />
                        ))}
                    </ul>
                </RoomsListGroup>
            ) : null}
        </div>
    );
}
