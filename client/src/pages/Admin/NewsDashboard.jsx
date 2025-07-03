import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import "../../styles/News.css";
import "../../styles/Typography.css";

export default function NewsDashboard() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // Optional: Delete functionality
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setNews(news.filter((item) => item._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete post.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="news-page">
      <div className="dashboard-card">
        <h1 className="dashboard-title">News Dashboard</h1>

        <div className="dashboard-buttons">
          <Link to="/admin/news/create" className="button">
            + Create New
          </Link>
          <LogoutButton />
        </div>

        {news.length === 0 ? (
          <p>No news posts found.</p>
        ) : (
          <div className="news-table">
            {news.map((item) => (
              <div className="news-card" key={item._id}>
                <h2>{item.title}</h2>
                <p className="news-meta">
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="form-buttons">
                  <Link to={`/admin/news/edit/${item._id}`} className="button">
                    Edit
                  </Link>
                  <button
                    className="button danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
