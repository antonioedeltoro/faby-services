import "../styles/Reviews.css";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useRef, useState } from "react";
import { reviewsApi } from "../api/client";
import { useLang } from "../context/LanguageContext";

const USER_TOKEN_KEY = "reviews_user_token";
const INACTIVITY_MS = 15 * 60 * 1000; // 15 min
const PAGE_SIZE = 10;

export default function Reviews() {
  const { t } = useLang();

  /* ─────────── Auth state ─────────── */
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(USER_TOKEN_KEY) || "");
  const authed = !!token;

  /* inactivity timer */
  const timerRef = useRef(null);
  const startInactivityTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_MS);
  };
  const resetInactivityTimer = () => authed && startInactivityTimer();

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "touchstart"];
    if (authed) {
      startInactivityTimer();
      events.forEach((e) => window.addEventListener(e, resetInactivityTimer, { passive: true }));
    }
    return () => {
      clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetInactivityTimer));
    };
  }, [authed]);

  /* ─────────── Data ─────────── */
  const [publicReviews, setPublicReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  /* ─────────── Forms ─────────── */
  const emptyForm = { fullName: "", rating: "5", message: "" };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ email: "", password: "" });

  /* ─────────── Fetch reviews ─────────── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const publicReq = reviewsApi.get("/reviews/public");
        const mineReq = authed ? reviewsApi.get("/reviews/mine") : Promise.resolve({ data: [] });
        const [pubRes, meRes] = await Promise.all([publicReq, mineReq]);
        if (cancelled) return;
        setPublicReviews(pubRes.data || []);
        setMyReviews(meRes.data || []);
        setPage(1);
      } catch (err) {
        setError(err?.response?.data?.message || t("reviews.errors.load"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authed]);

  /* ─────────── Merge + paginate ─────────── */
  const mergedReviews = useMemo(() => {
    const map = new Map();
    (publicReviews || []).forEach((r) => map.set(r._id, r));
    (myReviews || []).forEach((r) => map.set(r._id, r));
    return Array.from(map.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [publicReviews, myReviews]);

  const pagedReviews = useMemo(() => mergedReviews.slice(0, page * PAGE_SIZE), [mergedReviews, page]);
  const hasMore = pagedReviews.length < mergedReviews.length;

  /* ─────────── Auth actions ─────────── */
  const handleAuthChange = (e) => setAuthForm({ ...authForm, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await reviewsApi.post("/user/auth/register", authForm);
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ email: "", password: "" });
      const meRes = await reviewsApi.get("/reviews/mine");
      setMyReviews(meRes.data || []);
    } catch (err) {
      setError(t("reviews.errors.register"));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await reviewsApi.post("/user/auth/login", authForm);
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ email: "", password: "" });
      const meRes = await reviewsApi.get("/reviews/mine");
      setMyReviews(meRes.data || []);
    } catch (err) {
      setError(t("reviews.errors.login"));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    setToken("");
    setUser(null);
    setMyReviews([]);
  };

  /* ─────────── CRUD ─────────── */
  const handleField = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleReset = () => setForm(emptyForm);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const payload = {
        rating: Number(form.rating),
        message: form.message.trim(),
        authorDisplayName: form.fullName.trim(),
      };
      const { data } = await reviewsApi.post("/reviews", payload);
      setMyReviews((prev) => [data, ...prev]);
      setForm(emptyForm);
      setPage(1);
    } catch {
      setError(t("reviews.errors.create"));
    }
  };

  const startEdit = (r) => {
    setEditingId(r._id);
    setForm({
      fullName: r.authorDisplayName || "",
      rating: String(r.rating),
      message: r.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        rating: Number(form.rating),
        message: form.message.trim(),
        authorDisplayName: form.fullName.trim(),
      };
      const { data } = await reviewsApi.put(`/reviews/${editingId}`, payload);
      setMyReviews((prev) => prev.map((r) => (r._id === editingId ? data : r)));
      setEditingId(null);
      setForm(emptyForm);
    } catch {
      setError(t("reviews.errors.update"));
    }
  };

  const handleDelete = async (id) => {
    try {
      await reviewsApi.delete(`/reviews/${id}`);
      setMyReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setError(t("reviews.errors.delete"));
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="page-container reviews-page">
      <Helmet>
        <title>{t("reviews.pageTitle")}</title>
      </Helmet>

      <section className="reviews-section">
        <div className="reviews-content">
          <h1 className="heading-xl blue">{t("reviews.heading")}</h1>
          <p className="paragraph">
            {t("reviews.intro")}
          </p>

          {error && <p className="paragraph error-text">{error}</p>}

          {/* Auth card */}
          {!authed && (
            <div className="card">
              <form className="review-form" onSubmit={authMode === "login" ? handleLogin : handleRegister}>
                <h2 className="heading-md auth-title">
                  {authMode === "login" ? t("reviews.login") : t("reviews.createAccount")}
                </h2>

                <label>
                  {t("reviews.email")}
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    required
                  />
                </label>
                <label>
                  {t("reviews.password")}
                  <input
                    type="password"
                    name="password"
                    value={authForm.password}
                    onChange={handleAuthChange}
                    required
                  />
                </label>

                <div className="review-buttons">
                  <button type="submit" className="button">
                    {authMode === "login" ? t("reviews.login") : t("reviews.createAccount")}
                  </button>
                </div>

                <p className="auth-switch">
                  {authMode === "login" ? (
                    <>
                      {t("reviews.noAccountPrompt")}{" "}
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => setAuthMode("register")}
                      >
                        {t("reviews.createAccount")}
                      </button>
                    </>
                  ) : (
                    <>
                      {t("reviews.hasAccountPrompt")}{" "}
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => setAuthMode("login")}
                      >
                        {t("reviews.login")}
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          )}

          {/* Create / Edit card */}
          {authed && (
            <div className="card">
              <form className="review-form" onSubmit={editingId ? handleUpdate : handleCreate}>
                <label>
                  {t("reviews.fullName")}
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleField}
                    placeholder={t("reviews.fullNamePlaceholder")}
                    required
                  />
                </label>

                <label>
                  {t("reviews.rating")}
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleField}
                    required
                  >
                    <option value="5">{t("reviews.rating5")}</option>
                    <option value="4">{t("reviews.rating4")}</option>
                    <option value="3">{t("reviews.rating3")}</option>
                    <option value="2">{t("reviews.rating2")}</option>
                    <option value="1">{t("reviews.rating1")}</option>
                  </select>
                </label>

                <label>
                  {t("reviews.message")}
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleField}
                    rows={5}
                    placeholder={t("reviews.messagePlaceholder")}
                    required
                  />
                </label>

                <div className="review-buttons">
                  <button type="submit" className="button">
                    {editingId ? t("reviews.updateReview") : t("reviews.postReview")}
                  </button>
                  <button
                    type="button"
                    className="button button--outline"
                    onClick={handleReset}
                  >
                    {t("reviews.clearForm")}
                  </button>
                  <button
                    type="button"
                    className="button button--logout"
                    onClick={handleLogout}
                  >
                    {t("reviews.logout")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews list */}
          <div className="reviews-list">
            {loading ? (
              <p className="paragraph">{t("reviews.loading")}</p>
            ) : pagedReviews.length === 0 ? (
              <p className="paragraph">{t("reviews.empty")}</p>
            ) : (
              <>
                {pagedReviews.map((r) => {
                  const isMine = myReviews.some((m) => m._id === r._id);
                  const stars = "★★★★★".slice(0, r.rating).padEnd(5, "☆");
                  const nameSource = r.authorDisplayName || r.authorName;
                  const displayName = nameSource && nameSource.trim() ? nameSource : t("reviews.anonymousUser");

                  return (
                    <div className="review-card card" key={r._id}>
                      <div className="review-header">
                        <strong>{displayName}</strong> — {stars}
                      </div>
                      <p className="paragraph" style={{ marginBottom: 0 }}>{r.message}</p>

                      {isMine && (
                        <div className="review-buttons right">
                          <button
                            type="button"
                            className="button button--outline"
                            onClick={() => startEdit(r)}
                          >
                            {t("reviews.edit")}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick={() => handleDelete(r._id)}
                          >
                            {t("reviews.delete")}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {hasMore && (
                  <div className="review-buttons">
                    <button type="button" className="button" onClick={() => setPage((p) => p + 1)}>
                      {t("reviews.loadMore")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
