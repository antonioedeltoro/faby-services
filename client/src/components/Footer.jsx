import "../styles/Footer.css";
import { NavLink, Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  CircleDashed,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";   // ✅ use the hook
import logo from "../assets/Fabylogoblk.png";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* left */}
        <div className="footer__column footer__nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/open-enrollment">
            Open Enrollment {new Date().getFullYear()}
          </NavLink>
        </div>

        {/* centre */}
        <div className="footer__column center">
          <div className="admin-logo-link">
            <Link
              to={isAuthenticated ? "/admin/news" : "/admin/login"}
              title="Admin access"
            >
              <img src={logo} alt="Faby Services" className="footer-logo" />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Faby Services Insurance & Taxes</p>
          <p>
            Designed by{" "}
            <a
              href="https://www.deltoro.codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              deltoro.codes
            </a>
          </p>
        </div>

        {/* right */}
        <div className="footer__column">
          <div className="footer__social">
            <a href="tel:+14242490927">
              <Phone size={18} title="Call" />
            </a>
            <a href="mailto:faby@example.com">
              <Mail size={18} title="Email" />
            </a>
            <a href="https://facebook.com/fabyservices" target="_blank" rel="noopener noreferrer">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com/fabyservices" target="_blank" rel="noopener noreferrer">
              <Instagram size={18} />
            </a>
            <a href="https://www.threads.net/@fabyservices" target="_blank" rel="noopener noreferrer">
              <CircleDashed size={18} title="Threads" />
            </a>
            <a href="https://x.com/fabyservices" target="_blank" rel="noopener noreferrer">
              <Twitter size={18} title="X" />
            </a>
            <a href="https://wa.me/14242490927" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} title="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
