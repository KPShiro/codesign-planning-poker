import type { Request, Response } from 'express';
import { RoomService } from '@services/room.service.js';
import { getIO } from 'src/socket.js';

export const createRoom = (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newRoom = RoomService.createRoom(name);

        res.status(201).json(newRoom);

        getIO().emit('room:created', newRoom);
    } catch {
        res.status(500).json({ message: 'Error creating room' });
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
