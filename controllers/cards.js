import sendErrorMessage from '../common/errors.js';
import sendSuccessMessage from '../common/success.js';
import Card from '../models/card.js';

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => sendSuccessMessage({ res, data: cards }))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  const newCard = { name, link, owner };
  Card.create(newCard)
    .then((card) => sendSuccessMessage({ res, data: card, successName: 'added' }))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const deleteCard = (req, res) => {
  const idOwner = req.user._id;

  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) sendErrorMessage({ res, errorName: 'notFound' });
      if (card.owner.toString() === idOwner) {
        Card.find({ owner: idOwner })
          .populate(['owner', 'likes'])
          .then((cards) => sendSuccessMessage({ res, data: cards }));
      } else sendErrorMessage({ res, errorName: 'notOwner' });
    })
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const setLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => (card
      ? sendSuccessMessage({ res, data: card })
      : sendErrorMessage({ res, errorName: 'notFound' })))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

const unsetLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => ((card)
      ? sendSuccessMessage({ res, data: card })
      : sendErrorMessage({ res, errorName: 'notFound' })))
    .catch((err) => sendErrorMessage({ res, errorName: err.name }));
};

export {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
};
