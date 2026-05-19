import { Pool } from "pg";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { first_name, last_name, password, username, email, phone_no } = req.body;

  if (!first_name || !last_name || !password || !username || !email) {
    res.send(`Something is missing man`);
  }

  const saltRounds = 12;
  //hashes the fucking password using bcrypt;
  const hashed = await bcrypt.hash(password, saltRounds);
  console.log(hashed);
  console.log(compare);


  
};
