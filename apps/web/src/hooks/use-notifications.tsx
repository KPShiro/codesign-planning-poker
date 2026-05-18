import { createContext, useContext, type ReactNode } from 'react';

export type NotificationType = 'info' | 'danger' | 'warning' | 'success';

export type Notification = {
    id: string;
    type: NotificationType;
    title?: ReactNode;
    message: ReactNode;
    duration?: number;
};

export type NotificationConfig = Omit<Notification, 'id'>;

type NotificationsContextType = {
    notifications: Notification[];
    addNotification: (config: NotificationConfig) => Notification['id'];
    removeNotification: (id: Notification['id']) => void;
};

export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export function useNotifications() {
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }

    return context;
}
