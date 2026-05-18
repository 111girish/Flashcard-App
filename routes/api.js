import express from 'express';
import { login } from '../controllers/api.js';

const router = express.Router();

router.get('/health', (req,res) => {
  res.send({ status: "OK" });
})

router.post('/login', login);


export default router;