import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  CircleDashed
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {/* Left: Internal Links */}
        <div className="footer__column footer__nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/open-enrollment">Open Enrollment</NavLink>
        </div>

        {/* Middle: Branding */}
        <div className="footer__column center">
          <p>© {new Date().getFullYear()} Faby Services Insurance & Taxes</p>
          <p>
            Designed by{' '}
            <a
              href="https://www.deltoro.codes"
              target="_blank"
              rel="noopener noreferrer"
            >
              deltoro.codes
            </a>
          </p>
        </div>

        {/* Right: Icons Row */}
        <div className="footer__column">
          <div className="footer__social">
            <a href="tel:+14242490927">
              <Phone size={18} title="Call" />
            </a>
            <a href="mailto:faby@example.com">
              <Mail size={18} title="Email" />
            </a>
            <a
              href="https://facebook.com/fabyservices"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com/fabyservices"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.threads.net/@fabyservices"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CircleDashed size={18} title="Threads" />
            </a>
            <a
              href="https://x.com/fabyservices"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={18} title="X" />
            </a>
            <a
              href="https://wa.me/14242490927"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} title="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
