import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../styles/News.css';

export default function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/news/${id}`)
      .then((res) => {
        setNewsItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="news-loading">Loading...</p>;
  if (notFound) return <p className="news-error">News item not found.</p>;

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">{newsItem.title}</h1>
        <p className="news-meta">
          Published on {new Date(newsItem.createdAt).toLocaleDateString()}
        </p>
        <div className="news-body-full">
          <p>{newsItem.body}</p>
        </div>
        <Link to="/news" className="back-link">
          ← Back to News
        </Link>
      </div>
    </div>
  );
}
