import { FilledButton } from './filled.button';
import { GhostButton } from './ghost.button';
import { OutlinedButton } from './outlined.button';

type ButtonVariant = 'filled' | 'outlined' | 'ghost';

type ButtonSize = 'sm' | 'md';

type ButtonContentProps =
    | {
          label: string;
          icon?: never;
      }
    | {
          icon: React.ReactNode;
          label?: never;
      }
    | {
          label: string;
          icon: React.ReactNode;
      };

export type BaseButtonProps = React.ComponentProps<'button'> &
    ButtonContentProps & {
        size?: ButtonSize;
    };

type ButtonProps = BaseButtonProps & {
    variant: ButtonVariant;
};

const buttons: Record<ButtonVariant, (props: BaseButtonProps) => React.ReactNode> = {
    filled: (props: BaseButtonProps) => <FilledButton {...props} />,
    outlined: (props: BaseButtonProps) => <OutlinedButton {...props} />,
    ghost: (props: BaseButtonProps) => <GhostButton {...props} />,
};

export function Button({ variant = 'filled', size = 'md', ...props }: ButtonProps) {
    return buttons[variant]({ ...props, size });
}
