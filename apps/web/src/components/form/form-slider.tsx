import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type SliderProps = ComponentProps<typeof RadixSlider.Root> &
    Partial<{
        min: number;
        max: number;
        step: number;
        defaultValue: number[];
    }>;

function Slider({ className, ...props }: SliderProps) {
    return (
        <RadixSlider.Root
            {...props}
            min={props.min ?? 0}
            max={props.max ?? 100}
            step={props.step ?? 1}
            defaultValue={props.defaultValue ?? [50]}
            className={cn('group relative flex h-full w-full items-center select-none', className)}
        >
            <RadixSlider.Track className="peer relative h-1.5 grow overflow-clip rounded-full bg-current/15 group-focus:outline-2 group-focus:outline-current">
                <RadixSlider.Range className="bg-primary absolute h-full rounded-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb
                className={cn(
                    'mx-4 block h-4 w-8 transition-all duration-300 outline-none',
                    'rounded-full border border-transparent bg-current backdrop-blur-xs',
                    'hover:scale-125 hover:border-current hover:bg-current/15',
                    'active:scale-125 active:border-current active:bg-current/15 active:outline-transparent',
                )}
            />
        </RadixSlider.Root>
    );
}

export default Slider;
