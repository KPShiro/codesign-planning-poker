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
                'bg-surface-1 text-on-surface-1 relative isolate rounded-md border border-current/15 p-6 select-none',
                'animate-slide-in overflow-clip',
            )}
        >
            <div className="flex flex-col gap-1">
                {notification.title ? (
                    <span className="text-sm font-semibold">{notification.title}</span>
                ) : null}
                {notification.message ? (
                    <span className="text-sm nth-[2]:text-current/60">{notification.message}</span>
                ) : null}
            </div>
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
