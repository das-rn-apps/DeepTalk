import { Request, Response } from 'express';
import Message from '../../models/Message';
import Chat from '../../models/Chat';

const sendMessage = async (req: Request, res: Response): Promise<void> => {
    const { sender, chat, content, attachments, type } = req.body;

    try {
        const newMessage = new Message({ sender, chat, content, attachments, type });
        await newMessage.save();

        await Chat.findByIdAndUpdate(chat, {
            lastMessage: content,
            lastMessageTime: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message', error });
    }
};

const getMessages = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params; // Assuming chatId is passed in the URL

    try {
        const messages = await Message.find({ chat: chatId }).populate('sender');
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

export { sendMessage, getMessages };
