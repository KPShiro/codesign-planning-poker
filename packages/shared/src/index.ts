import { CardSetId } from './cards.js';
import { EmojiId } from './emoji.js';

export * from './cards.js';
export * from './emoji.js';

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
    emojiId: EmojiId;
    users: User[];
    cardSetId: CardSetId;
    status: RoomStatus;
};

// -----------------------------------------

export type ServerToClientEvents = {
    'room:created': (_rooms: Room[]) => void;
    'room:deleted': (_rooms: Room[]) => void;
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
    userName: User['name'];
    userColor: User['color'];
    roomId: Room['id'];
};
