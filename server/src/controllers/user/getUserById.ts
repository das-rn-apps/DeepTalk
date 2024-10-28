import { Request, Response } from 'express';
import User from '../../models/User';

const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Attempt to find the user by ID and check if is_deleted is false
        const user = await User.findOne({ _id: id, is_delete: false });

        // If the user is not found or is marked as deleted, return a 404 status
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Return the found user with a 200 status
        res.status(200).json(user);
    } catch (error) {
        // Log the error for debugging
        console.error('Error fetching user:', error);

        // Return a 500 status with an error message
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export default getUserById;
