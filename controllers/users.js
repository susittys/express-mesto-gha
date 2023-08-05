import sendErrorMessage from '../common/errors.js';
import sendSuccessMessage from '../common/success.js';
import User from '../models/user.js';

const getUsers = (req, res) => {
  User.find({})
    .then((users) => sendSuccessMessage({ res, data: users }))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const getUserByID = (req, res) => {
  const idUser = req.params.id;

  User.findById(idUser)
    .then((user) => {
      if (!user) {
        sendErrorMessage({ res, errorName: 'notFound' });
      } else sendSuccessMessage({ res, data: user });
    })
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const createUser = (req, res) => {
  User.create(
    {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    },
  )
    .then((user) => sendSuccessMessage({ res, data: user, successName: 'added' }))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const idUser = req.user._id;

  User.findByIdAndUpdate(
    idUser,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        sendErrorMessage({ res, errorName: 'empty' });
      } else sendSuccessMessage({ res, data: user });
    })
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const idUser = req.user._id;

  User.findByIdAndUpdate(
    idUser,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        sendErrorMessage({ res, errorName: 'notFound' });
      } else sendSuccessMessage({ res, data: user });
    })
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

export {
  getUsers, updateProfile, getUserByID, createUser, updateAvatar,
};
