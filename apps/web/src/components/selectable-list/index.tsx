import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';
import SelectableListItem from './selectable-list-item';

type SectionButtonProps = ComponentProps<'div'>;

const SelectableList = ({ className, ...props }: SectionButtonProps) => {
    return <div {...props} className={cn('flex flex-col divide-y divide-current/15', className)} />;
};

SelectableList.Item = SelectableListItem;

export default SelectableList;
