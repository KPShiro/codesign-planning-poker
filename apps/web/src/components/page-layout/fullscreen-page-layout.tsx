import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type ContentAlignment = 'center' | 'start' | 'end';

type FullscreenPageLayoutProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & {
    alignX?: ContentAlignment;
    alignY?: ContentAlignment;
};

export function FullscreenPageLayout({
    className,
    children,
    alignX = 'start',
    alignY = 'start',
}: FullscreenPageLayoutProps) {
    return (
        <div
            className={cn(
                'max-tablet:pt-safe-top max-tablet:pb-safe-bottom flex min-h-dvh flex-col gap-6 p-10',
                className,
                alignX === 'center' && 'items-center',
                alignX === 'start' && 'items-start',
                alignX === 'end' && 'items-end',
                alignY === 'center' && 'justify-center',
                alignY === 'start' && 'justify-start',
                alignY === 'end' && 'justify-end',
            )}
        >
            {children}
        </div>
    );
}
