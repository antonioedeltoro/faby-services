import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import '../../styles/News.css';

export default function NewsDetail() {
  /** 
   * The route is declared as  <Route path="/news/:slug" …>
   * but older links that use the Mongo _id (24‑char hex) still work.
   * We therefore read the param generically as `slugOrId`.
   */
  const { slug: slugOrId } = useParams();

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slugOrId);   // 24‑char hex = _id

    axios
      .get(
        isMongoId
          ? `${API}/api/news/${slugOrId}`        // legacy posts by _id
          : `${API}/api/news/slug/${slugOrId}`   // normal posts by slug
      )
      .then((res) => {
        setNewsItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [API, slugOrId]);

  if (loading) return <p className="news-loading">Loading...</p>;
  if (notFound || !newsItem) return <p className="news-error">News item not found.</p>;

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">{newsItem.title}</h1>

        <p className="news-meta">
          Published on{' '}
          {new Date(newsItem.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="news-body-full">
          <p>{newsItem.content}</p>
        </div>

        <Link to="/news" className="back-link">
          ← Back to News
        </Link>
      </div>
    </div>
  );
}
