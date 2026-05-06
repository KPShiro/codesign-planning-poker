import { Navbar } from '@components/navbar';
import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';
import { PageContainer } from '../page/page-container';

type NavbarPageLayoutProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & {
    actions?: React.ReactElement[];
};

export function NavbarPageLayout({ className, children, actions }: NavbarPageLayoutProps) {
    return (
        <div className="min-h-dvh">
            <Navbar actions={actions} />
            <PageContainer className={cn('flex flex-col gap-6 py-10', className)}>
                {children}
            </PageContainer>
        </div>
    );
}
