import { Button } from '@components/button';
import { cn } from '@utils/cn';
import { EditIcon, TrashIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

type RoomWidgetProps = Pick<ComponentProps<'div'>, 'className'> & {
    icon: ReactNode;
    textPrimary: string;
    textSecondary: string;
    disabled?: boolean;
    onDeleteClick?: () => void;
    onEditClick?: () => void;
    onJoinClick?: () => void;
};

export function RoomWidget({
    icon,
    textPrimary,
    textSecondary,
    className,
    disabled,
    onDeleteClick,
    onEditClick,
    onJoinClick,
}: RoomWidgetProps) {
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
                        'bg-surface-2 text-on-surface-2 @container flex size-12 shrink-0 grow-0 items-center justify-center rounded-sm',
                        'max-tablet:hidden',
                    )}
                >
                    <span className="text-[50cqw]">{icon}</span>
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
                        disabled={disabled}
                    />
                    <Button
                        variant="outlined"
                        icon={<EditIcon />}
                        title="Edit"
                        onClick={onEditClick}
                        disabled={disabled}
                    />
                </div>
                <div className="h-2 w-0.5 bg-current/15"></div>
                <Button
                    variant="outlined"
                    title="Join"
                    label="Join"
                    onClick={onJoinClick}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
