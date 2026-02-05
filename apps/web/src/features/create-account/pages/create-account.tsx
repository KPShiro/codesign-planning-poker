import DefaultPageLayout from '@components/page-layout/default-page-layout';
import AccountForm from '@components/account-form/account-form';
import { useNavigate } from '@tanstack/react-router';

function CreateAccountPage() {
    const navigate = useNavigate();

    return (
        <DefaultPageLayout>
            <AccountForm
                onSubmit={() => {
                    navigate({ to: '/', replace: true });
                }}
            />
        </DefaultPageLayout>
    );
}

export default CreateAccountPage;
