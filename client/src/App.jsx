// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import OpenEnrollment from './pages/OpenEnrollment';

// News Pages
import NewsList from './pages/News/NewsList';
import NewsDetail from './pages/News/NewsDetail';
import NewsDashboard from './pages/News/NewsDashboard';
import CreateNews from './pages/News/CreateNews';
import EditNews from './pages/News/EditNews';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/open-enrollment" element={<OpenEnrollment />} />

            {/* News Routes */}
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/admin/news" element={<NewsDashboard />} />
            <Route path="/admin/news/new" element={<CreateNews />} />
            <Route path="/admin/news/edit/:id" element={<EditNews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
