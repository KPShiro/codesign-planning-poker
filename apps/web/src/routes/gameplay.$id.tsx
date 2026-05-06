import { GameplayPage } from '@features/gameplay';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gameplay/$id')({
    component: GameplayPage,
});
