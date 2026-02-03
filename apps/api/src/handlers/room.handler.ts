import type { User } from '@codesign-planning-poker/shared';
import { RoomService } from '@services/room.service.js';
import type { IOServer, IOSocket } from 'src/socket.js';

export const registerRoomHandlers = (io: IOServer, socket: IOSocket) => {
    socket.on('room:join', (roomId) => {
        const newUser: User = {
            id: socket.data.userId,
            name: socket.data.userName,
        };

        const existingUser = RoomService.getUserById(roomId, socket.data.userId);
        const room = RoomService.getRoomById(roomId);

        if (existingUser && room) {
            socket.emit('room:updated', room);
            return;
        }

        const updatedRoom = RoomService.addUser(roomId, newUser);

        if (updatedRoom) {
            socket.data.roomId = roomId;
            io.to(roomId).emit('room:user-joined', newUser.name);
            socket.join(roomId);
            io.to(roomId).emit('room:updated', updatedRoom);
        }
    });

    socket.on('disconnect', () => {
        const roomId = socket.data.roomId;
        if (!roomId) return;

        const updatedRoom = RoomService.removeUser(roomId, socket.data.userId);

        if (updatedRoom) {
            socket.leave(roomId);
            io.to(roomId).emit('room:user-left', socket.data.userName);
            io.to(roomId).emit('room:updated', updatedRoom);
        }
    });
};
