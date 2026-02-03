import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type DefaultPageLayoutProps = ComponentProps<'div'>;

function DefaultPageLayout({ className, ...props }: DefaultPageLayoutProps) {
    return (
        <div
            {...props}
            className={cn('mx-auto flex min-h-dvh max-w-xl flex-col gap-6 p-6', className)}
        >
            {props.children}
        </div>
    );
}

export default DefaultPageLayout;
