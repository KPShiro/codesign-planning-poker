import { Logo } from '@components/logo';
import { PageContainer } from '@components/page/page-container';
import { Link } from '@tanstack/react-router';
import { cn } from '@utils/cn';

export type NavbarProps = Pick<React.ComponentProps<'div'>, 'className'> & {
    actions?: React.ReactElement[];
};

export function Navbar({ actions = [], ...props }: NavbarProps) {
    return (
        <div
            {...props}
            className={cn(
                'bg-surface-1 z-navbar sticky top-0 border-b-2 border-current/15',
                props.className,
            )}
        >
            <PageContainer className="flex items-center justify-between py-4">
                <Link to="/">
                    <Logo />
                </Link>
                <div className="flex gap-2">{...actions}</div>
            </PageContainer>
        </div>
    );
}
