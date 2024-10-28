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

export { createChat, getAllChats };
