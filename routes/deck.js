import express from 'express';
import { deckCreate, deckRecieve, deleteDeck } from '../controllers/deck.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post('/',authentication, deckCreate);
router.get('/', authentication, deckRecieve);
router.delete('/:id/', authentication, deleteDeck);

export default router;


