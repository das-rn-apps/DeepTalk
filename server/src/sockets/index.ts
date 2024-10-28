import { Server } from 'socket.io';
import http from 'http';
import { chatSocketHandler } from './chatSocket';

export const setupSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: '*', // Adjust according to your frontend origin
            methods: ['GET', 'POST'],
        },
    });

    chatSocketHandler(io);
};
