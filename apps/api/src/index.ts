import roomRoutes from '@routes/room.routes.js';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { initSocket } from './socket.js';

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

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
