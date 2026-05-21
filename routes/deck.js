import express from 'express';
import { deckCreate } from '../controllers/deck.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post('/deck-create',authentication, deckCreate);

export default router;


