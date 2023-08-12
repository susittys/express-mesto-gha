import { Router } from 'express';
import {
  getUsers, getUserByID, getUserMe, updateProfile, updateAvatar,
} from '../controllers/users.js';

const router = Router();

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:id', getUserByID);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
