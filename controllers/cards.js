import mongoose from 'mongoose';
import escape from 'escape-html';
import Error from '../common/errors.js';
import Validator from '../common/validator.js';
import Card from '../models/card.js';

const error = Error();
const { checkImgURL } = Validator();

const handlerError = (res, err, next) => {
  if (err instanceof mongoose.Error.CastError) {
    next(error.BadRequest('Некорректный ID карточки'));
  } else {
    next(err);
  }
};

function handlerResult(res, card) {
  if (!card) {
    throw error.NotFound('Данной карточки не существует');
  } else {
    res.status(200).send(card);
  }
}

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => handlerResult(res, cards))
    .catch((err) => handlerError(res, err, next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if ( !checkImgURL(link) ) throw error.BadRequest('Не корректно указана ссылка')

  const newCard = {
    name: escape(name),
    link: link,
    owner,
  };
  Card
    .create(newCard)
    .then((card) => handlerResult(res, card))
    .catch((err) => handlerError(res, err, next));
};

const deleteCard = (req, res, next) => {
  const idUser = req.user._id;

  // если тесты не прокатят то вернуть error.Unauthorized('Недостаточно прав');
  Card.findOneAndDelete({ _id: req.params.id, owner: idUser})
    .orFail(() => error.NotFound('Карточка не найдена или недостаточно прав'))
    .then(() => {
        Card
          .find({ owner: idUser })
          .populate(['owner', 'likes'])
          .then((data) => handlerResult(res, data))
    })
    .catch((err) => handlerError(res, err, next));
};

const setLikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => error.NotFound('Карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => handlerResult(res, card))
    .catch((err) => handlerError(res, err, next));
};

const unsetLikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => error.NotFound('Карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => handlerResult(res, card))
    .catch((err) => handlerError(res, err, next));
};

export {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
};
