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
        <div className={cn('flex gap-1', className)}>
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
                    className={cn(
                        'size-10 cursor-pointer rounded-md border-2 p-1',
                        'disabled:opacity-disabled disabled:cursor-default',
                        value === color ? 'border-current' : 'border-current/15',
                    )}
                >
                    <div className="size-full rounded-xs" style={{ backgroundColor: color }}></div>
                </button>
            ))}
        </div>
    );
}
