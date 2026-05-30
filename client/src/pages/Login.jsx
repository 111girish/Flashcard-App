import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
      );
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back.</h1>
        <p className="auth-subtitle">Sign in to continue studying</p>
        {error && (
          <p
            style={{
              color: "var(--danger)",
              marginBottom: "1rem",
              fontSize: "0.95rem",
            }}
          >
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
          <button className="btn-primary" type="submit">
            Sign In
          </button>
        </form>
        <p className="auth-link">
          No account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
