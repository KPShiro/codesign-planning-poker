import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormFieldProps = ComponentProps<'div'>;

function FormField({ children, ...props }: FormFieldProps) {
    return (
        <div {...props} className={cn('flex flex-col gap-2', props.className)}>
            {children}
        </div>
    );
}

export default FormField;
