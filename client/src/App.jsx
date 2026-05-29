import Login from "./pages/login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Card from "./pages/Card"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deck/:deckId" element={<Card />} />
      </Routes>
    </>
  );
}

export default App;
