// src/pages/Admin/Edit.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/News.css';
import api from '../../api/axios'; // Secure Axios instance

export default function EditNews() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/news/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load news:', err);
        setError('Failed to load post.');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError('Both title and body are required.');
      return;
    }

    try {
      await api.put(`/news/${id}`, { title, body });
      navigate('/admin/news');
    } catch (err) {
      console.error('Failed to update post:', err);
      setError('Failed to update post.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">Edit News Post</h1>
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
            <button type="submit" className="button">Update</button>
            <button type="button" className="button button--outline" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
