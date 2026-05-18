import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from '@codesign-planning-poker/shared';
import { registerRoomHandlers } from '@handlers/room.handler.js';
import cors from 'cors';
import type { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

export type IOServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export type IOSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

let io: IOServer;

export const initSocket = (httpServer: HttpServer, cors?: cors.CorsOptions) => {
    io = new Server(httpServer, { cors });

    io.use((socket, next) => {
        const { deviceId, userName, userColor } = socket.handshake.auth;

        if (!deviceId || !userName) {
            return next(new Error('User data is missing!'));
        }

        socket.data.deviceId = deviceId;
        socket.data.userName = userName;
        socket.data.userColor = userColor;
        socket.join(deviceId);

        next();
    });

    io.on('connection', (socket) => {
        registerRoomHandlers(io, socket);
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};
