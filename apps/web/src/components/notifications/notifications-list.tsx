import { useNotifications } from '@hooks/use-notifications';
import { NotificationsListItem } from './notifications-list-item';

export const NotificationsList = () => {
    const { notifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <div className="desktop:left-auto desktop:max-w-xs fixed right-4 bottom-4 left-4 z-(--z-notifications) flex flex-col gap-2">
            {notifications.map((notification) => (
                <NotificationsListItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
};
