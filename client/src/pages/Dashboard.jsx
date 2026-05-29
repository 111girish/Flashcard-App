import { useState, useEffect } from "react";
import axios from "axios";

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
    setSubject('');
    const createDeck = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://localhost:5000/api/decks",
        { subject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = result.data.decks;
      setDecks([...decks, data]);
    };
    createDeck();
  };

  return (
    <>
      <h1>Dashboard</h1>
      {!decks.length && <p>No decks made</p>}
      {decks.length > 0 && (
        <ul>
          {decks.map((deck) => (
            <li key={deck.deck_id}>{deck.subject}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Eg. Human Anatomy"
          value = {subject}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </>
  );
};
export default DashBoard;
