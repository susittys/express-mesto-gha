import { Router } from 'express';
import {
  getCards, createCard, deleteCard, setLikeCard, unsetLikeCard,
} from '../controllers/cards.js';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);

router.put('/:cardId/likes', setLikeCard);
router.delete('/:cardId/likes', unsetLikeCard);

export default router;
