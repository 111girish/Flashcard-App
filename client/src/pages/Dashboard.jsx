import { useState } from "react";
import axios from 'axios';

const Dashboard = () => {

  const [decks, setDecks] = useState('');

  const token = localStorage.getItem("token");
  const result = axios.get("http://localhost:5000/api/decks/", {
    headers: {Authorization: `Bearer ${token}`}
  });
  const data = result.data.decks;

  
  return(
    <>
      <ul>
        <li>data</li>
      </ul>
    </>
  ); 

}

export default Dashboard;
