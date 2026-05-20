import bcrypt from "bcrypt";
import pool from "../db.js";

export const register = async (req, res) => {
  const { first_name, last_name, password, username, email, phone_no } = req.body;

  if (!first_name || !last_name || !password || !username || !email) {
    res.send(`Something is missing man`);
    return;
  }

  const saltRounds = 12;
  //hashes the fucking password using bcrypt;
  const hashed = await bcrypt.hash(password, saltRounds);

  const text = `INSERT INTO users(first_name, last_name, password, username, email, phone_no) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [first_name, last_name, hashed, username, email, phone_no];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    console.log("Data saved:", result.rows[0]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Error executing query.");
    res.status(500).json({message: "User registration failed"})
  } finally {
    client.release();
  }
};

export const login =  (req, res) => {
  
}