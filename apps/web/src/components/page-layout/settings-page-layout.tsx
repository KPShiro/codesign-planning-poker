import { Button } from '@components/button';
import { Link } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { NavbarPageLayout } from './navbar-page-layout';

type SettingsPageLayoutProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & {
    actions?: React.ReactElement[];
};

export function SettingsPageLayout({ className, children, actions }: SettingsPageLayoutProps) {
    return (
        <NavbarPageLayout
            actions={[
                ...(actions || []),
                <Link to="/">
                    <Button size="sm" variant="outlined" icon={<XIcon />} title="Close Settings" />
                </Link>,
            ]}
            className={className}
        >
            {children}
        </NavbarPageLayout>
    );
}
