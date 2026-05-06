import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormErrorProps = ComponentProps<'div'>;

export function FormError({ children, ...props }: FormErrorProps) {
    return (
        <div {...props} className={cn('text-danger text-sm', props.className)}>
            {children}
        </div>
    );
}
