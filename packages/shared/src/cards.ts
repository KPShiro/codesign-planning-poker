export type Card = {
    value: number;
    label: string;
};

export type CardSetId = 'fibonacci' | 't-shirt-sizes';

export type CardSet = {
    id: CardSetId;
    name: string;
    cards: Card[];
};

export const CardSets: Record<CardSetId, CardSet> = {
    fibonacci: {
        id: 'fibonacci',
        name: 'Fibonacci',
        cards: [
            { value: 0, label: '0' },
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 5, label: '5' },
            { value: 8, label: '8' },
        ],
    },
    't-shirt-sizes': {
        id: 't-shirt-sizes',
        name: 'T-Shirt Sizes',
        cards: [
            { value: 1, label: 'XS' },
            { value: 2, label: 'S' },
            { value: 3, label: 'M' },
            { value: 4, label: 'L' },
        ],
    },
};
