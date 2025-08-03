// client/src/pages/Admin/NewsDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { API } from "../../api/baseURL";            // ← unified base URL
import "../../styles/Admin.css";

export default function NewsDashboard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  /* ─────────────── fetch posts once ─────────────── */
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`${API}/api/news`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load posts (${r.status})`);
        return r.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message));
  }, []);

  /* ─────────────── delete handler ─────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`${API}/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`Delete failed (${res.status})`);
      }

      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  /* ─────────────── render ─────────────── */
  return (
    <div className="news-page admin-dashboard">
      <div className="admin-card card">
        <h1 className="admin-page-title">Admin&nbsp;Dashboard</h1>

        <div className="dashboard-buttons">
          <Link to="/admin/news/create" className="button">
            Create Blog Post
          </Link>
          <LogoutButton />
        </div>

        {error && <p className="admin-form-error">{error}</p>}

        {posts.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h2>{post.title}</h2>
              <p className="news-meta">
                Created:&nbsp;{new Date(post.createdAt).toLocaleDateString()}
              </p>

              <div className="form-buttons">
                <Link to={`/admin/news/edit/${post._id}`} className="button">
                  Edit
                </Link>
                <button
                  className="button button--outline"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
