import { Server, Socket } from 'socket.io';

export const chatSocketHandler = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        socket.on('joinRoom', (room: string) => {
            socket.join(room);
            console.log(`Client joined room: ${room}`);
        });

        socket.on('chatMessage', (messageData) => {
            const { room, message, sender } = messageData;
            io.to(room).emit('message', { message, sender });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
