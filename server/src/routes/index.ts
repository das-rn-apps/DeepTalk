import { Router } from 'express';
import chatRoutes from '../controllers/chat';
import userRoutes from '../controllers/user';

const router = Router();

router.use('/chats', chatRoutes);
router.use('/users', userRoutes);

export default router;
