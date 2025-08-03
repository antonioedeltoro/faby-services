// client/src/pages/Admin/Login.jsx
import "../../styles/Admin.css";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { API } from "../../api/baseURL";          // ← centralised base URL

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");                                  // clear previous error
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",                   // ensure cookies flow, if used
      });

      if (!res.ok) {
        /* Backend returns 401 for bad credentials; propagate a user‑friendly
           message instead of the generic “Invalid credentials”. */
        if (res.status === 401) {
          throw new Error("Incorrect email or password.");
        }
        throw new Error(`Login failed (${res.status})`);
      }

      const { token } = await res.json();
      login(token);                               // save token in auth context
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

      <div className="admin-card">
        <h1 className="admin-page-title">Admin&nbsp;Login</h1>

        <div className="card">
          <form onSubmit={handleSubmit} className="admin-form-wrapper">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {error && <p className="admin-form-error">{error}</p>}

            <button type="submit" className="button">
              Log&nbsp;In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
