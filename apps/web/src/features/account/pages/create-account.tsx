import { FullscreenPageLayout } from '@components/page-layout/fullscreen-page-layout';
import { PageHeader } from '@components/page/page-header';
import { useNotifications } from '@hooks/use-notifications';
import { useNavigate } from '@tanstack/react-router';
import { AccountForm } from '../components/account-form';

export function CreateAccountPage() {
    const navigate = useNavigate();
    const notifications = useNotifications();

    const handleOnSubmit = () => {
        navigate({ to: '/', replace: true });
        notifications.addNotification({
            type: 'success',
            message: 'Account created successfully!',
        });
    };

    return (
        <FullscreenPageLayout alignX="center" alignY="center">
            <div className="max-w-modal flex w-full flex-col gap-6">
                <PageHeader
                    title={'Welcome to Codesign Poker!'}
                    description={
                        "To get started, pick a username and select your preferred color. Don't worry, you can always change these settings later in your account preferences."
                    }
                />
                <AccountForm onSubmit={handleOnSubmit} submitLabel="Create Account" />
            </div>
        </FullscreenPageLayout>
    );
}
