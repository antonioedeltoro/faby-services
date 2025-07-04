import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/AdminFormWrapper.css';
import '../../styles/Typography.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();                          // ✅ context setter

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        login(token);                                   // ✅ stored as authToken
        navigate('/admin/news');
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-form-wrapper">
      <Helmet>
        <title>Admin Login</title>
      </Helmet>

      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="admin-form-error">{error}</p>}

        <button type="submit" className="admin-form-submit">
          Log In
        </button>
      </form>
    </div>
  );
}
