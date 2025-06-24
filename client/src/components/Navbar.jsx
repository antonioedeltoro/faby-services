import { NavLink, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import logo from '../assets/Fabylogo.svg';
import '../styles/Navbar.css';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle scroll darkening
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Faby Services logo" className="logo-img" />
        </Link>
      </div>

      <button
        ref={buttonRef}
        className="navbar__toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
      </button>

      <ul ref={menuRef} className={`navbar__links ${isOpen ? 'open' : ''}`}>
        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        <li><NavLink to="/open-enrollment" onClick={closeMenu}>Open Enrollment</NavLink></li>
      </ul>
    </nav>
  );
}
