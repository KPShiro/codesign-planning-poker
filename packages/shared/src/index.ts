export type Card = {
    value: number;
    label: string;
};

export type CardSet = {
    id: string;
    name: string;
    cards: Card[];
};

export const CardSets: Record<string, CardSet> = {
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

// -----------------------------------------

export type User = {
    id: string;
    name: string;
    color: string;
    vote?: string;
};

export type RoomStatus = 'voting' | 'votes_revealed';

export type Room = {
    id: string;
    name: string;
    icon: string;
    users: User[];
    cardSetId: CardSet['id'];
    status: RoomStatus;
};

// -----------------------------------------

export type ServerToClientEvents = {
    'room:created': (_room: Room) => void;
    'room:updated': (_room: Room) => void;
    'room:user-pinged': () => void;
    'room:user-left': (_userName: User['name']) => void;
    'room:user-joined': (_userName: User['name']) => void;
};

export type ClientToServerEvents = {
    'room:join': (_roomId: Room['id']) => void;
    'room:ping-user': (_deviceId: User['id']) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type InterServerEvents = {};

export type SocketData = {
    deviceId: User['id'];
    username: User['name'];
    roomId: Room['id'];
};
