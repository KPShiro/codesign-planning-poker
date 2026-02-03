import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormLabelProps = ComponentProps<'label'>;

function FormLabel({ children, ...props }: FormLabelProps) {
    return (
        <label {...props} className={cn('text-text-1 text-xs font-bold', props.className)}>
            {children}
        </label>
    );
}

export default FormLabel;
