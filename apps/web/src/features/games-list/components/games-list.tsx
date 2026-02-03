import { type ComponentProps } from 'react';
import GamesListItem from './games-list-item';
import { cn } from '@utils/cn';
import { useRoomsList } from '@features/games-list/hooks/use-rooms-list';
import { useNavigate } from '@tanstack/react-router';
import GamesListGroup from '@features/games-list/components/games-list-group';
import type { Room } from '@codesign-planning-poker/shared';

type GamesListProps = ComponentProps<'ul'>;

function GamesList({ className, ...props }: GamesListProps) {
    const { rooms, recentRoom } = useRoomsList();
    const navigate = useNavigate();

    const handleOnGamesListItemClick = (roomId: Room['id']) => {
        navigate({ to: `/gameplay/${roomId}` });
    };

    return (
        <div className="flex flex-col gap-6">
            {recentRoom ? (
                <GamesListGroup label="Recently Visited">
                    <GamesListItem
                        key={recentRoom.id}
                        label={recentRoom.name}
                        playersCount={recentRoom.users.length}
                        onClick={() => handleOnGamesListItemClick(recentRoom.id)}
                        className="w-full"
                    />
                </GamesListGroup>
            ) : null}
            {rooms.length > 0 ? (
                <GamesListGroup label="Available Rooms">
                    <ul {...props} className={cn('flex w-full flex-col gap-2', className)}>
                        {rooms.map((room) => (
                            <GamesListItem
                                key={room.id}
                                label={room.name}
                                playersCount={room.users.length}
                                onClick={() => handleOnGamesListItemClick(room.id)}
                            />
                        ))}
                    </ul>
                </GamesListGroup>
            ) : null}
        </div>
    );
}

export default GamesList;
