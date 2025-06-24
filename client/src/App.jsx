// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import OpenEnrollment from './pages/OpenEnrollment';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
