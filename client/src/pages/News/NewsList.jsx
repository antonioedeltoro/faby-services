// client/src/pages/News/NewsList.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/News.css";
import "../../styles/Typography.css";

export default function NewsList() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/news")
      .then((res) => {
        setNewsItems(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNewsItems([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="heading-xl">Latest News</h1>

        {loading ? (
          <p>Loading...</p>
        ) : newsItems.length === 0 ? (
          <p>No news available.</p>
        ) : (
          newsItems.map((item) => (
            <div className="news-card" key={item._id}>
              <h2 className="heading-md">{item.title}</h2>
              <p className="news-meta">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Date unknown"}
              </p>
              <p className="news-body">
                {item.body.length > 200
                  ? item.body.substring(0, 200) + "..."
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
