import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../styles/partials/forms.css';
import "../../styles/partials/buttons.css";
import '../../styles/Typography.css';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    } else {
      setError('Please upload a valid image file.');
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);          // ✅ correct field name
    if (image) formData.append('image', image);

    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch(`${API}/api/news`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        navigate('/admin/news');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to create post.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-form-wrapper">
      <Helmet>
        <title>Create News Post | Admin</title>
      </Helmet>

      <h1>Create News Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label htmlFor="image">Upload Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {image && (
          <div className="admin-form-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        )}

        {error && <p className="admin-form-error">{error}</p>}

        <button type="submit" className="admin-form-submit button">
          Submit
        </button>
      </form>
    </div>
  );
}
