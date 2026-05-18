import { cn } from '@utils/cn';
import type { BaseButtonProps } from '.';

export function OutlinedButton({ icon, label, size, ...props }: BaseButtonProps) {
    return (
        <button
            {...props}
            type={props.type || 'button'}
            className={cn(
                'flex items-center justify-center overflow-clip select-none',
                size === 'sm' && 'h-9 gap-1.5 px-3',
                size === 'md' && 'h-10 gap-2 px-4',
                'cursor-pointer rounded-sm border-2 border-current/15 bg-transparent text-current',
                'disabled:cursor-not-allowed disabled:text-current/25',
                'enabled:hover:bg-current/10',
                'enabled:active:bg-current/5',
                icon && !label && 'aspect-square px-0',
                icon && label && size === 'sm' && 'pr-4',
                icon && label && size === 'md' && 'pr-5',
                props.className,
            )}
        >
            {icon ? (
                <div
                    className={cn(
                        'flex items-center justify-center',
                        size === 'sm' && 'size-4',
                        size === 'md' && 'size-4',
                        label && icon && '-ml-0.5',
                    )}
                >
                    {icon}
                </div>
            ) : null}
            {label ? (
                <span
                    className={cn(
                        'font-medium',
                        size === 'sm' && 'text-xs',
                        size === 'md' && 'text-sm',
                    )}
                >
                    {label}
                </span>
            ) : null}
        </button>
    );
}
