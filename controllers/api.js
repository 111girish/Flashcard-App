import { Pool } from "pg";
import bcrypt from "bcrypt";
export const register = (req, res) => {
  const { first_name, last_name, password, username, email, phone_no } =
    req.body;
  const saltRounds = 12;
  //hashes the fucking password using bcrypt;
  let hashedPass;
  async function generate_hash() {
    await bcrypt.hash(password, saltRounds, (err, hashedPass) => {
      // if (err) throw err;
      console.log(hashedPass);
      // res.send(`The fucking hashed passwords are: ${hashedPass}`)
    });
  }

  const otherPass = "Some other fucking plain stuff";

  async function compare_hash() {
    await bcrypt.compare(otherPass, hashedPass, (err, result) => {
      // if (err) throw err;
      console.log(result);
      res.send(`${result}`);
      // res.send(`The fucking passwords ${hashedPass} and some bullshit don't match`);
    });
  }

  if (!first_name || !last_name || !password || !username || !email) {
    res.send(`Something is missing man`);
  }
};
