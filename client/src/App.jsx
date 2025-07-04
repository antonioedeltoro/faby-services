import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import OpenEnrollment from './pages/OpenEnrollment';

// News Pages (Public)
import NewsList from './pages/News/NewsList';
import NewsDetail from './pages/News/NewsDetail';

// Admin Pages (Private)
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/NewsDashboard';
import AdminCreate from './pages/Admin/CreatePost';
import AdminEdit from './pages/Admin/EditPost'; // assuming you renamed this

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Auth
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/open-enrollment" element={<OpenEnrollment />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/create"
              element={
                <ProtectedRoute>
                  <AdminCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminEdit />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
