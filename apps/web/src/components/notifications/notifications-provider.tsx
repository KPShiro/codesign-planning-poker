import { type Notification, NotificationsContext } from '@hooks/use-notifications';
import NotificationsList from './notifications-list';
import { generateUUID } from '@utils/generate-uuid';
import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';

export function NotificationsProvider({ children }: PropsWithChildren) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = useCallback((id: Notification['id']) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const addNotification = useCallback(
        (message: Notification['message'], duration: Notification['duration'] = 3_000) => {
            const newNotification: Notification = {
                id: generateUUID(),
                message,
                duration,
            };

            setNotifications((prev) => [...prev, newNotification]);
        },
        [],
    );

    const value = useMemo(
        () => ({
            notifications,
            addNotification,
            removeNotification,
        }),
        [addNotification, notifications, removeNotification],
    );

    return (
        <NotificationsContext.Provider value={value}>
            {children}
            <NotificationsList />
        </NotificationsContext.Provider>
    );
}
