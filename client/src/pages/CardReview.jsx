import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CardReview = () => {
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const [dueCards, setDueCards] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  useEffect(() => {
    const cardGet = async () => {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `http://localhost:5000/api/decks/${deckId}/cards`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const data = result.data.data;
      setCards(data);
      const current = new Date();
      const dateString = current.toISOString().split("T")[0];
      // for (let i = 0; i < cards.length; i++) {
      //   if (cards[i].next_review_date <= dateString) {
      //     console.log(cards.front_text);
      //   }
      // }
      const due = data.filter((card) => card.next_review_date <= dateString);
      setDueCards(due);
    };
    cardGet();
  }, []);

  let show = dueCards[currentIndex];

  const handleFlip = () => {
    setFlip(!flip);
  };

  const handleRating = async (e) => {
    const { value } = e.target;
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/api/cards/:${dueCards.card_id}/review`,
      { value },
      {
        header: { Authorization: `Bearer ${token}` },
      },
    );
    currentIndex++;
    setFlip(false);
  };

  return (
    <>
      <h3>This is where we review the fucking card</h3>
      {!dueCards.length && <p>There are no cards in this deck</p>}
      {dueCards.length > 0 && currentIndex < dueCards.length && !flip && (
        <p>
          {show.front_text} <button onClick={handleFlip}>Flip</button>
        </p>
      )}
      {dueCards.length > 0 && currentIndex < dueCards.length && flip && (
        <div>
          <p>
            {show.back_text} <button onClick={handleFlip}>Flip</button>
          </p>
          <div>
            <button onClick={handleRating} value={0}>
              0
            </button>
            <button onClick={handleRating} value={1}>
              1
            </button>
            <button onClick={handleRating} value={2}>
              2
            </button>
            <button onClick={handleRating} value={3}>
              3
            </button>
            <button onClick={handleRating} value={4}>
              4
            </button>
            <button onClick={handleRating} value={5}>
              5
            </button>
          </div>
        </div>
      )}
      {dueCards.length > 0 && currentIndex >= dueCards.length && (
        <p>Session complete!</p>
      )}
    </>
  );
};

export default CardReview;
