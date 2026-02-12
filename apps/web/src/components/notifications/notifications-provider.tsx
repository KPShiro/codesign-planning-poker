import {
    type Notification,
    type NotificationConfig,
    NotificationsContext,
} from '@hooks/use-notifications';
import NotificationsList from './notifications-list';
import { generateUUID } from '@utils/generate-uuid';
import { useCallback, useMemo, useState, type PropsWithChildren } from 'react';

export function NotificationsProvider({ children }: PropsWithChildren) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = useCallback((id: Notification['id']) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const addNotification = useCallback((config: NotificationConfig) => {
        const id = generateUUID();

        const newNotification: Notification = {
            id: id,
            ...config,
            duration: config.duration ?? 3_000,
        };

        setNotifications((prev) => [...prev, newNotification]);

        return id;
    }, []);

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
