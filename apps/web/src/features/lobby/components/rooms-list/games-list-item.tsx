import { Button } from '@components/button';
import { cn } from '@utils/cn';
import { EditIcon, TrashIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

type GamesListItemProps = Pick<ComponentProps<'div'>, 'className'> & {
    icon: string;
    textPrimary: string;
    textSecondary: string;
    onDeleteClick?: () => void;
    onEditClick?: () => void;
    onJoinClick?: () => void;
};

export function GamesListItem({
    icon,
    textPrimary,
    textSecondary,
    className,
    onDeleteClick,
    onEditClick,
    onJoinClick,
}: GamesListItemProps) {
    return (
        <div
            className={cn(
                'flex items-center gap-4 p-4 select-none',
                'bg-surface-1 rounded-md',
                className,
            )}
        >
            <div className="flex min-w-0 flex-1 items-center gap-4">
                <div
                    className={cn(
                        'bg-surface-2 text-on-surface-2 flex size-12 shrink-0 grow-0 items-center justify-center rounded-sm',
                        'max-tablet:hidden',
                    )}
                >
                    {icon}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate">{textPrimary}</span>
                    <span className="truncate text-xs text-current/60">{textSecondary}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        icon={<TrashIcon />}
                        title="Delete"
                        onClick={onDeleteClick}
                    />
                    <Button
                        variant="outlined"
                        icon={<EditIcon />}
                        title="Edit"
                        onClick={onEditClick}
                    />
                </div>
                <div className="h-2 w-0.5 bg-current/15"></div>
                <Button variant="outlined" title="Join" label="Join" onClick={onJoinClick} />
            </div>
        </div>
    );
}
