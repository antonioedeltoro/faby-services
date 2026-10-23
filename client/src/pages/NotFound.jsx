import { Link } from "react-router-dom";
import "../styles/NotFound.css";
import Seo from "../components/Seo";
import { useLang } from "../context/LanguageContext";

// Catch-all page for URLs that don't match any route. The static host returns
// index.html (HTTP 200) for every path, so we mark it noindex to keep typo or
// stale URLs out of search results.
export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="page-container not-found-page">
      <Seo title={t("notFound.meta.title")} noindex />

      <section className="not-found-section">
        <div className="section-content">
          <p className="not-found-code" aria-hidden="true">404</p>
          <h1 className="heading-xl blue">{t("notFound.heading")}</h1>
          <p className="paragraph">{t("notFound.message")}</p>
          <Link to="/" className="button">
            {t("notFound.homeLink")}
          </Link>
        </div>
      </section>
    </div>
  );
}
