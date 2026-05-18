import { Emojis, type EmojiId } from '@codesign-planning-poker/shared';

export function useEmoji() {
    const emojis = [...Emojis].sort((a, b) => (a.id > b.id ? 1 : -1));

    const getEmojiById = (id: EmojiId) => {
        const emoji = emojis.find((emoji) => emoji.id === id);

        if (!emoji) {
            return {
                id: 'white-question-mark',
                symbol: '❔',
                disabled: false,
            };
        }

        return emoji;
    };

    return {
        emojis,
        getEmojiById,
    };
}
