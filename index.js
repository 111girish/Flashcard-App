import express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './routes/api.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE!'));





