import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';
import SectionContainer from './section-container';
import SectionButton from './section-button';

type SectionProps = Pick<ComponentProps<'div'>, 'children' | 'className'> & {
    title?: string;
    description?: string;
};

const Section = (props: SectionProps) => {
    return (
        <div className={cn('flex flex-col gap-3 select-none')}>
            {props.title ? (
                <div className="px-4 font-bold text-current/60">{props.title}</div>
            ) : null}
            <div
                className={cn(
                    'divide-y divide-current/15 overflow-clip rounded-md bg-current/5',
                    props.className,
                )}
            >
                {props.children}
            </div>
            {props.description ? (
                <div className="px-4 text-sm text-current/60">{props.description}</div>
            ) : null}
        </div>
    );
};

Section.displayName = 'Section';

Section.Container = SectionContainer;
Section.Button = SectionButton;

export default Section;
