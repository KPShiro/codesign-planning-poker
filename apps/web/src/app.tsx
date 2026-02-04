import { routeTree } from './routeTree.gen';

import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsProvider } from '@components/notifications/notifications-provider';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

function App() {
    return (
        <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </NotificationsProvider>
    );
}

export default App;
