import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [decks, setDecks] = useState([]);
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/decks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDecks(result.data.decks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    const createDeck = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/decks`,
        { subject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = result.data.deck;
      setDecks([...decks, data]);
      setSubject("");
    };
    createDeck();
  };

  const handleDelete = async (deckId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/decks/${deckId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDecks(decks.filter((deck) => deck.deck_id !== deckId));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Decks</h1>
          <p className="page-subtitle">Your study collections</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1.5px solid var(--border)",
            padding: "0.4rem 1rem",
            fontFamily: "Crimson Text, serif",
            fontSize: "0.95rem",
            cursor: "pointer",
            color: "var(--ink-light)",
            borderRadius: "2px",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "var(--ink)"; e.target.style.color = "var(--bg)"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--ink-light)"; }}
        >
          Sign out
        </button>
      </div>

      {decks.length === 0 ? (
        <div className="empty-state">
          <p>No decks yet. Create your first one below.</p>
        </div>
      ) : (
        <table className="deck-table">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Subject</th>
              <th style={{ width: "20%" }}>Cards</th>
              <th style={{ width: "20%", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decks.map((deck) => (
              <tr key={deck.deck_id}>
                <td>
                  <Link className="deck-link" to={`/deck/${deck.deck_id}`}>
                    {deck.subject}
                  </Link>
                </td>
                <td style={{ color: "var(--ink-light)", fontStyle: "italic" }}>
                  {deck.card_count}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(deck.deck_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="New deck name, e.g. Human Anatomy"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button className="btn-secondary" type="submit">
          + Add Deck
        </button>
      </form>
    </div>
  );
};

export default Dashboard;