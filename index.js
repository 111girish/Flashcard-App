import express from 'express';
import bodyParser from 'body-parser';
import getEnv from './config.js';
import pool from './db.js';

import apiRoutes from './routes/api.js';

const app = express();
const PORT = getEnv('port');

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

(async () => {
  const client = await pool.connect()
  try {
    const result = await client.query('select * from user_info')
    console.log('hello from', result.rows[0])
  } finally {
    client.release()
  }
})().catch((e) => console.error(e.message, e.stack))

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE!'));





