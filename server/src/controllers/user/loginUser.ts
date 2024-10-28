import { Request, Response } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Check if the user exists with the provided email
        const user = await User.findOne({ email, is_delete: false });
        if (!user) {
            res.status(400).json({ message: 'Account not found' });
            return;
        }

        // Compare the provided password directly with the stored password
        if (password !== user.password) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ userInfo: user }, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });

        // Send a response with the token and user information
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export default loginUser;
