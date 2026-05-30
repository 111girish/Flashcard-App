import pool from "../db.js";
import sm2 from "../utils/sm2.js";

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
  const userId = req.user.userId;
  const cardId = req.params.id;

  const text =
    "DELETE FROM cards WHERE card_id = $1 AND deck_id IN (SELECT deck_id FROM decks WHERE user_id = $2) ";
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
};

export const cardReview = async (req, res) => {
  const userId = req.user.userId;
  const cardId = req.params.id;

  const rating = Number(req.body.rating);

  if (
    rating === undefined ||
    rating === null ||
    Number(rating) < 0 ||
    Number(rating) > 5
  )
    return res.status(400).json({ message: "Rating must be between 0 and 5" });

  const client = await pool.connect();
  try {
    const text1 = "SELECT * FROM cards WHERE card_id = $1";
    const value1 = [cardId];

    const result1 = await client.query(text1, value1);
    const data1 = result1.rows[0];
    const ease_factor = Number(data1.ease_factor);
    const interval = Number(data1.interval);
    const repetitions = Number(data1.repetitions);

    const final = sm2(rating, repetitions, ease_factor, interval);

    const {
      repetitions: newRepetitions,
      easyFactor,
      interval: newInterval,
    } = final;
    const newReviewdate = new Date();
    newReviewdate.setDate(newReviewdate.getDate() + newInterval);

    const text2 =
      "UPDATE cards SET repetitions = $1, interval = $2, next_review_date = $3, ease_factor = $4 WHERE card_id = $5 RETURNING * ;";
    const value2 = [
      newRepetitions,
      newInterval,
      newReviewdate,
      easyFactor,
      cardId,
    ];

    const result2 = await client.query(text2, value2);
    const data2 = result2.rows[0];
    res.status(200).json({ message: "The table is updated!", data2 });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "There is no card of that id" });
  } finally {
    client.release();
  }
};
