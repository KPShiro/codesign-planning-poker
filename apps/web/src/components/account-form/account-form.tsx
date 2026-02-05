import { type ComponentProps } from 'react';
import { cn } from '@utils/cn';
import TextInput from '@components/form/text-input';
import FormError from '@components/form/form-error';
import FormField from '@components/form/form-field';
import FormLabel from '@components/form/form-label';
import Button from '@components/button';
import { useForm } from '@tanstack/react-form';
import { usePlayerAccount } from '@hooks/use-player-account';
import Section from '@components/section';
import { accountFormSchema, type AccountFormOutput } from './account-form-schema';

type AccountFormProps = Pick<ComponentProps<'form'>, 'className'> & {
    onSubmit?: (value: AccountFormOutput) => void | Promise<void>;
};

function AccountForm({ onSubmit, ...props }: AccountFormProps) {
    const playerAccount = usePlayerAccount();

    const form = useForm({
        defaultValues: {
            username: playerAccount.username || '',
        },
        validators: {
            onChange: accountFormSchema,
        },
        onSubmit: async ({ value }) => {
            playerAccount.setUsername(value.username);
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
            className={cn('flex flex-col gap-4', props.className)}
        >
            <Section>
                <Section.Container>
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
                </Section.Container>
            </Section>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isPristine]}
                children={([canSubmit, isPristine]) => (
                    <Button
                        type="submit"
                        variant="filled"
                        label="Confirm"
                        disabled={!canSubmit || isPristine}
                        onClick={form.handleSubmit}
                    />
                )}
            />
        </form>
    );
}

export default AccountForm;
