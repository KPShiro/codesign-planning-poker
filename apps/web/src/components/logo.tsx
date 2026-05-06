import { cn } from '@utils/cn';

type LogoProps = React.ComponentProps<'div'>;

export function Logo({ className, ...props }: LogoProps) {
    return (
        <div {...props} className={cn('flex gap-1 font-bold', className)}>
            <span className="text-current">Codesign</span>
            <span className="text-primary">Poker</span>
        </div>
    );
}
