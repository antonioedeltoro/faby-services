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
import AdminDashboard from './pages/Admin/Dashboard';
import AdminCreate from './pages/Admin/Create';
import AdminEdit from './pages/Admin/Edit';

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
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
<Route path="/admin/news" element={<AdminDashboard />} />

              <Route
                path="/admin/news/new"
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
