import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';
import { Slider } from './form-slider';

type SliderInputProps = ComponentProps<typeof Slider> & {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};

export function SliderInput({ className, iconLeft, iconRight, ...props }: SliderInputProps) {
    return (
        <div
            className={cn(
                'flex h-12 gap-4 rounded-sm border border-current/15 px-4',
                'active:outline-none has-focus-visible:outline',
                className,
            )}
        >
            {iconLeft ? <div className="flex items-center justify-center">{iconLeft}</div> : null}
            <Slider {...props} />
            {iconRight ? <div className="flex items-center justify-center">{iconRight}</div> : null}
        </div>
    );
}
