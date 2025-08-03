import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/Admin.css";

export default function NewsDashboard() {
  const [posts, setPosts] = useState([]);

  /* fetch posts on mount */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${API}/api/auth/login`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  /* delete handler */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    const token = localStorage.getItem("authToken");
    const res = await fetch(`http://localhost:5001/api/news/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setPosts((p) => p.filter((n) => n._id !== id));
  };

  /* ---------- render ---------- */
  return (
    <div className="news-page admin-dashboard">
      <div className="admin-card card">
        <h1 className="admin-page-title">Admin Dashboard</h1>

        <div className="dashboard-buttons">
          <Link to="/admin/news/create" className="button">
            Create Blog Post
          </Link>
          <LogoutButton />
        </div>

        {posts.length === 0 ? (
          <p>No blog posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h2>{post.title}</h2>
              <p className="news-meta">
                Created: {new Date(post.createdAt).toLocaleDateString()}
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
