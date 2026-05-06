import { createRootRoute, Outlet } from '@tanstack/react-router';
import z from 'zod';

const searchSchema = z.object({
    redirectTo: z.string().optional().catch('/'),
});

export const Route = createRootRoute({
    validateSearch: (search) => searchSchema.parse(search),
    component: Outlet,
});
