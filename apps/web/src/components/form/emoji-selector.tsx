import { type EmojiId } from '@codesign-planning-poker/shared';
import { useEmoji } from '@hooks/use-emoji';
import { cn } from '@utils/cn';

type EmojiSelectorProps = Pick<React.ComponentProps<'div'>, 'id'> & {
    value?: EmojiId;
    onValueChange?: (value: EmojiId) => void;
    disabled?: boolean;
};

export function EmojiSelector({ id, value, onValueChange, disabled = false }: EmojiSelectorProps) {
    const { emojis } = useEmoji();

    const handleOnIconClick = (icon: EmojiId) => {
        if (value === icon) {
            return;
        }

        onValueChange?.(icon);
    };

    return (
        <div id={id} className={cn('flex flex-wrap gap-1')}>
            {emojis.map((emoji) => (
                <button
                    key={emoji.id}
                    onClick={() => handleOnIconClick(emoji.id)}
                    data-selected={value === emoji.id}
                    disabled={disabled || emoji.disabled}
                    className={cn(
                        'bg-surface-0 @container flex aspect-square size-12 cursor-pointer items-center justify-center rounded-md border-2 border-current/15',
                        'enabled:hover:border-current',
                        'enabled:focus:border-current',
                        'data-[selected=true]:border-current',
                        'disabled:opacity-disabled disabled:cursor-default',
                    )}
                    type="button"
                >
                    <span className="text-[50cqw]">{emoji.symbol}</span>
                </button>
            ))}
        </div>
    );
}
