import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../api/client";
import { useLang } from "../../context/LanguageContext";
import "../../styles/News.css";
import "../../styles/buttons.css";

export default function NewsDetail() {
  const { t } = useLang();
  const { slug: slugOrId } = useParams();

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ─────────────── fetch once ───────────────
  useEffect(() => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(slugOrId);

    api
      .get(isMongoId ? `/news/${slugOrId}` : `/news/slug/${slugOrId}`)
      .then((res) => setNewsItem(res.data))
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slugOrId]);

  // ─────────────── render ───────────────
  if (loading) return <p>{t("news.loading")}</p>;
  if (notFound || !newsItem) return <p>{t("news.notFound")}</p>;

  return (
    <div className="news-page">
      <div className="news-container">
        <div className="card">
          <h1 className="heading-xl">{newsItem.title}</h1>
          <p className="news-meta">
            {t("news.publishedOn")}{" "}
            {new Date(newsItem.createdAt).toLocaleDateString()}
          </p>

          {/* Render HTML content with embedded button */}
          <div
            className="news-body-full"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          ></div>

          <Link to="/news" className="back-link">
            ← {t("news.backToNews")}
          </Link>
        </div>
      </div>
    </div>
  );
}
