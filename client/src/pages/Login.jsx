import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Illustration = () => (
  <svg viewBox="0 0 420 500" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "380px" }}>
    {/* Stack of cards */}
    <rect x="60" y="180" width="220" height="140" rx="4" fill="#C4A35A" opacity="0.4" transform="rotate(-8 60 180)" />
    <rect x="70" y="175" width="220" height="140" rx="4" fill="#DFC882" opacity="0.6" transform="rotate(-4 70 175)" />
    <rect x="80" y="170" width="220" height="140" rx="4" fill="#FFFDF5" stroke="#C4A35A" strokeWidth="1.5" />

    {/* Card content - front card */}
    <text x="100" y="210" fontFamily="Georgia, serif" fontSize="11" fill="#C4A35A" letterSpacing="2" opacity="0.8">QUESTION</text>
    <line x1="100" y1="218" x2="280" y2="218" stroke="#DFC882" strokeWidth="1" />
    <text x="100" y="245" fontFamily="Georgia, serif" fontSize="16" fontWeight="600" fill="#1C1209">What is a closure?</text>
    <text x="100" y="268" fontFamily="Georgia, serif" fontSize="11" fill="#4A3728" opacity="0.7">A function that retains</text>
    <text x="100" y="283" fontFamily="Georgia, serif" fontSize="11" fill="#4A3728" opacity="0.7">access to its outer scope.</text>

    {/* Rating dots */}
    <circle cx="100" cy="302" r="8" fill="#8B2E2E" opacity="0.8" />
    <circle cx="122" cy="302" r="8" fill="#8B2E2E" opacity="0.6" />
    <circle cx="144" cy="302" r="8" fill="#B8860B" opacity="0.7" />
    <circle cx="166" cy="302" r="8" fill="#B8860B" opacity="0.7" />
    <circle cx="188" cy="302" r="8" fill="#4A7C59" opacity="0.8" />
    <circle cx="210" cy="302" r="8" fill="#4A7C59" opacity="0.9" />

    {/* Floating mini cards */}
    <rect x="260" y="120" width="100" height="65" rx="3" fill="#FFFDF5" stroke="#C4A35A" strokeWidth="1" opacity="0.9" transform="rotate(12 260 120)" />
    <text x="268" y="148" fontFamily="Georgia, serif" fontSize="9" fill="#4A3728" transform="rotate(12 260 120)">Photosynthesis</text>
    <text x="268" y="162" fontFamily="Georgia, serif" fontSize="8" fill="#C4A35A" transform="rotate(12 260 120)">Biology · Due today</text>

    <rect x="30" y="100" width="90" height="58" rx="3" fill="#FFFDF5" stroke="#DFC882" strokeWidth="1" opacity="0.8" transform="rotate(-15 30 100)" />
    <text x="38" y="126" fontFamily="Georgia, serif" fontSize="9" fill="#4A3728" transform="rotate(-15 30 100)">mitosis</text>
    <text x="38" y="140" fontFamily="Georgia, serif" fontSize="8" fill="#C4A35A" transform="rotate(-15 30 100)">Cell division</text>

    {/* Progress arc */}
    <circle cx="340" cy="380" r="38" fill="none" stroke="#DFC882" strokeWidth="3" />
    <circle cx="340" cy="380" r="38" fill="none" stroke="#B85C2A" strokeWidth="3"
      strokeDasharray="167 240"
      strokeDashoffset="60"
      strokeLinecap="round"
      transform="rotate(-90 340 380)" />
    <text x="340" y="375" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontWeight="600" fill="#1C1209">70%</text>
    <text x="340" y="390" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="#4A3728">retention</text>

    {/* Decorative dots */}
    <circle cx="50" cy="380" r="4" fill="#C4A35A" opacity="0.5" />
    <circle cx="65" cy="395" r="2.5" fill="#C4A35A" opacity="0.35" />
    <circle cx="80" cy="375" r="3" fill="#B85C2A" opacity="0.3" />
    <circle cx="360" cy="150" r="5" fill="#C4A35A" opacity="0.4" />
    <circle cx="375" cy="170" r="3" fill="#B85C2A" opacity="0.3" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, loginData);
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "var(--bg)",
    }}>
      {/* Left panel */}
      <div style={{
        background: "var(--bg-dark)",
        borderRight: "2px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem 3.5rem",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(196,163,90,0.2) 27px, rgba(196,163,90,0.2) 28px)",
      }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.4rem",
            fontWeight: 700,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
          }}>
            Remember<br />everything.
          </h1>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "1.1rem",
            color: "var(--ink-light)",
            fontStyle: "italic",
          }}>
            Study smarter with spaced repetition.
          </p>
        </div>

        <Illustration />

        <div style={{ marginTop: "2rem" }}>
          {[
            ["📚", "Organize cards into decks by subject"],
            ["🧠", "SM-2 algorithm schedules your reviews"],
            ["📈", "Review only what you're about to forget"],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
              marginBottom: "0.85rem",
            }}>
              <span style={{ fontSize: "1rem", marginTop: "1px" }}>{icon}</span>
              <p style={{
                fontFamily: "'Crimson Text', serif",
                fontSize: "1rem",
                color: "var(--ink-light)",
                lineHeight: 1.5,
              }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 3rem",
      }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: "0.25rem",
          }}>
            Welcome back.
          </h2>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "1rem",
            color: "var(--ink-light)",
            fontStyle: "italic",
            marginBottom: "2rem",
          }}>
            Sign in to continue studying
          </p>

          {error && (
            <p style={{
              color: "var(--danger)",
              background: "rgba(139,46,46,0.08)",
              border: "1px solid rgba(139,46,46,0.2)",
              padding: "0.6rem 0.9rem",
              borderRadius: "2px",
              marginBottom: "1.25rem",
              fontSize: "0.95rem",
              fontFamily: "'Crimson Text', serif",
            }}>
              {error}
            </p>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button className="btn-primary" type="submit" style={{ marginTop: "0.5rem" }}>
              Sign In →
            </button>
          </form>

          <p style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontFamily: "'Crimson Text', serif",
            fontSize: "0.95rem",
            color: "var(--ink-light)",
          }}>
            No account yet?{" "}
            <Link to="/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;