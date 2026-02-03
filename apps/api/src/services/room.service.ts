import type { Room, User } from '@codesign-planning-poker/shared';
import { randomUUID } from 'crypto';

let ROOMS: Room[] = [
    {
        id: 'test-room-1',
        name: 'Test Room 1',
        users: [],
        status: 'voting',
    },
];

export const RoomService = {
    createRoom: (name: string): Room => {
        const newRoom: Room = {
            id: randomUUID(),
            name: name,
            users: [],
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
