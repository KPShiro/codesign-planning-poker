import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@utils/cn';

export const Route = createFileRoute('/colors')({
    component: RouteComponent,
});

type ColorProps = Pick<React.ComponentProps<'div'>, 'className'> & {
    name: string;
};

// eslint-disable-next-line react-refresh/only-export-components
function Color({ className, name }: ColorProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold">{name}</div>
            <div className="flex h-24 items-center justify-center rounded-md border border-current/20 p-1 text-center">
                <div
                    className={cn(
                        'flex size-full flex-col items-center justify-center gap-2 rounded-xs px-6',
                        className,
                    )}
                >
                    <div className="text-base leading-none">
                        <b>Normal</b> Text
                    </div>
                    <div className="text-sm leading-none">
                        <b>Small</b> Text
                    </div>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 p-10">
            <h4 className="text-current/60">Theme</h4>
            <div className="grid grid-cols-3 gap-2">
                <Color className="bg-primary text-on-primary" name="Primary" />
            </div>
            <h4 className="text-current/60">Semantic</h4>
            <div className="grid grid-cols-3 gap-2">
                <Color className="bg-danger text-on-danger" name="Danger" />
                <Color className="bg-warning text-on-warning" name="Warning" />
                <Color className="bg-success text-on-success" name="Success" />
            </div>
            <h4 className="text-current/60">Surface</h4>
            <div className="grid grid-cols-3 gap-2">
                <Color className="bg-surface-0 text-on-surface-0" name="Surface 0" />
                <Color className="bg-surface-1 text-on-surface-1" name="Surface 1" />
                <Color className="bg-surface-2 text-on-surface-2" name="Surface 2" />
            </div>
        </div>
    );
}
