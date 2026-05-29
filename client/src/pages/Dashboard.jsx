import { useState, useEffect,  } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashBoard = () => {

  const [decks, setDecks] = useState([]);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:5000/api/decks/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDecks(result.data.decks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  const handleChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createDeck = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://localhost:5000/api/decks",
        { subject },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = result.data.decks;
      setDecks([...decks, data]);
      setSubject("");
    };
    createDeck();
  };

  const handleDelete = async (deckId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/decks/${deckId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDecks(decks.filter((deck) => deck.deck_id !== deckId));
  };

  return (
    <>
      <h1>Dashboard</h1>
      {!decks.length && <p>No decks made</p>}
      {decks.length > 0 && (
        <ul>
          {decks.map((deck) => (
            <li key={deck.deck_id} >
              <Link to={`/deck/${deck.deck_id}`}>{deck.subject}</Link>
              <button
                onClick={() => {
                  handleDelete(deck.deck_id);
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
          type="text"
          placeholder="Eg. Human Anatomy"
          value={subject}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
      
    </>
  );
};
export default DashBoard;
