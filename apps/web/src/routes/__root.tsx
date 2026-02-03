import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
    component: RootLayout,
});

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout() {
    return <Outlet />;
}
