import { cn } from '@utils/cn';
import { ChevronRightIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

type SectionButtonProps = ComponentProps<'button'> & {
    label: string;
    value?: string;
};

const SectionButton = ({ label, value, className, ...props }: SectionButtonProps) => {
    return (
        <button
            {...props}
            type={props.type ?? 'button'}
            className={cn(
                'flex w-full items-center justify-between gap-4 p-4',
                'enabled:cursor-pointer enabled:hover:bg-current/5 enabled:active:bg-current/5',
                'disabled:opacity-disabled disabled:cursor-not-allowed',
                className,
            )}
        >
            <div className="text-base">{label}</div>
            <div className="text-text-1 flex items-center gap-4">
                {value ? <div className="text-sm font-medium">{value}</div> : null}
                <ChevronRightIcon size={20} />
            </div>
        </button>
    );
};

export default SectionButton;
