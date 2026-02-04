import { useNotifications } from '@hooks/use-notifications';
import NotificationsListItem from './notifications-list-item';

const NotificationsList = () => {
    const { notifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 left-4 z-(--z-notifications) flex flex-col gap-2 md:left-auto">
            {notifications.map((notification) => (
                <NotificationsListItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
};

export default NotificationsList;
