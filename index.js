import express from 'express';
import bodyParser from 'body-parser';
import getEnv from './config.js';

import apiRoutes from './routes/api.js';




const app = express();
const PORT = getEnv('port');

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE!'));





