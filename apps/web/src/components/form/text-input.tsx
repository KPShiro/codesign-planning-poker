import { useId, useRef, type ChangeEvent, type ComponentProps } from 'react';
import { cn } from '@utils/cn';
import { XIcon } from 'lucide-react';

type TextInputProps = Omit<ComponentProps<'input'>, 'type'> & {
    onValueChange?: (value: string) => void;
};

function TextInput({ onValueChange, ref, ...props }: TextInputProps) {
    const generatedId = useId();
    const inputId = props.id || generatedId;

    const innerInputRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || innerInputRef;

    const showClearButton =
        props.value && String(props.value).length > 0 && !props.disabled && !props.readOnly;

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const originalValue = e.target.value;
        const valueWithoutSpaces = originalValue.replace(/\s/g, '');

        if (originalValue !== valueWithoutSpaces) {
            // Remain cursor position after removing spaces
            const cursorPosition = e.target.selectionStart;

            e.target.value = valueWithoutSpaces;

            // Set cursor position back
            if (cursorPosition && e.target.type === 'text') {
                e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }
        }

        props.onChange?.(e);
        onValueChange?.(e.target.value);
    };

    const handleClear = () => {
        if (props.onChange || onValueChange) {
            const nativeEvent = new Event('change', { bubbles: true });
            const syntheticEvent = {
                ...nativeEvent,
                target: { ...nativeEvent.target, value: '', name: props.name },
                currentTarget: { ...nativeEvent.currentTarget, value: '', name: props.name },
            } as unknown as ChangeEvent<HTMLInputElement>;

            handleOnChange(syntheticEvent);
        }

        resolvedRef.current?.focus();
    };

    return (
        <div
            className={cn(
                'group flex h-12 w-full rounded border text-base',
                'border-border bg-input-bg text-input-text',
                'has-disabled:bg-input-bg/5 has-disabled:text-input-text/50 has-disabled:select-none',
                // 'has-enabled:hover:border-current/25',
                'focus-within:outline',
                props.className,
            )}
        >
            <input
                {...props}
                id={inputId}
                ref={innerInputRef}
                type="text"
                onChange={handleOnChange}
                className={cn(
                    'h-full w-full px-4 text-ellipsis',
                    'focus:outline-none',
                    showClearButton ? 'pr-0' : '',
                )}
            />
            {showClearButton ? (
                <button
                    type="button"
                    tabIndex={-1}
                    className={cn(
                        'flex aspect-square h-full cursor-pointer items-center justify-center brightness-60',
                        'hover:brightness-100',
                    )}
                    onClick={handleClear}
                >
                    <XIcon size={16} aria-hidden="true" />
                </button>
            ) : null}
        </div>
    );
}

export default TextInput;
