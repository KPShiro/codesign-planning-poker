import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';
import { SectionButton } from './section-button';

export type SectionAction = {
    label: string;
    value?: string;
    variant?: 'button' | 'link';
    color?: 'default' | 'danger';
    onClick: () => void;
};

type SectionProps = Pick<ComponentProps<'div'>, 'className'> & {
    title?: string;
    description?: string;
    actions?: SectionAction[];
};

export const Section = ({ title, description, actions, className }: SectionProps) => {
    return (
        <div className={cn('flex flex-col gap-4 select-none', className)}>
            {title ? <div className="text-xs font-semibold uppercase">{title}</div> : null}
            {actions && actions.length > 0 ? (
                <div className="bg-surface-1 divide-y divide-current/8 rounded-md py-2">
                    {actions.map((action, index) => (
                        <SectionButton key={index} {...action} />
                    ))}
                </div>
            ) : null}
            {description ? (
                <div className="max-w-prose text-sm text-current/60">{description}</div>
            ) : null}
        </div>
    );
};

Section.displayName = 'Section';
