import express from 'express';
import { register } from '../controllers/api.js';
import authentication from '../middleware/authentication.js';
import deckRoutes from '../controllers/deck.js'

const router = express.Router();

router.get('/decks' ,authentication, deckRoutes)

export default router;