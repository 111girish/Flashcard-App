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
    res.status(200).json({message: "The deck is created", decks: data});
  } 
  catch(error){
    console.error(error);
    res.status(500).json({message: "There seems to be a error!!"});
  }
  finally{
    client.release();
  }
}

export const deckRecieve = async (req, res) => {
  const userId = req.user.userId;
  
  if (!userId) return res.status(401).json({message: "The user is missing twinn!"});

  const client = await pool.connect();
  const text ='SELECT * FROM decks WHERE user_id = $1';
  const value = [userId];

  try{
    const result = await client.query(text, value);
    const data = result.rows;
    res.status(200).json({message: "The deck is recieved!!", decks: data});
  }catch(error){
    res.status(500).json({message: "Failed to retrieve decks!"});
  }finally{
    client.release();
  }
}

export const deleteDeck = async (req, res) => {
  const userId = req.user.userId;
  const deckId = req.params.id;
  if (!userId) return res.status(401).json({message: "The user is missing man!!"});
  
  const client = await pool.connect();
  const text ='DELETE FROM decks WHERE user_id = $1 AND deck_id = $2 RETURNING *;';
  const value = [userId, deckId];

  try{
    const result = await client.query(text, value);
    const data = result.rows;
    res.status(200).json({message: `The deck with id ${deckId} is deleted`});
  }catch(error){
    res.status(500).json({message: "Failed to delete deck"});
  }finally{
    client.release();
  }
}




