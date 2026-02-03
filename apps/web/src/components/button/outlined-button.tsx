import { cn } from '@utils/cn';
import type { BaseButtonProps } from '.';

function OutlinedButton({ icon, label, size, ...props }: BaseButtonProps) {
    return (
        <button
            {...props}
            type={props.type || 'button'}
            className={cn(
                'flex items-center justify-center overflow-clip select-none',
                size === 'sm' && 'h-10 gap-1.5 px-3',
                size === 'md' && 'h-12 gap-2 px-4',
                'cursor-pointer rounded-md border border-current/15 bg-transparent text-current',
                'disabled:cursor-not-allowed disabled:text-current/25',
                'enabled:hover:border-current/25 enabled:hover:bg-current/5',
                'enabled:active:border-current/15 enabled:active:bg-current/5',
                icon && !label && 'aspect-square px-0',
                icon && label && size === 'sm' && 'pr-4',
                icon && label && size === 'md' && 'pr-6',
                props.className,
            )}
        >
            {icon ? (
                <div className="flex size-5 items-center justify-center p-0.5">{icon}</div>
            ) : null}
            {label ? (
                <span
                    className={cn(
                        'font-medium',
                        size === 'sm' && 'text-sm',
                        size === 'md' && 'text-md',
                    )}
                >
                    {label}
                </span>
            ) : null}
        </button>
    );
}

export default OutlinedButton;
