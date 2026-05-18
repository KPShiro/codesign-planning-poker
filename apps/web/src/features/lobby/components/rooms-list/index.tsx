import { cn } from '@utils/cn';
import { type ComponentProps } from 'react';
import { useRoomsList } from '../../hooks/use-rooms-list';
import { RoomsListGroup } from './rooms-list-group';
import { RoomsListItem } from './rooms-list-item';

type RoomsListProps = ComponentProps<'ul'>;

export function RoomsList({ className, ...props }: RoomsListProps) {
    const { rooms, recentRoom } = useRoomsList();

    return (
        <div className="flex flex-col gap-10">
            {recentRoom ? (
                <RoomsListGroup label="Recently Visited">
                    <RoomsListItem key={recentRoom.id} room={recentRoom} />
                </RoomsListGroup>
            ) : null}
            {rooms.length > 0 ? (
                <RoomsListGroup label={`All Available (${rooms.length})`}>
                    <ul {...props} className={cn('flex w-full flex-col gap-2', className)}>
                        {rooms.map((room) => (
                            <RoomsListItem key={room.id} room={room} />
                        ))}
                    </ul>
                </RoomsListGroup>
            ) : null}
        </div>
    );
}
