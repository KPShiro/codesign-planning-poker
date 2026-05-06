import { FullscreenPageLayout } from '@components/page-layout/fullscreen-page-layout';
import { PageHeader } from '@components/page/page-header';
import { useNavigate } from '@tanstack/react-router';
import { AccountForm } from '../components/account-form';

export function CreateAccountPage() {
    const navigate = useNavigate();

    const handleOnSubmit = () => {
        navigate({ to: '/', replace: true });
    };

    return (
        <FullscreenPageLayout className="flex flex-col items-center justify-center p-6">
            <div className="flex w-full max-w-lg flex-col gap-6">
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
