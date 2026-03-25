import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type GamesListGroupProps = ComponentProps<'div'> & {
    label: string;
};

function GamesListGroup({ label, className, children, ...props }: GamesListGroupProps) {
    return (
        <div {...props} className={cn('flex flex-col gap-2', className)}>
            <h6 className="text-current/60">{label}</h6>
            {children}
        </div>
    );
}

export default GamesListGroup;
