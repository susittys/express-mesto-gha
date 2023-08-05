const { handleErrors, sendErrorMessage } = require('../common/errors');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
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

  const newCard = { name, link, owner };
  Card.create(newCard)
    .then((card) => res.status(200).send(card))
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
              .then((cards) => res.status(200).send(cards));
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
    .then((card) => card
      ? res.status(200).send(card)
      : sendErrorMessage({
        res,
        ...handleErrors('notFound'),
      })
    )
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
    .then((card) => card
      ? res.status(200).send(card)
      : sendErrorMessage({
        res,
        ...handleErrors('notFound'),
      })
    )
    .catch((err) => sendErrorMessage({
      res,
      ...handleErrors(err.name),
    }));
};
