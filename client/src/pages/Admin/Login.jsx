import "../../styles/Admin.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const { token } = await res.json();
      login(token);
      navigate("/admin/news");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Admin Login | Faby Services</title>
      </Helmet>

      {/* ----- centered wrapper, NOT a card ----- */}
      <div className="admin-card">
        <h1 className="admin-page-title">Admin Login</h1>

        {/* single white card that holds the form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="admin-form-wrapper">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="admin-form-error">{error}</p>}

            <button type="submit" className="button">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
