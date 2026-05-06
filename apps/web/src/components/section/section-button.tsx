import { cn } from '@utils/cn';
import { ChevronRightIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import type { SectionAction } from '.';

type SectionButtonProps = ComponentProps<'button'> & SectionAction;

export const SectionButton = ({
    label,
    value,
    variant = 'link',
    color = 'default',
    className,
    ...props
}: SectionButtonProps) => {
    return (
        <button
            {...props}
            type={props.type ?? 'button'}
            className={cn(
                'flex w-full items-center gap-6 px-6 py-4',
                'enabled:cursor-pointer enabled:hover:bg-current/5',
                'disabled:opacity-disabled disabled:cursor-not-allowed',
                className,
            )}
        >
            <div
                className={cn(
                    'flex-1 truncate text-left text-sm font-medium',
                    color === 'danger' ? 'text-danger' : 'text-current',
                )}
            >
                {label}
            </div>
            {value ? (
                <div className="hidden text-xs font-semibold text-current/60 sm:block">{value}</div>
            ) : null}
            {variant === 'link' ? <ChevronRightIcon className="h-4 w-4 text-current/60" /> : null}
        </button>
    );
};
