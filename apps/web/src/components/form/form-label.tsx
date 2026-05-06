import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormLabelProps = ComponentProps<'label'>;

export function FormLabel({ children, ...props }: FormLabelProps) {
    return (
        <label {...props} className={cn('text-xs font-bold text-current/60', props.className)}>
            {children}
        </label>
    );
}
