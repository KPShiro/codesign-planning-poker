import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

type SectionContainerProps = Pick<ComponentProps<'div'>, 'children' | 'className'>;

const SectionContainer = (props: SectionContainerProps) => {
    return <div className={cn('p-4', props.className)}>{props.children}</div>;
};

export default SectionContainer;
