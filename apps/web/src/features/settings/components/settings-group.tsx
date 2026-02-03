import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type SettingsGroupProps = ComponentProps<'div'> & {
    label?: string;
    description?: string;
};

function SettingsGroup({ label, description, children, ...props }: SettingsGroupProps) {
    return (
        <div {...props} className="flex flex-col gap-2">
            {label ? <div className="text-text-1 px-4 text-sm font-semibold">{label}</div> : null}
            <div className={cn('rounded-md bg-current/5 p-4', props.className)}>{children}</div>
            {description ? <div className="text-text-1 px-4 text-sm">{description}</div> : null}
        </div>
    );
}

export default SettingsGroup;
