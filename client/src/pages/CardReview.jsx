import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RATING_META = [
  { label: "0", desc: "Blank", className: "bad" },
  { label: "1", desc: "Wrong", className: "bad" },
  { label: "2", desc: "Hard", className: "ok" },
  { label: "3", desc: "OK", className: "ok" },
  { label: "4", desc: "Good", className: "good" },
  { label: "5", desc: "Easy", className: "good" },
];

const CardReview = () => {
  const [dueCards, setDueCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(true);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cardGet = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          `http://localhost:5000/api/decks/${deckId}/cards`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = result.data.data;
        const dateString = new Date().toISOString().split("T")[0];
        const due = data.filter((card) => card.next_review_date <= dateString);
        setDueCards(due);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    cardGet();
  }, []);

  const show = dueCards[currentIndex];

  const handleFlip = () => setFlip(!flip);

  const handleRating = async (value) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:5000/api/cards/${show.card_id}/review`,
        { rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.log(err);
    }
    setCurrentIndex(currentIndex + 1);
    setFlip(false);
  };

  if (loading) {
    return (
      <div className="review-wrapper">
        <p style={{ fontStyle: "italic", color: "var(--ink-light)" }}>Loading cards…</p>
      </div>
    );
  }

  if (dueCards.length === 0) {
    return (
      <div className="review-wrapper">
        <div className="no-cards-due">
          <h2>All caught up.</h2>
          <p>No cards are due for review today.</p>
          <button
            className="btn-primary"
            style={{ marginTop: "1.5rem" }}
            onClick={() => navigate(`/deck/${deckId}`)}
          >
            ← Back to Deck
          </button>
        </div>
      </div>
    );
  }

  if (currentIndex >= dueCards.length) {
    return (
      <div className="review-wrapper">
        <div className="session-complete">
          <h2>Session complete.</h2>
          <p>You reviewed {dueCards.length} card{dueCards.length !== 1 ? "s" : ""} today.</p>
          <button
            className="btn-primary"
            onClick={() => navigate(`/deck/${deckId}`)}
          >
            ← Back to Deck
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-wrapper">
      <p className="review-progress">
        {currentIndex + 1} / {dueCards.length}
      </p>

      <div className="flip-scene" onClick={!flip ? handleFlip : undefined}>
        <div className={`flip-card ${flip ? "flipped" : ""}`}>
          {/* Front */}
          <div className="flip-face">
            <span className="flip-label">Question</span>
            <p className="flip-text">{show.front_text}</p>
            <span className="flip-hint">click to flip</span>
          </div>
          {/* Back */}
          <div className="flip-face flip-face-back">
            <span className="flip-label flip-label-back">Answer</span>
            <p className="flip-text">{show.back_text}</p>
          </div>
        </div>
      </div>

      {flip && (
        <div className="rating-section">
          <p className="rating-label">How well did you know this?</p>
          <div className="rating-buttons">
            {RATING_META.map(({ label, className }, i) => (
              <button
                key={i}
                className={`rating-btn ${className}`}
                onClick={() => handleRating(i)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="rating-descriptions">
            {RATING_META.map(({ desc }, i) => (
              <span key={i} className="rating-desc">{desc}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardReview;