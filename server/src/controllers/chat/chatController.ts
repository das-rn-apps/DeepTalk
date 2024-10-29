import { Request, Response } from 'express';
import Chat from '../../models/Chat';

const createChat = async (req: Request, res: Response): Promise<void> => {
    const { participants, roomName, isGroup } = req.body;
    try {
        const newChat = new Chat({ participants, roomName, isGroup });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Error creating chat', error });
    }
};

const getAllChats = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params; // Assuming userId is passed in the URL

    try {
        const chats = await Chat.find({ participants: userId }).populate('participants');
        res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Error fetching chats', error });
    }
};

const getRoomForTwoPerson = async (req: Request, res: Response): Promise<void> => {
    const { selected, local } = req.query;

    try {
        const room = await Chat.findOne({
            participants: { $all: [selected, local] },
            isGroup: false,
        });

        if (!room) {
            res.status(404).json({ message: 'Chat room not found' });
            return;
        }
        res.status(200).json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ message: 'Error fetching room', error });
    }
};

const getChat = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;

    try {
        const chat = await Chat.findOne({ _id: chatId }).populate('participants');
        res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ message: 'Error fetching chat', error });
    }
};


export { createChat, getAllChats, getRoomForTwoPerson, getChat };
