import { Emojis, type EmojiId } from '@codesign-planning-poker/shared';

export function useEmoji() {
    const emojis = [...Emojis].sort((a, b) => (a.id > b.id ? 1 : -1));

    const getEmojiById = (id: EmojiId) => {
        return emojis.find((emoji) => emoji.id === id);
    };

    return {
        emojis,
        getEmojiById,
    };
}
