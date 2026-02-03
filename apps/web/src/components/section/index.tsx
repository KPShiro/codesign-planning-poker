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
            {props.title ? <div className="text-text-1 px-4 font-bold">{props.title}</div> : null}
            <div
                className={cn(
                    'divide-y divide-current/15 overflow-clip rounded-md bg-current/5',
                    props.className,
                )}
            >
                {props.children}
            </div>
            {props.description ? (
                <div className="text-text-1 px-4 text-sm">{props.description}</div>
            ) : null}
        </div>
    );
};

Section.displayName = 'Section';

Section.Container = SectionContainer;
Section.Button = SectionButton;

export default Section;
