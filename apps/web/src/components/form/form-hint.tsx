import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormHintProps = ComponentProps<'div'>;

function FormHint({ children, ...props }: FormHintProps) {
    return (
        <div {...props} className={cn('text-text-1 text-sm', props.className)}>
            {children}
        </div>
    );
}

export default FormHint;
