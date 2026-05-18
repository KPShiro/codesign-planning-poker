import { Button } from '@components/button';
import { FullscreenPageLayout } from '@components/page-layout/fullscreen-page-layout';
import { PageHeader } from '@components/page/page-header';
import { useNotifications } from '@hooks/use-notifications';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { CreateRoomForm } from '../components/create-room-form';
import type { CreateRoomFormOutput } from '../components/create-room-form/schema';
import { useCreateRoomMutation } from '../hooks/use-create-room.mutation';

export function CreateRoomPage() {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const { mutateAsync, isPending } = useCreateRoomMutation();

    const handleOnSubmit = async (value: CreateRoomFormOutput) => {
        const infoNotificationId = notifications.addNotification({
            type: 'info',
            message: 'Creating your room...',
            duration: 5_000,
        });

        try {
            await mutateAsync({
                name: value.name,
                emojiId: value.emojiId,
                cardSetId: value.cardSetId,
            });

            notifications.removeNotification(infoNotificationId);
            notifications.addNotification({
                type: 'success',
                title: 'Room Created',
                message: 'Your room has been added to the list.',
            });

            navigate({ to: '/' });
        } catch {
            notifications.removeNotification(infoNotificationId);
            notifications.addNotification({
                type: 'danger',
                title: 'Something Went Wrong',
                message: 'Please try again in the moment, or contact support.',
            });
        }
    };

    return (
        <FullscreenPageLayout alignX="center">
            <div className="max-w-modal flex w-full flex-col gap-6">
                <Link to="/">
                    <Button
                        variant="outlined"
                        label="Back to lobby"
                        icon={<ArrowLeftIcon />}
                        className="w-fit"
                    />
                </Link>
                <PageHeader
                    title="Creating New Room"
                    description="Set up a new room by providing a name, selecting an icon, and choosing a card set from the list."
                />
                <CreateRoomForm onSubmit={handleOnSubmit} isPending={isPending} />
            </div>
        </FullscreenPageLayout>
    );
}
