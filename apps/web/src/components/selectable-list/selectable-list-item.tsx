import { cn } from '@utils/cn';
import { CheckIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

type SectionButtonProps = ComponentProps<'button'> & {
    primaryText: string;
    secondaryText?: string;
    isSelected: boolean;
};

const SelectableListItem = ({
    primaryText,
    secondaryText,
    isSelected = false,
    className,
    ...props
}: SectionButtonProps) => {
    return (
        <button
            {...props}
            type={props.type ?? 'button'}
            className={cn(
                'flex w-full items-center justify-between gap-4 p-4 pr-5',
                'enabled:cursor-pointer enabled:hover:bg-current/5 enabled:active:bg-current/5',
                'disabled:opacity-disabled disabled:cursor-not-allowed',
                className,
            )}
            disabled={props.disabled || isSelected}
        >
            <div className="flex flex-1 flex-col gap-1 text-left">
                <div className="font-medium">{primaryText}</div>
                {secondaryText ? (
                    <div className="text-sm text-current/60">{secondaryText}</div>
                ) : null}
            </div>
            {isSelected ? <CheckIcon size={20} /> : null}
        </button>
    );
};

export default SelectableListItem;
