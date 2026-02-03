import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormErrorProps = ComponentProps<'div'>;

function FormError({ children, ...props }: FormErrorProps) {
    return (
        <div {...props} className={cn('text-danger text-sm', props.className)}>
            {children}
        </div>
    );
}

export default FormError;
