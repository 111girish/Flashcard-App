import pool from "../db.js";

export const cardCreate = async (req, res) => {
  const userId = req.user.userId;
  const deckId = req.params.id;

  const { front_text, back_text } = req.body;
  if (!front_text || !back_text)
    return res.status(400).json({ message: "Text are missing!!" });

  const text =
    "INSERT INTO cards(front_text, back_text, deck_id) VALUES ($1, $2, $3) RETURNING *";
  const values = [front_text, back_text, deckId];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows;
    res.status(200).json({ message: "The card is created", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There seems to be a error!!" });
  } finally {
    client.release();
  }
};

export const cardGet = async (req, res) => {
  const userId = req.user.userId;
  const deckId = req.params.id;

  const text = "SELECT * FROM cards WHERE deck_id = $1";
  const values = [deckId];

  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows;
    res.status(200).json({ message: "Cards in the deck is recieved", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There seems to be a error!!" });
  } finally {
    client.release();
  }
};

export const cardDelete = async (req, res) => {
  const userId =  req.user.userId;
  const cardId = req.params.id;

  const text = 'DELETE FROM cards WHERE card_id = $1 AND deck_id IN (SELECT deck_id FROM decks WHERE user_id = $2) ';
  const values = [cardId, userId];
  
  const client = await pool.connect();
  try {
    const result = await client.query(text, values);
    const data = result.rows;
    res.status(200).json({ message: "Cards in the deck is deleted", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There seems to be a error!!" });
  } finally {
    client.release();
  }
}
