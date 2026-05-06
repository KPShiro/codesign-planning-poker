import { cn } from '@utils/cn';

type PageContainerProps = Pick<React.ComponentProps<'div'>, 'className' | 'children'>;

export function PageContainer({ className, children }: PageContainerProps) {
    return <div className={cn('max-w-page mx-auto w-full px-6', className)}>{children}</div>;
}
