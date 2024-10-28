import { Router } from 'express';
import { createChat, getAllChats } from './chatController';
import { sendMessage, getMessages } from './messageController';

const router = Router();

// Chat routes
router.post('/addChat', createChat);             // Create a new chat
router.get('/getChat/:userId', getAllChats);     // Get all chats for a user

// Message routes
router.post('/sendMsg', sendMessage);          // Send a new message
router.get('/getMsg/:chatId', getMessages);   // Get messages for a specific chat

export default router;
