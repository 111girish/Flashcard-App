import { useState, useEffect } from "react";
import axios from "axios";

const DashBoard = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try{
        const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:5000/api/decks/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDecks(result.data.decks);
      } catch(err) {
        console.log(err);
      }
    };
    fetchDecks();
  }, []);

  return (
    <> 
    <h1>Dashboard</h1>
    {!decks.length && <p>No decks made</p> }
    {decks.length>0 && <ul>
        {decks.map((deck) => (
          <li key={deck.deck_id}>{deck.subject}</li>
        ))}
      </ul>}
    </>
  );
};
export default DashBoard;
