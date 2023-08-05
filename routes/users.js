import { Router } from 'express';
import {
  getUsers, getUserByID, createUser, updateProfile, updateAvatar,
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
