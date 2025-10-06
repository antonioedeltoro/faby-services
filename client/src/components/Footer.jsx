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

  // Scroll to the top when clicking footer internal links
  const scrollToTop = () => {
    // use auto for instant jump (not smooth)
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* left */}
        <div className="footer__column footer__nav">
          <NavLink to="/" onClick={scrollToTop}>Inicio</NavLink>
          <NavLink to="/services" onClick={scrollToTop}>Servicios</NavLink>
          <NavLink to="/contact" onClick={scrollToTop}>Contacto</NavLink>
          <NavLink to="/open-enrollment" onClick={scrollToTop}>
            Inscripción Abierta {new Date().getFullYear()}
          </NavLink>
        </div>

        {/* centre */}
        <div className="footer__column center">
          <div className="admin-logo-link">
            <Link
              to={isAuthenticated ? "/admin/news" : "/admin/login"}
              title="Acceso de administrador"
              onClick={scrollToTop}
            >
              <img src={logo} alt="Faby Services" className="footer-logo" />
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="footer__column">
          <div className="footer__social">
            <a href="tel:+14242490927" aria-label="Llamar">
              <Phone size={18} title="Llamar" />
            </a>
            <a href="mailto:fabymultiservicios@gmail.com" aria-label="Correo electrónico">
              <Mail size={18} title="Correo electrónico" />
            </a>
            <a href="https://www.facebook.com/fabyservicesCA" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/fabyservicesca/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://www.threads.net/@fabyservicesca" target="_blank" rel="noopener noreferrer" aria-label="Threads">
              <CircleDashed size={18} title="Threads" />
            </a>
            <a href="https://x.com/fabyservices" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <Twitter size={18} title="X" />
            </a>
            <a href="https://wa.me/14242490927" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} title="WhatsApp" />
            </a>
          </div>
        </div>
      </div>

      {/* full-width horizontal rule */}
      <hr className="footer-divider" />

      <div className="footer__credits">
        <p>© {new Date().getFullYear()} Faby Services Seguros y Contabilidad</p>
        <p>
          Diseñado por{" "}
          <a
            href="https://www.deltoro.codes"
            target="_blank"
            rel="noopener noreferrer"
          >
            deltoro.codes
          </a>
        </p>
      </div>
    </footer>
  );
}
