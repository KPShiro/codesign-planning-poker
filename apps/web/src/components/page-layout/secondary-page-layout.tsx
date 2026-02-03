import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type SecondaryPageLayoutProps = ComponentProps<'div'> & {
    header: string;
    action?: React.ReactNode;
};

function SecondaryPageLayout({ header, action, className, ...props }: SecondaryPageLayoutProps) {
    return (
        <div {...props} className={cn('mx-auto flex min-h-dvh max-w-xl flex-col', className)}>
            <div className="bg-surface-0 sticky top-0 z-100 flex items-center justify-between border-b border-current/15 p-6">
                <div className="absolute left-6">{action}</div>
                <div className="flex flex-1 items-center justify-center">
                    <span className="text-center font-medium">{header}</span>
                </div>
            </div>
            <div className="flex flex-col gap-6 p-6">{props.children}</div>
        </div>
    );
}

export default SecondaryPageLayout;
