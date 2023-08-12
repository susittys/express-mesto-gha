import { Router } from 'express';
import {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
} from '../controllers/cards.js';
import Validator from '../common/validator.js';

const router = Router();
const { createCardValidator, checkId } = Validator();

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', checkId, deleteCard);

router.put('/:cardId/likes', checkId, setLikeCard);
router.delete('/:cardId/likes', checkId, unsetLikeCard);

export default router;
