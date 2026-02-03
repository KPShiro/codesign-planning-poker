import { createFileRoute, Link } from '@tanstack/react-router';
import Button from '@components/button';
import { SettingsIcon } from 'lucide-react';
import GamesList from 'src/features/games-list/components/games-list';
import DefaultPageLayout from '@components/page-layout/default-page-layout';

export const Route = createFileRoute('/_authenticated/')({
    component: HomePage,
});

// eslint-disable-next-line react-refresh/only-export-components
function HomePage() {
    return (
        <DefaultPageLayout>
            <Link to="/settings">
                <Button variant="outlined" icon={<SettingsIcon />} label="Settings" />
            </Link>
            <GamesList />
        </DefaultPageLayout>
    );
}
