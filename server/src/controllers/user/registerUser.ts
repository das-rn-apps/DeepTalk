import { Request, Response } from 'express';
import User from '../../models/User';

const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists.' });
            return;
        }

        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export default registerUser;
