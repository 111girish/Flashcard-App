import pool from "../db.js";

export const deckCreate = async (req, res) => {
  const userId = req.user.userId;
  const {subject} = req.body;

  if (!subject) return res.status(400).json({message: "The subject is empty!!"});

  const text = 'INSERT INTO decks(subject, user_id) VALUES ($1, $2) RETURNING * ;';
  const values = [subject, userId];
  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows[0];
    const userSubject = data.subject;    
    res.status(200).json({message: "The deck is created", userSubject});
  } 
  catch(error){
    console.error(error);
    res.status(500).json({message: "There seems to be a error!!"});
  }
  finally{
    client.release();
  }
}