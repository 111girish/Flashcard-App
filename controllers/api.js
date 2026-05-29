import bcrypt from "bcrypt";
import pool from "../db.js";
import getEnv from "../config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { first_name, last_name, password, username, email, phone_no } =
    req.body;

  if (!first_name || !last_name || !password || !username || !email) {
    res.send(`Something is missing man`);
    return;
  }

  const saltRounds = 12;
  //hashes the fucking password using bcrypt;
  const hashed = await bcrypt.hash(password, saltRounds);

  const text = `INSERT INTO users(first_name, last_name, password, username, email, phone_no) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [first_name, last_name, hashed, username, email, phone_no];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    console.log("Data saved:", result.rows[0]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    if (err.code = 23505){
      res.status(409).json({message: "The username and email already exists!!"});
    } else{
    res.status(500).json({ message: "User registration failed" });
    }
  } finally {
    client.release();
  }
};

export const login = async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email || !password) {
    res.send(`Something is missing man`);
    return;
  }
  const accessToken = getEnv("accessToken");

  const text = "SELECT * FROM users WHERE username = $1;";
  const values = [username];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const user = result.rows[0];
    console.log("Found user: ", user);

    if (!user) return res.status(401).json({message: "I have no idea who the fuck that is..."});

    const dataUser = user.username;
    const dataEmail = user.email;
    const dataPassword = user.password;
    const userId = user.user_id;

    const compare = await bcrypt.compare(password, dataPassword);

    if (!(dataUser === username && compare && dataEmail === email)) {
      res.status(401).json({ message: "Yo! Who the fuck is you?" });
      return;
    } 

    const payload = {
      username: username,
      userId: userId
    };
    const secret = `${accessToken}`;
    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({message:"Whasssup twinn", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  } finally {
    client.release();
  }
};
