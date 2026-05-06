import { Button } from '@components/button';
import { ColorSelector } from '@components/form/color-selector';
import { FormError } from '@components/form/form-error';
import { FormField } from '@components/form/form-field';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/form/text-input';
import { usePlayerAccount } from '@hooks/use-player-account';
import { useForm } from '@tanstack/react-form';
import { cn } from '@utils/cn';
import { type ComponentProps } from 'react';
import { accountFormSchema, type AccountFormOutput } from './schema';

const availableColors = ['#155dfc', '#ff2056', '#fd9a00', '#00c950'];

type AccountFormProps = Pick<ComponentProps<'form'>, 'className'> & {
    onSubmit?: (value: AccountFormOutput) => void | Promise<void>;
    submitLabel?: string;
    resetLabel?: string;
};

export function AccountForm({ onSubmit, submitLabel, resetLabel, ...props }: AccountFormProps) {
    const playerAccount = usePlayerAccount();

    const form = useForm({
        defaultValues: {
            username: playerAccount.username || '',
            color: playerAccount.userColor || '',
        },
        validators: {
            onChange: accountFormSchema,
        },
        onSubmit: async ({ value }) => {
            playerAccount.setUsername(value.username);
            playerAccount.setUserColor(value.color);
            await onSubmit?.(value);
            form.reset(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className={cn('flex flex-col gap-6', props.className)}
        >
            <div className="bg-surface-1 flex flex-col gap-4 rounded-md p-6">
                <form.Field
                    name="username"
                    children={(field) => (
                        <FormField>
                            <FormLabel htmlFor={field.name}>Username</FormLabel>
                            <TextInput
                                id={field.name}
                                name={field.name}
                                placeholder="e.g. Coder420"
                                autoComplete="given-name"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onValueChange={field.handleChange}
                            />
                            {!field.state.meta.isValid && field.state.meta.isDirty ? (
                                <FormError>
                                    {field.state.meta.errors
                                        .map((error) => error?.message)
                                        .join(', ')}
                                </FormError>
                            ) : null}
                        </FormField>
                    )}
                />
                <form.Field
                    name="color"
                    children={(field) => (
                        <FormField>
                            <FormLabel htmlFor={field.name}>Color</FormLabel>
                            <ColorSelector
                                valuesList={availableColors}
                                name={field.name}
                                value={field.state.value}
                                onValueChange={field.handleChange}
                            />
                            {!field.state.meta.isValid && field.state.meta.isDirty ? (
                                <FormError>
                                    {field.state.meta.errors
                                        .map((error) => error?.message)
                                        .join(', ')}
                                </FormError>
                            ) : null}
                        </FormField>
                    )}
                />
            </div>
            <div className="flex gap-2">
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isPristine]}
                    children={([canSubmit, isPristine]) => (
                        <Button
                            type="submit"
                            variant="filled"
                            label={submitLabel || 'Confirm'}
                            disabled={!canSubmit || isPristine}
                            onClick={form.handleSubmit}
                        />
                    )}
                />
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isPristine]}
                    children={([canSubmit, isPristine]) => (
                        <Button
                            variant="outlined"
                            label={resetLabel || 'Reset'}
                            disabled={!canSubmit || isPristine}
                            onClick={() => form.reset()}
                        />
                    )}
                />
            </div>
        </form>
    );
}
