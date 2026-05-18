import { CardSets, type CardSetId } from '@codesign-planning-poker/shared';
import { Button } from '@components/button';
import { EmojiSelector } from '@components/form/emoji-selector';
import { FormError } from '@components/form/form-error';
import { FormField } from '@components/form/form-field';
import { FormLabel } from '@components/form/form-label';
import { TextInput } from '@components/form/text-input';
import { useEmoji } from '@hooks/use-emoji';
import { useForm } from '@tanstack/react-form';
import { cn } from '@utils/cn';
import { type ComponentProps } from 'react';
import { RoomWidget } from '../rooms-list/room-widget';
import { createRoomFormSchema, type CreateRoomFormOutput } from './schema';

type CreateRoomFormProps = Pick<ComponentProps<'form'>, 'className'> & {
    onSubmit?: (value: CreateRoomFormOutput) => void | Promise<void>;
    isPending?: boolean;
};

export function CreateRoomForm({ onSubmit, isPending, ...props }: CreateRoomFormProps) {
    const { emojis, getEmojiById } = useEmoji();

    const form = useForm({
        defaultValues: {
            name: '',
            emojiId: emojis[0].id,
            cardSetId: CardSets['fibonacci'].id as CardSetId,
        },
        validators: {
            onChange: createRoomFormSchema,
        },
        onSubmit: async ({ value }) => {
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
            <div className="rounded-md border-2 border-dashed border-current/15 p-4">
                <form.Subscribe
                    selector={(state) => [state.values]}
                    children={([values]) => (
                        <RoomWidget
                            icon={getEmojiById(values.emojiId).symbol || emojis[0].id}
                            textPrimary={values.name || 'Example Room Name'}
                            textSecondary={CardSets[values.cardSetId]?.name}
                        />
                    )}
                />
            </div>
            <div className="bg-surface-1 flex flex-col gap-4 rounded-md p-6">
                <form.Field
                    name="emojiId"
                    children={(field) => (
                        <FormField>
                            <FormLabel htmlFor={field.name}>Icon</FormLabel>
                            <EmojiSelector
                                id={field.name}
                                value={field.state.value}
                                onValueChange={field.handleChange}
                                disabled={isPending}
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
                    name="name"
                    children={(field) => (
                        <FormField>
                            <FormLabel htmlFor={field.name}>Name</FormLabel>
                            <TextInput
                                id={field.name}
                                name={field.name}
                                placeholder="e.g. Quack Room"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onValueChange={field.handleChange}
                                disabled={isPending}
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
                            label="Create Room"
                            disabled={!canSubmit || isPristine || isPending}
                            onClick={form.handleSubmit}
                        />
                    )}
                />
                <form.Subscribe
                    selector={(state) => [state.isTouched]}
                    children={([isTouched]) => (
                        <Button
                            type="button"
                            variant="outlined"
                            size="md"
                            label="Reset"
                            disabled={!isTouched || isPending}
                            onClick={() => form.reset()}
                        />
                    )}
                />
            </div>
        </form>
    );
}
