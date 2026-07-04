// client/src/pages/News/NewsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";
import { useLang } from "../../context/LanguageContext";
import "../../styles/News.css";

export default function NewsList() {
  const { t } = useLang();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ─────────────── fetch once ─────────────── */
  useEffect(() => {
    api
      .get("/news")
      .then((res) => {
        setNewsItems(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNewsItems([]);
      })
      .finally(() => setLoading(false));
  }, []);                                        // API is constant - no deps

  const isEmpty = !loading && newsItems.length === 0;

  /* ─────────────── render ─────────────── */
  return (
    <div className={`news-page ${isEmpty ? "news-page--compact" : ""}`}>
      <div className="news-container">
        <h1 className="heading-xl">{t("news.title")}</h1>

        {loading ? (
          <p>{t("news.loading")}</p>
        ) : isEmpty ? (
          <p>{t("news.empty")}</p>
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
              <Link
                to={`/news/${item.slug || item._id}`}
                className="read-more"
              >
                {t("news.readMore")} →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
