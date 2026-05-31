import express from 'express';
import getEnv from './config.js';
import pool from './db.js';
import cors from "cors";

import apiRoutes from './routes/api.js';
import authRoutes from './routes/auth.js';
import deckRoutes from './routes/deck.js';
import cardRoutes from './routes/card.js';

const app = express();
const PORT = getEnv('port');

app.use(cors({
  origin: 'https://flashcard-app-2qsp.onrender.com',
  credentials: true
}));

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/cards', cardRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE!'));

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

(async () => {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT NOW()')
    console.log('hello from', result.rows[0])
  } finally {
    client.release()
  }

})().catch((e) => console.error(e.message, e.stack))
