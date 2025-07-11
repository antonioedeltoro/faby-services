import "../../styles/Admin.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* API base (env or localhost) */
  const API = import.meta.env.VITE_API_URL || "http://localhost:5001";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");

  /* ───── Load post once ───── */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch(`${API}/api/news/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => {
        setTitle(d.title || "");
        setBody(d.content || "");
        setExistingImage(d.imageUrl || "");
      })
      .catch(() => setError("Failed to load post."));
  }, [API, id]);

  /* ───── Handlers ───── */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError("");
    } else {
      setImage(null);
      setError("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim())
      return setError("Title and body are required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", body);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API}/api/news/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) navigate("/admin/news");
    else setError("Update failed.");
  };

  /* ───── JSX ───── */
  return (
    <div className="news-page">
      <div className="admin-card card">
        <Helmet>
          <title>Edit Post | Admin</title>
        </Helmet>

        <h1 className="admin-page-title">Edit News Post</h1>

        <form onSubmit={handleSubmit} className="enrollment-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Body
            <textarea
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </label>

          <label>
            Replace Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {(image || existingImage) && (
            <div className="admin-form-preview">
              <img
                src={image ? URL.createObjectURL(image) : existingImage}
                alt="Preview"
              />
            </div>
          )}

          {error && <p className="admin-form-error">{error}</p>}

          <button type="submit" className="button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
