import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const [text, setText] = useState({ front_text: "", back_text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const cardGet = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCards(result.data.data);
      } catch (err) {
        console.log(err);
      }
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
        `${import.meta.env.VITE_API_URL}/api/decks/${deckId}/cards`,
        { front_text, back_text, deckId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = result.data.data[0];
      setCards([...cards, data]);
      setText({ front_text: "", back_text: "" });
    };
    cardPost();
  };

  const handleDelete = async (cardId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCards(cards.filter((card) => card.card_id !== cardId));
  };


  return (
    <div className="page-wrapper">
      <Link className="back-link" to="/dashboard">
        ← Back to Decks
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Cards</h1>
          <p className="page-subtitle">{cards.length} card{cards.length !== 1 ? "s" : ""} in this deck</p>
        </div>
        {cards.length > 0 && (
          <button
            className="start-review-btn"
            onClick={() => navigate(`/deck/${deckId}/review`)}
          >
            Start Review →
          </button>
        )}
      </div>

      {cards.length === 0 ? (
        <div className="empty-state" style={{ marginBottom: "2rem" }}>
          <p>No cards yet. Add your first card below.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {cards.map((card) => (
            <div className="card-item" key={card.card_id}>
              <button
                className="btn-danger card-item-delete"
                onClick={() => handleDelete(card.card_id)}
              >
                ✕
              </button>
              <p className="card-item-front">{card.front_text}</p>
              <div className="card-divider" />
              <p className="card-item-back">{card.back_text}</p>
              <p style={{
                fontSize: "0.75rem",
                color: "var(--border)",
                marginTop: "0.75rem",
                fontStyle: "italic"
              }}>
                Next review: {new Date(card.next_review_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="add-card-form">
        <h3>Add a Card</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              className="form-input"
              placeholder="Front — the question"
              onChange={handleChange}
              name="front_text"
              value={text.front_text}
              required
            />
            <input
              className="form-input"
              placeholder="Back — the answer"
              onChange={handleChange}
              name="back_text"
              value={text.back_text}
              required
            />
          </div>
          <button className="btn-secondary" type="submit">
            + Add Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;