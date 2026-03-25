import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FormHintProps = ComponentProps<'div'>;

function FormHint({ children, ...props }: FormHintProps) {
    return (
        <div {...props} className={cn('text-sm text-current/60', props.className)}>
            {children}
        </div>
    );
}

export default FormHint;
