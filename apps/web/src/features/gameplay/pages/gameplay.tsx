import { Button } from '@components/button';
import { NavbarPageLayout } from '@components/page-layout/navbar-page-layout';
import { useNotifications } from '@hooks/use-notifications';
import { Link, useParams } from '@tanstack/react-router';
import { cn } from '@utils/cn';
import { LogOutIcon } from 'lucide-react';
import { useRoom } from '../hooks/use-room';

export function GameplayPage() {
    const { id } = useParams({ from: '/gameplay/$id' });

    const notifications = useNotifications();

    const { room } = useRoom(id, {
        onUserJoined: (username) => {
            notifications.addNotification({
                type: 'info',
                message: (
                    <>
                        <b>{username}</b> joined the room
                    </>
                ),
            });
        },
        onUserLeft: (username) => {
            notifications.addNotification({
                type: 'info',
                message: (
                    <>
                        <b>{username}</b> left the room
                    </>
                ),
            });
        },
    });

    if (!room) {
        return null;
    }

    return (
        <NavbarPageLayout
            actions={[
                <Link to="/">
                    <Button
                        size="sm"
                        variant="outlined"
                        icon={<LogOutIcon />}
                        title="Leave"
                        label="Leave"
                    />
                </Link>,
            ]}
        >
            <h1>{room.name}</h1>
            <ul className="flex flex-col gap-2">
                {room.users.map((user) => (
                    <li
                        key={user.id}
                        className={cn(
                            'flex items-center gap-3 border border-current/15 p-4 pr-5 select-none',
                            'active:bg-current/10',
                            'hover:bg-current/5',
                            'cursor-pointer rounded-md select-none',
                        )}
                    >
                        <span className="font-medium">{user.name}</span>
                    </li>
                ))}
            </ul>
        </NavbarPageLayout>
    );
}
