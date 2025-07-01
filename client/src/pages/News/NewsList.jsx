import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/News.css';
import { Link } from 'react-router-dom';

export default function NewsList() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      // Option 1: Use hardcoded backend URL if proxy is not configured
      // .get('http://localhost:5000/api/news')

      // Option 2: Use relative path (proxy must be configured in vite.config.js)
      .get('/api/news')
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setNewsItems(data);
        } else {
          console.error('Expected array, got:', data);
          setNewsItems([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setNewsItems([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="news-title">Latest News</h1>
        {loading ? (
          <p>Loading...</p>
        ) : newsItems.length === 0 ? (
          <p>No news available.</p>
        ) : (
          newsItems.map((item) => (
            <div className="news-card" key={item._id}>
              <h2>{item.title}</h2>
              <p className="news-meta">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="news-body">
                {item.body.length > 200
                  ? `${item.body.substring(0, 200)}...`
                  : item.body}
              </p>
              <Link to={`/news/${item._id}`} className="read-more">
                Read more →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
