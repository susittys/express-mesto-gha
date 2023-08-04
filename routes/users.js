const router = require('express').Router();
const {
  getUsers, getUserByID, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);

router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
