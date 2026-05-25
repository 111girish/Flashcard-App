import express from 'express';
import { deckCreate, deckRecieve, deleteDeck } from '../controllers/deck.js';
import authentication from '../middleware/authentication.js';
import { cardCreate, cardGet } from '../controllers/card.js';

const router = express.Router();

router.post('/',authentication, deckCreate);
router.get('/', authentication, deckRecieve);
router.delete('/:id/', authentication, deleteDeck);
router.post('/:id/cards', authentication, cardCreate );
router.get('/:id/cards/', authentication, cardGet);

export default router;


