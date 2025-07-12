import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/News.css";

export default function NewsList() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    axios
      .get(`${API}/api/news`)
      .then((res) => {
        setNewsItems(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNewsItems([]);
        setLoading(false);
      });
  }, [API]);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="heading-xl">Latest News</h1>

        {loading ? (
          <p>Loading ...</p>
        ) : newsItems.length === 0 ? (
          <p>No news available.</p>
        ) : (
          newsItems.map((item) => (
            <div className="news-card card" key={item._id}>
              <h2>{item.title}</h2>
              <p className="news-meta">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="news-body">
                {item.content?.length > 200
                  ? `${item.content.slice(0, 200)} …`
                  : item.content}
              </p>
              <Link to={`/news/${item.slug || item._id}`} className="read-more">
                Read more →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
