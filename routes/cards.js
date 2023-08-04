const router = require('express').Router();
const {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', unsetLikeCard);

module.exports = router;
