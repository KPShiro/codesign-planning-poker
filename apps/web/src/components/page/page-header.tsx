import { cn } from '@utils/cn';

type PageHeaderProps = Pick<React.ComponentProps<'div'>, 'className'> & {
    title: string;
    description?: string;
    action?: React.ReactNode;
};

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
    return (
        <div
            className={cn(
                'flex items-start justify-between gap-4',
                'max-tablet:flex-col',
                className,
            )}
        >
            <div className="flex flex-col gap-2">
                <h1>{title}</h1>
                {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {action}
        </div>
    );
}
