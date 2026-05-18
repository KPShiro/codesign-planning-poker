import { Button } from '@components/button';
import { NavbarPageLayout } from '@components/page-layout/navbar-page-layout';
import { PageHeader } from '@components/page/page-header';
import { Link } from '@tanstack/react-router';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import { RoomsList } from '../components/rooms-list/rooms-list';

export function LobbyPage() {
    return (
        <NavbarPageLayout
            actions={[
                <Link to="/settings">
                    <Button size="sm" variant="outlined" icon={<SettingsIcon />} title="Settings" />
                </Link>,
            ]}
        >
            <PageHeader
                title={'Available Rooms'}
                description={'Join an active session or create a new room to start estimating.'}
                action={
                    <Link to="/room/create">
                        <Button variant="filled" icon={<PlusIcon />} label="Create Room" />
                    </Link>
                }
            />
            <RoomsList />
        </NavbarPageLayout>
    );
}
