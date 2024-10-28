import { Request, Response } from 'express';
import User from '../../models/User';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ is_delete: false });
        // console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};


export default getAllUsers;