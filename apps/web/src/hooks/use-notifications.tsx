import { createContext, useContext } from 'react';

export type Notification = {
    id: string;
    message: string;
    duration?: number;
};

type NotificationsContextType = {
    notifications: Notification[];
    addNotification: (
        message: Notification['message'],
        duration?: Notification['duration'],
    ) => Notification['id'];
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
