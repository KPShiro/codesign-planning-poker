import type { Room } from '@codesign-planning-poker/shared';
import { useNotifications } from '@hooks/use-notifications';
import { useDeleteRoomMutation } from './use-delete-room.mutation';

type UseDeleteRoomActionArgs = Pick<Room, 'id' | 'name'>;

type UseDeleteRoomActionProps = {
    onSuccess?: (args: UseDeleteRoomActionArgs) => void;
    onError?: (args: UseDeleteRoomActionArgs) => void;
};

export function useDeleteRoomAction({ onSuccess, onError }: UseDeleteRoomActionProps = {}) {
    const notifications = useNotifications();
    const { mutateAsync, isPending } = useDeleteRoomMutation();

    const execute = async (args: UseDeleteRoomActionArgs) => {
        const shouldDelete = confirm(`Delete room "${args.name}"? This action is not reversable.`);

        if (!shouldDelete) return;

        const infoNotificationId = notifications.addNotification({
            type: 'info',
            message: `Deleting room "${args.name}"...`,
        });

        try {
            await mutateAsync({ id: args.id });

            notifications.removeNotification(infoNotificationId);
            notifications.addNotification({
                type: 'info',
                title: 'Room Deleted',
                message: 'Item has been removed from the list.',
            });

            onSuccess?.(args);
        } catch {
            notifications.removeNotification(infoNotificationId);
            notifications.addNotification({
                type: 'danger',
                title: 'Something Went Wrong',
                message: 'Please try again in the moment, or contact support.',
            });

            onError?.(args);
        }
    };

    return {
        execute,
        isPending,
    };
}
