import { CardSets, type Room } from '@codesign-planning-poker/shared';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@utils/cn';
import { type ComponentProps } from 'react';
import { useRoomsList } from '../../hooks/use-rooms-list';
import { GamesListGroup } from './games-list-group';
import { GamesListItem } from './games-list-item';

type GamesListProps = ComponentProps<'ul'>;

export function GamesList({ className, ...props }: GamesListProps) {
    const { rooms, recentRoom } = useRoomsList();
    const navigate = useNavigate();

    const handleOnGamesListItemClick = (roomId: Room['id']) => {
        navigate({ to: `/gameplay/${roomId}` });
    };

    return (
        <div className="flex flex-col gap-10">
            {recentRoom ? (
                <GamesListGroup label="Recently Visited">
                    <GamesListItem
                        key={recentRoom.id}
                        icon={recentRoom.icon}
                        textPrimary={recentRoom.name}
                        textSecondary={CardSets[recentRoom.cardSetId].name}
                        onJoinClick={() => handleOnGamesListItemClick(recentRoom.id)}
                    />
                </GamesListGroup>
            ) : null}
            {rooms.length > 0 ? (
                <GamesListGroup label={`All Available (${rooms.length})`}>
                    <ul {...props} className={cn('flex w-full flex-col gap-2', className)}>
                        {rooms.map((room) => (
                            <GamesListItem
                                key={room.id}
                                icon={room.icon}
                                textPrimary={room.name}
                                textSecondary={CardSets[room.cardSetId].name}
                                onJoinClick={() => handleOnGamesListItemClick(room.id)}
                            />
                        ))}
                    </ul>
                </GamesListGroup>
            ) : null}
        </div>
    );
}
