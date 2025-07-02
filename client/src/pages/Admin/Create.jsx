import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/News.css';

export default function CreateNews() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError('Both title and body are required.');
      return;
    }

    try {
      await axios.post('/api/news', { title, body });
      navigate('/admin/news');
    } catch (err) {
      console.error('Error creating news:', err);
      setError('Failed to create news post.');
    }
  };

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">Create News Post</h1>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="news-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Body
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              required
            ></textarea>
          </label>
          <div className="form-buttons">
            <button type="submit" className="button">Publish</button>
            <button type="button" className="button button--outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
