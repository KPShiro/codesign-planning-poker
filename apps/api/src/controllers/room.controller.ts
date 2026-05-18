import { RoomService } from '@services/room.service.js';
import type { Request, Response } from 'express';
import { getIO } from 'src/socket.js';

export const createRoom = (req: Request, res: Response) => {
    try {
        const { name, emojiId, cardSetId } = req.body;
        const rooms = RoomService.createRoom(name, emojiId, cardSetId);

        res.status(201).json(rooms);

        getIO().emit('room:created', rooms);
    } catch {
        res.status(500).json({ message: 'Error creating room' });
    }
};

export const deleteRoom = (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const rooms = RoomService.deleteRoom(id);

        res.status(201).json(rooms);

        getIO().emit('room:deleted', rooms);
    } catch {
        res.status(500).json({ message: 'Error deleting room' });
    }
};

export const getRooms = (req: Request, res: Response) => {
    const rooms = RoomService.getAllRooms();
    res.json(rooms);
};

export const getRoomById = (req: Request, res: Response) => {
    const roomId = req.params.id;

    if (!roomId) {
        return res.status(400);
    }

    const room = RoomService.getRoomById(roomId);

    if (!room) {
        return res.status(404);
    }

    res.json(room);
};
