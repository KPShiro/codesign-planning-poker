import { useEffect } from 'react';
import { useNotifications, type Notification } from '@hooks/use-notifications';
import { cn } from '@utils/cn';

interface NotificationsListItemProps {
    notification: Notification;
}

const NotificationsListItem = ({ notification }: NotificationsListItemProps) => {
    const { removeNotification } = useNotifications();

    useEffect(() => {
        if (!notification.duration) {
            return;
        }

        const timer = setTimeout(() => {
            removeNotification(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
    }, [notification, removeNotification]);

    return (
        <div
            className={cn(
                'bg-surface-1 text-on-surface-1 relative isolate rounded-md border border-current/15 p-4',
                'animate-slide-in',
            )}
        >
            <span className="text-sm font-medium">{notification.message}</span>
            {notification.duration ? (
                <div className="absolute top-0 right-0 left-0 h-1">
                    <div
                        className="bg-primary animate-timer-progress h-full w-0"
                        style={{
                            animationDuration: `${notification.duration}ms`,
                        }}
                    ></div>
                </div>
            ) : null}
        </div>
    );
};

export default NotificationsListItem;
