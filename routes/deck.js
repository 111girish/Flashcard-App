import express from 'express';
import { deckCreate, deckRecieve } from '../controllers/deck.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post('/',authentication, deckCreate);
router.get('/', authentication, deckRecieve);

export default router;


