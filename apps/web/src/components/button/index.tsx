import type { ComponentProps, ReactNode } from 'react';
import FilledButton from './filled-button';
import OutlinedButton from './outlined-button';

type ButtonSize = 'sm' | 'md';

type ButtonContentProps =
    | {
          label: string;
          icon?: never;
      }
    | {
          icon: ReactNode;
          label?: never;
      }
    | {
          label: string;
          icon: ReactNode;
      };

export type BaseButtonProps = ComponentProps<'button'> &
    ButtonContentProps & {
        size?: ButtonSize;
    };

type ButtonProps = BaseButtonProps & {
    variant: 'filled' | 'outlined';
};

function Button({ variant = 'filled', size = 'md', ...props }: ButtonProps) {
    if (variant === 'filled') {
        return <FilledButton {...props} size={size} />;
    }

    return <OutlinedButton {...props} size={size} />;
}

export default Button;
