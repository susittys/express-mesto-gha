import { Router } from 'express';
import {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
} from '../controllers/cards.js';
import Validator from '../common/validator.js';

const router = Router();
const { createCardValidator } = Validator();

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', deleteCard);

router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', unsetLikeCard);

export default router;
