import express from 'express';
import { register } from '../controllers/api.js';

const router = express.Router();

router.get('/health', (req,res) => {
  res.send({ status: "OK" });
})

router.post('/register', register);


export default router;