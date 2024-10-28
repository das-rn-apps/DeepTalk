import { Request, Response } from 'express';
import User from '../../models/User';

const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        // Define possible updates and include password only if it's provided
        const updates: { username?: string; email?: string; password?: string } = { username, email };

        // Include password in the updates only if provided
        if (password) {
            updates.password = password; // No hashing
        }

        // Find user by ID and apply updates, returning the updated user document
        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        // If the user is not found, return a 404 status with a message
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Return the updated user with a 200 status
        res.status(200).json(user);
    } catch (error) {
        // Log the error for debugging
        console.error('Error updating user:', error);

        // Return a 500 status with an error message
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export default updateUser;
