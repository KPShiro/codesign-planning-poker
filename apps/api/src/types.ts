import type { Room, User } from '@codesign-planning-poker/shared';

export type GameStateStore = {
    getAll: () => Room[];
    getOneById: (roomId: string) => Room | null;
    createOne: (roomName: string) => Room;
    getPlayer: (roomId: string, playerId: string) => User;
    addPlayer: (roomId: string, playerId: string, playerName: string) => Room | null;
    removePlayer: (roomId: string, playerId: string) => Room | null;
};
