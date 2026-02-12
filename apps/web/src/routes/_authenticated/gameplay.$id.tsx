import type { User } from '@codesign-planning-poker/shared';
import DefaultPageLayout from '@components/page-layout/default-page-layout';
import { useRoom } from '@features/games-list/hooks/use-room';
import { useNotifications } from '@hooks/use-notifications';
import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@utils/cn';
import { LocalStorage } from '@utils/local-storage';

export const Route = createFileRoute('/_authenticated/gameplay/$id')({
    component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
    const { id } = Route.useParams();

    const notifications = useNotifications();

    const deviceId = LocalStorage.getData('app_deviceId');

    const { room, pingUser } = useRoom(id, {
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

    const handlePingUser = (userId: User['id']) => {
        if (userId !== deviceId) {
            pingUser(userId);
        }
    };

    if (!room) {
        return null;
    }

    return (
        <DefaultPageLayout>
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
                        onClick={() => handlePingUser(user.id)}
                    >
                        <span className="font-medium">{user.name}</span>
                    </li>
                ))}
            </ul>
        </DefaultPageLayout>
    );
}
