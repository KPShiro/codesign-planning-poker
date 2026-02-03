import { cn } from '@utils/cn';
import { UserIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

type GamesListItemProps = Omit<ComponentProps<'button'>, 'type'> & {
    label: string;
    playersCount: number;
};

function GamesListItem({ label, playersCount, className, onClick, ...props }: GamesListItemProps) {
    const maxPlayersCount = 8;
    const freeSeatsCount = maxPlayersCount - playersCount;
    const canInteract = freeSeatsCount > 0;

    const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (!canInteract) return;
        onClick?.(e);
    };

    return (
        <button
            {...props}
            type="button"
            title={label}
            aria-label={label}
            onClick={handleOnClick}
            className={cn(
                'flex items-center justify-between gap-2 p-6 select-none',
                'rounded-md border border-current/15 transition-transform',
                'disabled:opacity-disabled disabled:cursor-not-allowed',
                'enabled:hover:cursor-pointer enabled:hover:border-current/20 enabled:hover:bg-current/5',
                'enabled:active:scale-99 enabled:active:bg-current/5',
                className,
            )}
        >
            <span className="text-base font-semibold">{label}</span>
            <div className="flex">
                {Array.from({ length: playersCount }).map((_, index) => (
                    <UserIcon
                        key={`taken-seat-${index}`}
                        size={14}
                        className="text-primary fill-primary"
                    />
                ))}
                {Array.from({ length: freeSeatsCount }).map((_, index) => (
                    <UserIcon key={`free-seat-${index}`} size={14} className="text-current/15" />
                ))}
            </div>
        </button>
    );
}

export default GamesListItem;
