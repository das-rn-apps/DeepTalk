import { Router } from 'express';
import getAllUsers from './getAllUsers';
import getOnlyUsers from './getOnlyUsers';
import registerUser from './registerUser';
import loginUser from './loginUser';
import getUserById from './getUserById';
import updateUser from './updateUser';
import deleteUser from './deleteUser';

const router = Router();

// User routes
router.get('/', getAllUsers);                // Get all users
router.get('/onlyNew/:id', getOnlyUsers);     // Get all users except chat one
router.get('/:id', getUserById);             // Get a user by ID
router.post('/register', registerUser);      // Register a new user
router.post('/login', loginUser);            // Login a user
router.put('/:id', updateUser);              // Update a user
router.delete('/:id', deleteUser);           // Delete a user

export default router;
