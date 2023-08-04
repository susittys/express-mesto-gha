const { handleErrors, sendErrorMessage } = require('../common/errors');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.getUserByID = (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    sendErrorMessage({
      res,
      ...handleErrors('empty'),
    });

    return;
  }

  User.findById(userID)
    .then((user) => {
      if (!user) {
        sendErrorMessage({
          res,
          ...handleErrors('notFound'),
        });
      } else res.status(200).send({ user });
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const { _id } = req.user;

  const newUser = {
    name, about, avatar, _id,
  };
  User.create(newUser)
    .then((user) => res.status(200).send({ user }))
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const idUser = req.user._id;

  if (!name || !about || !idUser) {
    sendErrorMessage({
      res,
      ...handleErrors('notFound'),
    });

    return;
  }

  User.findByIdAndUpdate(
    idUser,
    { name, about },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        sendErrorMessage({
          res,
          ...handleErrors('notFound'),
        });
      } else res.status(200).send({ user });
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const idUser = req.user._id;

  if (!avatar || !idUser) {
    sendErrorMessage({
      res,
      ...handleErrors('empty'),
    });

    return;
  }

  User.findByIdAndUpdate(
    idUser,
    { avatar },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        sendErrorMessage({
          res,
          ...handleErrors('notFound'),
        });
      } else res.status(200).send({ user });
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};
