import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { EVENTS, type PokerEvent } from '@codesign-planning-poker/shared';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on(EVENTS.TEST_PING, (data: PokerEvent) => {
        console.log('Received ping:', data);

        socket.emit(EVENTS.TEST_PONG, {
            message: 'Pong from Server!',
            timestamp: Date.now(),
        } as PokerEvent);
    });
});

server.listen(3000, () => {
    console.log('SERVER RUNNING on http://localhost:3000');
});
