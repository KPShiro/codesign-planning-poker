import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type GamesListGroupProps = ComponentProps<'div'> & {
    label: string;
};

export function GamesListGroup({ label, className, children, ...props }: GamesListGroupProps) {
    return (
        <div {...props} className={cn('flex flex-col gap-4', className)}>
            <div className="text-xs font-semibold uppercase">{label}</div>
            {children}
        </div>
    );
}
