export type User = {
    id: string;
    name: string;
    vote?: string;
};

export type Room = {
    id: string;
    name: string;
    users: User[];
    status: 'voting' | 'reveal';
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
