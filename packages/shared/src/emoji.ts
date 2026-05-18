export const Emojis = [
    {
        id: 'moon-eclipse',
        symbol: '🌔',
        disabled: false,
    },
    {
        id: 'star-falling',
        symbol: '🌠',
        disabled: false,
    },
    {
        id: 'star',
        symbol: '⭐',
        disabled: false,
    },
    {
        id: 'rocket',
        symbol: '🚀',
        disabled: false,
    },
    {
        id: 'pizza',
        symbol: '🍕',
        disabled: false,
    },
    {
        id: 'fire',
        symbol: '🔥',
        disabled: false,
    },
    {
        id: 'light-bulb',
        symbol: '💡',
        disabled: false,
    },
    {
        id: 'heart',
        symbol: '❤️',
        disabled: false,
    },
    {
        id: 'poop',
        symbol: '💩',
        disabled: false,
    },
    {
        id: 'heart-on-fire',
        symbol: '❤️‍🔥',
        disabled: false,
    },
    {
        id: 'road-work',
        symbol: '🚧',
        disabled: false,
    },
    {
        id: 'palette',
        symbol: '🎨',
        disabled: false,
    },
    {
        id: 'pumpkin',
        symbol: '🎃',
        disabled: false,
    },
    {
        id: 'plane',
        symbol: '✈️',
        disabled: false,
    },
    {
        id: 'sun-with-cloud',
        symbol: '🌤️',
        disabled: false,
    },
    {
        id: 'sun',
        symbol: '☀️',
        disabled: false,
    },
    {
        id: 'radioactive',
        symbol: '☢️',
        disabled: false,
    },
    {
        id: 'game-pad',
        symbol: '🎮',
        disabled: false,
    },
    {
        id: 'bagel',
        symbol: '🥐',
        disabled: false,
    },
    {
        id: 'crown',
        symbol: '👑',
        disabled: false,
    },
    {
        id: 'trophy',
        symbol: '🏆',
        disabled: false,
    },
    {
        id: 'shield',
        symbol: '🛡️',
        disabled: false,
    },
] as const;

export type EmojiId = (typeof Emojis)[number]['id'];
