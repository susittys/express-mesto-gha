const { handleErrors, sendErrorMessage } = require('../common/errors');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link || !owner) {
    sendErrorMessage({
      res,
      ...handleErrors('empty'),
    });

    return;
  }

  const card = { name, link, owner };
  Card.create(card)
    .then((card) => res.status(200).send({ card }))
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.deleteCard = (req, res) => {
  const idOwner = req.user._id;

  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        sendErrorMessage({
          res,
          ...handleErrors('notFound'),
        });

        return;
      }

      if (card.owner.toString() === idOwner) {
        Card.findByIdAndRemove(req.params.id)
          .then(() => {
            Card.find({ owner: idOwner })
              .populate(['owner', 'likes'])
              .then((data) => res.status(200).send({ cards: data }));
          });
      } else {
        sendErrorMessage({
          res,
          ...handleErrors('notOwner'),
        });
      }
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.setLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        sendErrorMessage({
          res,
          ...handleErrors('empty'),
        });
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};

module.exports.unsetLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        sendErrorMessage({
          res,
          ...handleErrors('empty'),
        });
      } else {
        res.status(200).send({ card });
      }
    })
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};
