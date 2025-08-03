import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../styles/Admin.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) navigate("/admin/news");
    else setError("Failed to create post.");
  };

  return (
    <div className="news-page">
      <div className="admin-card card">
        <Helmet>
          <title>Create Post | Admin</title>
        </Helmet>

        <h1 className="admin-page-title">Create New Post</h1>

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
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {image && (
            <div className="admin-form-preview">
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </div>
          )}

          {error && <p className="admin-form-error">{error}</p>}

          <button type="submit" className="button">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
