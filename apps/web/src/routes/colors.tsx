import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@utils/cn';

export const Route = createFileRoute('/colors')({
    component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function Color({ className }: Pick<React.ComponentProps<'div'>, 'className'>) {
    return (
        <div
            className={cn(
                'flex aspect-square min-w-24 flex-col items-center justify-center rounded-md border border-current/15 text-center',
                className,
            )}
        >
            <div className="font-semibold">Color</div>
            <div className="text-sm">Color</div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
    return (
        <div className="flex flex-col gap-6 p-10">
            <h3>Theme</h3>
            <div className="flex gap-2">
                <Color className="bg-primary text-on-primary" />
                <Color className="bg-secondary text-on-secondary" />
            </div>
            <h3>Semantic</h3>
            <div className="flex gap-2">
                <Color className="bg-danger text-on-danger" />
                <Color className="bg-warning text-on-warning" />
                <Color className="bg-success text-on-success" />
            </div>
            <h4>Surface / Neutrals</h4>
            <div className="flex gap-2">
                <Color className="bg-surface-0 text-on-surface-0" />
                <Color className="bg-surface-1 text-on-surface-1" />
                <Color className="bg-surface-2 text-on-surface-2" />
            </div>
        </div>
    );
}
