import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/News.css';

export default function NewsDashboard() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = () => {
    axios
      .get('/api/news')
      .then((res) => {
        setNewsItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load news:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      await axios.delete(`/api/news/${id}`);
      setNewsItems(newsItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">News Dashboard</h1>
        <div className="dashboard-actions">
          <Link to="/admin/news/new" className="button">
            + Create New
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : newsItems.length === 0 ? (
          <p>No news posts found.</p>
        ) : (
          <table className="news-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/news/edit/${item._id}`} className="table-button">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(item._id)} className="table-button danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
