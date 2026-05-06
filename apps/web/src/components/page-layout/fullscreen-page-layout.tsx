import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type FullscreenPageLayoutProps = Pick<ComponentProps<'div'>, 'children' | 'className'>;

export function FullscreenPageLayout({ className, children }: FullscreenPageLayoutProps) {
    return <div className={cn('min-h-dvh', className)}>{children}</div>;
}
