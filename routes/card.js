import express from'express';
import authentication from '../middleware/authentication.js';
import { cardDelete } from '../controllers/card.js';
const router = express.Router();

router.delete('/:id/', authentication, cardDelete);

export default router;
