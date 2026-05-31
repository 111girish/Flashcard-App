import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    phone_no: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "var(--bg)",
    }}>
      <div style={{
        background: "var(--card-bg)",
        border: "2px solid var(--border)",
        borderRadius: "2px",
        padding: "3rem 3.5rem",
        width: "100%",
        maxWidth: "520px",
        boxShadow: "6px 6px 0px var(--border), 12px 12px 0px var(--shadow)",
        position: "relative",
      }}>
        {/* Left margin line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "2.5rem",
          width: "2px",
          height: "100%",
          background: "rgba(184, 92, 42, 0.2)",
        }} />

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "0.25rem",
        }}>
          Begin.
        </h1>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "1rem",
          color: "var(--ink-light)",
          fontStyle: "italic",
          marginBottom: "2rem",
        }}>
          Create your account to start learning
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            className="form-input"
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={handleChange}
            required
          />
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
            type="tel"
            name="phone_no"
            placeholder="Phone number (optional)"
            onChange={handleChange}
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            className="btn-primary"
            type="submit"
            style={{ marginTop: "0.5rem" }}
          >
            Create Account
          </button>
        </form>

        <p style={{
          textAlign: "center",
          marginTop: "1.5rem",
          fontFamily: "'Crimson Text', serif",
          fontSize: "0.95rem",
          color: "var(--ink-light)",
        }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;