import type { ClientToServerEvents, ServerToClientEvents } from '@codesign-planning-poker/shared';
import { io, Socket } from 'socket.io-client';

type IOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const socket: IOSocket = io(import.meta.env.VITE_BACKEND_URL, {
    autoConnect: false,
});
