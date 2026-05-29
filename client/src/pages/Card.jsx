import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const [text, setText] = useState({ front_text: "", back_text: "" });
  const { front_text, back_text } = text;


  useEffect(() => {
    const cardGet = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://localhost:5000/api/decks/${deckId}/cards`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = result.data.data;
      setCards(data);
    };
    cardGet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardPost = async () => {
      const { front_text, back_text } = text;
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `http://localhost:5000/api/decks/${deckId}/cards`,
        { front_text, back_text, deckId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = result.data.data[0];
      setCards([...cards, data]);
      setText({front_text: "", back_text: ""})
    };
    cardPost();
  };

  const handleDelete = async (cardId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });    
    setCards(cards.filter((card) => card.card_id !== cardId));
  };

  return (
    <>
      <h1>This is a fucking Card</h1>
      {!cards.length && <h3>There are no cards here!!</h3>}
      {cards.length > 0 && (
        <ul>
          {cards.map((card) => (
            <li key={card.card_id}>
              {card.front_text} === {card.back_text}
              <button
                onClick={() => {
                  handleDelete(card.card_id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Front text"
          onChange={handleChange}
          name="front_text"
          value={front_text}
        />
        <input
          placeholder="Back text"
          onChange={handleChange}
          name="back_text"
          value={back_text}
        />
        <input type="submit" />
      </form>
      <button><Link to={`/deck/${deckId}/review`}>Start Review</Link></button>
    </>
  );
};

export default Card;
