import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type RoomsListGroupProps = ComponentProps<'div'> & {
    label: string;
};

export function RoomsListGroup({ label, className, children, ...props }: RoomsListGroupProps) {
    return (
        <div {...props} className={cn('flex flex-col gap-4', className)}>
            <div className="text-xs font-semibold uppercase">{label}</div>
            {children}
        </div>
    );
}
