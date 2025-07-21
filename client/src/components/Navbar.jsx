import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Fabylogo.png";
import "../styles/Navbar.css";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);  // mobile menu open/closed
  const [scrolled, setScrolled] = useState(false); // adds shadow after 20 px
  const [hidden, setHidden]   = useState(false);  // controls slide-away
  const prevScroll = useRef(0);                   // remembers last scroll Y

  const menuRef   = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu  = () => setIsOpen(false);

  /* ----------  Scroll behaviour: shadow + hide-on-scroll-down  ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // 1) Shadow once user leaves very top
      setScrolled(currentY > 20);

      /* 
       2) Hide logic
          • Hide when user scrolls DOWN and has passed ~¼ viewport
          • Show when user scrolls UP
      */
      const passedThreshold = currentY > window.innerHeight * 0.25;
      const scrollingDown   = currentY > prevScroll.current;

      if (scrollingDown && passedThreshold)   setHidden(true);
      else if (!scrollingDown)                setHidden(false);

      prevScroll.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ----------  Close mobile menu when clicking outside ---------- */
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>
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

      <ul ref={menuRef} className={`navbar__links ${isOpen ? "open" : ""}`}>
        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        <li>
          <NavLink to="/open-enrollment" onClick={closeMenu}>
            Open Enrollment {new Date().getFullYear()}
          </NavLink>
        </li>
        <li><NavLink to="/news" onClick={closeMenu}>News</NavLink></li>
      </ul>
    </nav>
  );
}
