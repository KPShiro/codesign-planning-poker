import { useNotifications, type Notification } from '@hooks/use-notifications';
import { cn } from '@utils/cn';
import { useEffect } from 'react';

interface NotificationsListItemProps {
    notification: Notification;
}

export const NotificationsListItem = ({ notification }: NotificationsListItemProps) => {
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
                'bg-surface-1 text-on-surface-1 relative isolate rounded-md border border-current/15 px-6 py-3',
                'animate-slide-in overflow-clip',
            )}
        >
            <span className="text-sm font-medium">{notification.message}</span>
            {notification.duration ? (
                <div className="absolute top-0 right-0 left-0 h-1 bg-current/15">
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
