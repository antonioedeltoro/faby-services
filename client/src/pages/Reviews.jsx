import "../styles/Reviews.css";
import { Helmet } from "react-helmet";
import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { API } from "../api/baseURL";

const USER_TOKEN_KEY = "reviews_user_token";
const INACTIVITY_MS = 15 * 60 * 1000; // 15 min
const PAGE_SIZE = 10;

export default function Reviews() {
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

  useEffect(() => {
    if (authed) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete axios.defaults.headers.common.Authorization;
  }, [authed, token]);

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
        const publicReq = axios.get(`${API}/api/reviews/public`);
        const mineReq = authed ? axios.get(`${API}/api/reviews/mine`) : Promise.resolve({ data: [] });
        const [pubRes, meRes] = await Promise.all([publicReq, mineReq]);
        if (cancelled) return;
        setPublicReviews(pubRes.data || []);
        setMyReviews(meRes.data || []);
        setPage(1);
      } catch (err) {
        setError(err?.response?.data?.message || "No se pudieron cargar las reseñas.");
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
      const { data } = await axios.post(`${API}/api/user/auth/register`, authForm);
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ email: "", password: "" });
      const meRes = await axios.get(`${API}/api/reviews/mine`);
      setMyReviews(meRes.data || []);
    } catch (err) {
      setError("No se pudo crear la cuenta.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await axios.post(`${API}/api/user/auth/login`, authForm);
      localStorage.setItem(USER_TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setAuthForm({ email: "", password: "" });
      const meRes = await axios.get(`${API}/api/reviews/mine`);
      setMyReviews(meRes.data || []);
    } catch (err) {
      setError("No se pudo iniciar sesión.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
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
      const { data } = await axios.post(`${API}/api/reviews`, payload);
      setMyReviews((prev) => [data, ...prev]);
      setForm(emptyForm);
      setPage(1);
    } catch {
      setError("No se pudo enviar su reseña.");
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
      const { data } = await axios.put(`${API}/api/reviews/${editingId}`, payload);
      setMyReviews((prev) => prev.map((r) => (r._id === editingId ? data : r)));
      setEditingId(null);
      setForm(emptyForm);
    } catch {
      setError("No se pudo actualizar su reseña.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/reviews/${id}`);
      setMyReviews((prev) => prev.filter((r) => r._id !== id));
    } catch {
      setError("No se pudo eliminar su reseña.");
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="page-container reviews-page">
      <Helmet>
        <title>Reseñas | Faby Services Seguros y Contabilidad</title>
      </Helmet>

      <section className="reviews-section">
        <div className="reviews-content">
          <h1 className="heading-xl blue">Reseñas</h1>
          <p className="paragraph">
            Comparte tu experiencia con Faby Services. Inicia sesión o crea una cuenta para publicar y gestionar tus reseñas.
          </p>

          {error && <p className="paragraph error-text">{error}</p>}

          {/* Auth card */}
          {!authed && (
            <div className="card">
              <form className="review-form" onSubmit={authMode === "login" ? handleLogin : handleRegister}>
                <h2 className="heading-md auth-title">
                  {authMode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                </h2>

                <label>
                  Correo electrónico
                  <input
                    type="email"
                    name="email"
                    value={authForm.email}
                    onChange={handleAuthChange}
                    required
                  />
                </label>
                <label>
                  Contraseña
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
                    {authMode === "login" ? "Iniciar sesión" : "Crear cuenta"}
                  </button>
                </div>

                <p className="auth-switch">
                  {authMode === "login" ? (
                    <>
                      ¿No tienes cuenta?{" "}
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => setAuthMode("register")}
                      >
                        Crear cuenta
                      </button>
                    </>
                  ) : (
                    <>
                      ¿Ya tienes cuenta?{" "}
                      <button
                        type="button"
                        className="linklike"
                        onClick={() => setAuthMode("login")}
                      >
                        Iniciar sesión
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
                  Nombre completo
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleField}
                    placeholder="Ej.: Juan Pérez"
                    required
                  />
                </label>

                <label>
                  Calificación
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleField}
                    required
                  >
                    <option value="5">5 - Excelente</option>
                    <option value="4">4 - Muy bueno</option>
                    <option value="3">3 - Bueno</option>
                    <option value="2">2 - Regular</option>
                    <option value="1">1 - Necesita mejorar</option>
                  </select>
                </label>

                <label>
                  Mensaje
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleField}
                    rows={5}
                    placeholder="Cuéntenos sobre su experiencia..."
                    required
                  />
                </label>

                <div className="review-buttons">
                  <button type="submit" className="button">
                    {editingId ? "Actualizar reseña" : "Publicar reseña"}
                  </button>
                  <button
                    type="button"
                    className="button button--outline"
                    onClick={handleReset}
                  >
                    Borrar Formulario
                  </button>
                  <button
                    type="button"
                    className="button button--logout"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews list */}
          <div className="reviews-list">
            {loading ? (
              <p className="paragraph">Cargando reseñas…</p>
            ) : pagedReviews.length === 0 ? (
              <p className="paragraph">Aún no hay reseñas.</p>
            ) : (
              <>
                {pagedReviews.map((r) => {
                  const isMine = myReviews.some((m) => m._id === r._id);
                  const stars = "★★★★★".slice(0, r.rating).padEnd(5, "☆");
                  const nameSource = r.authorDisplayName || r.authorName;
                  const displayName = nameSource && nameSource.trim() ? nameSource : "Usuario";

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
                            Editar
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick={() => handleDelete(r._id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {hasMore && (
                  <div className="review-buttons">
                    <button type="button" className="button" onClick={() => setPage((p) => p + 1)}>
                      Cargar más
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
