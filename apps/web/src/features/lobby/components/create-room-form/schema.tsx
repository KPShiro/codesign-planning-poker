import { type CardSetId, type EmojiId } from '@codesign-planning-poker/shared';
import z from 'zod';

export const createRoomFormSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(16, 'Name cannot be longer than 16 characters'),
    emojiId: z.custom<EmojiId>(),
    cardSetId: z.custom<CardSetId>(),
});

export type CreateRoomFormOutput = z.output<typeof createRoomFormSchema>;
export type CreateRoomFormInput = z.input<typeof createRoomFormSchema>;
