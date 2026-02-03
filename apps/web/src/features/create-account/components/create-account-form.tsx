import { type ComponentProps } from 'react';
import { cn } from '@utils/cn';
import TextInput from '@components/form/text-input';
import FormHint from '@components/form/form-hint';
import FormError from '@components/form/form-error';
import FormField from '@components/form/form-field';
import FormLabel from '@components/form/form-label';
import Button from '@components/button';
import { useForm } from '@tanstack/react-form';
import { accountFormSchema } from '@forms/account-form';
import { useNavigate } from '@tanstack/react-router';
import { usePlayerAccount } from '@hooks/use-player-account';

type CreateAccountFormProps = Omit<ComponentProps<'form'>, 'onSubmit'>;

function CreateAccountForm(props: CreateAccountFormProps) {
    const { username, updateUsername } = usePlayerAccount();

    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            username: username || '',
        },
        validators: {
            onChange: accountFormSchema,
        },
        onSubmit: async ({ value }) => {
            form.reset(value);
            updateUsername(value.username);
            navigate({ to: '/' });
        },
    });

    return (
        <form
            {...props}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            className={cn('flex flex-col gap-4', props.className)}
        >
            <form.Field
                name="username"
                children={(field) => (
                    <FormField>
                        <FormLabel htmlFor={field.name}>Username</FormLabel>
                        <TextInput
                            id={field.name}
                            name={field.name}
                            placeholder="e.g. AmazingCoder42"
                            autoComplete="given-name"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onValueChange={field.handleChange}
                        />
                        {!field.state.meta.isValid && field.state.meta.isDirty ? (
                            <FormError>
                                {field.state.meta.errors.map((error) => error?.message).join(', ')}
                            </FormError>
                        ) : (
                            <FormHint>This nickname will be visible to others</FormHint>
                        )}
                    </FormField>
                )}
            />
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

export default CreateAccountForm;
