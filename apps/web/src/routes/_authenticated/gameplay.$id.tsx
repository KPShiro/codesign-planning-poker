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
    const { addNotification } = useNotifications();

    const savedUserId = LocalStorage.getData('app_deviceId');

    const { room } = useRoom(id, {
        onUserJoined: (username) => {
            addNotification({
                type: 'info',
                message: (
                    <>
                        <b>{username}</b> joined the room
                    </>
                ),
            });
        },
        onUserLeft: (username) => {
            addNotification({
                type: 'info',
                message: (
                    <>
                        <b>{username}</b> left the room
                    </>
                ),
            });
        },
    });

    const handlePingUser = () => {
        // TODO: Implement ping user functionality
    };

    if (!room) {
        return null;
    }

    return (
        <DefaultPageLayout>
            <div>{room.name}</div>
            <ul className="flex flex-col gap-2">
                {room.users.map((user) => (
                    <li
                        key={user.id}
                        className={cn(
                            'flex items-center gap-3 border border-current/15 p-4 pr-5 hover:bg-current/5',
                            'cursor-pointer rounded-md select-none',
                        )}
                        onClick={handlePingUser}
                    >
                        <span
                            className={cn(
                                'font-medium',
                                user.id === savedUserId ? 'text-primary' : '',
                            )}
                        >
                            {user.name}
                        </span>
                    </li>
                ))}
            </ul>
        </DefaultPageLayout>
    );
}
