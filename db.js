import { Pool } from 'pg';
import getEnv from './config.js';

const params = getEnv('dbConnect');

const pool = new Pool({
  connectionString: getEnv('dbConnect'),
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times 
})

export default pool;

//Trying to make a fucking schema table to hold multiple data currently. I think this will take more time than I fucking thought. So just to make my profile green for now, I will commit this



