import { cn } from '@utils/cn';

type ColorSelectorProps = React.ComponentProps<'input'> & {
    valuesList: string[];
    value: string;
    onValueChange: (value: string) => void;
};

export function ColorSelector({
    valuesList,
    value,
    onValueChange,
    className,
    ...inputProps
}: ColorSelectorProps) {
    return (
        <div className={cn('flex flex-wrap gap-1', className)}>
            <input
                {...inputProps}
                type="color"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                hidden
            />
            {valuesList.map((color) => (
                <button
                    key={color}
                    type="button"
                    onClick={() => onValueChange(color)}
                    disabled={inputProps.disabled}
                    {...(value === color && { 'data-selected': true })}
                    className={cn(
                        'group size-12 cursor-pointer rounded-md border-2 border-current/15 p-1',
                        'data-selected:border-current',
                        'enabled:hover:border-current',
                        'enabled:focus:border-current',
                        'disabled:opacity-disabled disabled:cursor-default',
                    )}
                >
                    <div className="size-full rounded-xs" style={{ backgroundColor: color }}></div>
                </button>
            ))}
        </div>
    );
}
