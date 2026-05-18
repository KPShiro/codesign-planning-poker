import { CreateRoomPage } from '@features/lobby/pages/create-room';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/room/create')({
    component: CreateRoomPage,
});
