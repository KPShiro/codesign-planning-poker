import { cn } from '@utils/cn';
import type { BaseButtonProps } from '.';

export function FilledButton({ icon, label, size, ...props }: BaseButtonProps) {
    return (
        <button
            {...props}
            type={props.type || 'button'}
            className={cn(
                'flex items-center justify-center overflow-clip select-none',
                size === 'sm' && 'h-9 gap-1.5 px-3',
                size === 'md' && 'h-10 gap-2 px-4',
                'bg-primary text-on-primary cursor-pointer rounded-md',
                'disabled:cursor-not-allowed disabled:bg-current/10 disabled:text-current/25',
                'enabled:hover:brightness-115',
                'enabled:active:brightness-85',
                icon && !label && 'aspect-square px-0',
                icon && label && size === 'sm' && 'pr-4',
                icon && label && size === 'md' && 'pr-6',
                props.className,
            )}
        >
            {icon ? (
                <div
                    className={cn(
                        'flex size-5 items-center justify-center p-0.5 text-sm',
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
