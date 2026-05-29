import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = () => {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();

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

  return (
    <>
      <h1>This is a fucking Card</h1>
      {!cards.length && <h3>There are no cards here!!</h3>}
      {cards.length>0 && (<ul>
        {cards.map((card) => {
          <li key={card.card_id}>{card.front_text} === {card.back_text}</li>
        })}
      </ul>)}
    </>
  );
};

export default Card;
