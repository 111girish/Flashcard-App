import express from'express';
import authentication from '../middleware/authentication.js';
import { cardDelete, cardReview } from '../controllers/card.js';
const router = express.Router();

router.delete('/:id/', authentication, cardDelete);
router.get('/:id/review/', authentication, cardReview);

export default router;
