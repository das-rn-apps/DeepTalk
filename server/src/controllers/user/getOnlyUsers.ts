import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../../models/User';

const getOnlyUsers = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const userId = new Types.ObjectId(id);

        const users = await User.find({
            _id: { $ne: userId },
            is_delete: false
        });

        if (users.length === 0) {
            res.status(404).json({ message: 'No other users found' });
            return;
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export default getOnlyUsers;
