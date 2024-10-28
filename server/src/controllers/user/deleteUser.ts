import { Request, Response } from 'express';
import User from '../../models/User';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Attempt to update the user by setting is_deleted to true
        const user = await User.findByIdAndUpdate(
            id,
            { is_delete: true },
            { new: true } // Return the updated user document
        );

        // If the user is not found, return a 404 status with a message
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Respond with a success message upon successful update
        res.status(200).json({ message: 'User marked as deleted successfully', user });
    } catch (error) {
        // Log the error for debugging
        console.error('Error marking user as deleted:', error);

        // Return a 500 status with an error message
        res.status(500).json({ message: 'Error marking user as deleted', error });
    }
};

export default deleteUser;
