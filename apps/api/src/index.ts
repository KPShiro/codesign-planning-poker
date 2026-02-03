import express from 'express';
import http from 'http';
import cors from 'cors';
import { initSocket } from './socket.js';
import roomRoutes from '@routes/room.routes.js';

const app = express();
const httpServer = http.createServer(app);

const PORT: number = 3000;

const corsOptions: cors.CorsOptions = {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/rooms', roomRoutes);

initSocket(httpServer, corsOptions);

httpServer.listen(PORT, '192.168.0.91', () => {
    console.log(`Server running on port ${PORT}`);
});
