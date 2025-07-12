import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../../styles/partials/forms.css';
import "../../styles/partials/buttons.css";
import '../../styles/Typography.css';

export default function EditPost() {
  const { id } = useParams();                     // still _id for admin
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');

  const API = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${API}/api/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Post not found');
        const data = await res.json();
        setTitle(data.title || '');
        setContent(data.content || '');            // ✅
        setExistingImage(data.imageUrl || '');     // ✅
      } catch (err) {
        console.error(err);
        setError('Failed to load post.');
      }
    };

    fetchPost();
  }, [API, id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setError('');
    } else {
      setImage(null);
      setError('Please upload a valid image file.');
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
    formData.append('content', content);           // ✅
    if (image) formData.append('image', image);

    const token = localStorage.getItem('authToken');

    try {
      const res = await fetch(`${API}/api/news/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        navigate('/admin/news');
      } else {
        const data = await res.json();
        setError(data.message || 'Update failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="admin-form-wrapper">
      <Helmet>
        <title>Edit News Post</title>
      </Helmet>

      <h1>Edit News Post</h1>

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

        <label htmlFor="image">Replace Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {(image || existingImage) && (
          <div className="admin-form-preview">
            <img
              src={image ? URL.createObjectURL(image) : existingImage}
              alt="Preview"
            />
          </div>
        )}

        {error && <p className="admin-form-error">{error}</p>}

        <button type="submit" className="admin-form-submit button">
          Update
        </button>
      </form>
    </div>
  );
}
