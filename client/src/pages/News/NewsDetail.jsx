// client/src/pages/News/NewsDetail.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { API } from "../../api/baseURL";         // ← unified base URL
import "../../styles/News.css";

export default function NewsDetail() {
  const { slug: slugOrId } = useParams();

  const [newsItem, setNewsItem] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* ─────────────── fetch once ─────────────── */
  useEffect(() => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slugOrId);

    axios
      .get(
        isMongoId
          ? `${API}/api/news/${slugOrId}`
          : `${API}/api/news/slug/${slugOrId}`
      )
      .then((res) => setNewsItem(res.data))
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slugOrId]);                                // API is constant – omit from deps

  /* ─────────────── render ─────────────── */
  if (loading)               return <p>Loading …</p>;
  if (notFound || !newsItem) return <p>News item not found.</p>;

  return (
    <div className="news-page">
      <div className="news-container">
        <div className="card">
          <h1 className="heading-xl">{newsItem.title}</h1>
          <p className="news-meta">
            Published on{" "}
            {new Date(newsItem.createdAt).toLocaleDateString()}
          </p>

          <div className="news-body-full">
            <p>{newsItem.content}</p>
          </div>

          <Link to="/news" className="back-link">
            ← Back to News
          </Link>
        </div>
      </div>
    </div>
  );
}
