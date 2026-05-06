import type { CardSet, Room, User } from '@codesign-planning-poker/shared';
import { randomUUID } from 'crypto';

let ROOMS: Room[] = [
    {
        id: 'eclipse',
        icon: '🌙',
        name: 'Eclipse',
        users: [],
        cardSetId: 'fibonacci',
        status: 'voting',
    },
    {
        id: 'nova',
        icon: '🌟',
        name: 'Nova',
        users: [],
        cardSetId: 't-shirt-sizes',
        status: 'voting',
    },
];

export const RoomService = {
    createRoom: (name: string, icon: string, cardSetId: CardSet['id']): Room => {
        const newRoom: Room = {
            id: randomUUID(),
            name: name,
            icon: icon,
            users: [],
            cardSetId: cardSetId,
            status: 'voting',
        };

        ROOMS = [...ROOMS, newRoom];

        return newRoom;
    },
    deleteRoom: (roomId: Room['id']): Room[] => {
        ROOMS = ROOMS.filter((r) => r.id !== roomId);

        return ROOMS;
    },
    getAllRooms: (): Room[] => {
        return ROOMS;
    },
    getRoomById: (roomId: Room['id']): Room | null => {
        return ROOMS.find((r) => r.id === roomId) ?? null;
    },
    getUserById: (roomId: Room['id'], userId: User['id']): User | null => {
        const room = ROOMS.find((r) => r.id === roomId);
        if (!room) return null;

        const user = room.users.find((u) => u.id === userId);
        if (!user) return null;

        return user;
    },
    addUser: (roomId: Room['id'], user: User): Room | null => {
        const room = ROOMS.find((r) => r.id === roomId);
        if (!room) return null;

        if (!room.users.find((u) => u.id === user.id)) {
            room.users.push(user);
        }

        return room;
    },
    removeUser: (roomId: Room['id'], userId: User['id']): Room | null => {
        const room = ROOMS.find((r) => r.id === roomId);
        if (!room) return null;

        room.users = room.users.filter((u) => u.id !== userId);

        return room;
    },
};
