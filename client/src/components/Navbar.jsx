import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/Fabylogo.png";
import "../styles/Navbar.css";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);  // mobile menu open/closed
  const [scrolled, setScrolled] = useState(false);  // adds shadow after 20 px
  const [hidden, setHidden]     = useState(false);  // controls slide-away
  const prevScroll = useRef(0);                     // remembers last scroll Y

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

      if (scrollingDown && passedThreshold) setHidden(true);
      else if (!scrollingDown)              setHidden(false);

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

  const now  = new Date();
  const year = now.getFullYear();

  const inRange = (d, start, end) => d >= start && d <= end;

  // Open Enrollment: Nov 1 – Jan 31 (spans years)
  const oeStartCY = new Date(year, 10, 1, 0, 0, 0, 0);            // Nov 1 (current year)
  const oeEndNY   = new Date(year + 1, 0, 31, 23, 59, 59, 999);   // Jan 31 (next year)
  const oeStartPY = new Date(year - 1, 10, 1, 0, 0, 0, 0);        // Nov 1 (prev year)
  const oeEndCY   = new Date(year, 0, 31, 23, 59, 59, 999);       // Jan 31 (current year)
  const showOpenEnrollment =
    inRange(now, oeStartCY, oeEndNY) || inRange(now, oeStartPY, oeEndCY);

  // Tax Season: Jan 15 – Oct 15 (includes extensions)
  const taxStart = new Date(year, 0, 15, 0, 0, 0, 0);             // Jan 15
  const taxEnd   = new Date(year, 9, 15, 23, 59, 59, 999);        // Oct 15
  const showTaxSeason = inRange(now, taxStart, taxEnd);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${hidden ? "hidden" : ""}`}>
      <div className="navbar__logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logotipo de Faby Services" className="logo-img" />
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
        <li><NavLink to="/" end onClick={closeMenu}>Inicio</NavLink></li>
        <li><NavLink to="/services" onClick={closeMenu}>Servicios</NavLink></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contacto</NavLink></li>
        <li><NavLink to="/appointments" onClick={closeMenu}>Citas</NavLink></li>

        {showOpenEnrollment && (
          <li>
            <NavLink to="/open-enrollment" onClick={closeMenu}>
              Inscripción Abierta {year}
              <span className="seasonal-dot" />
            </NavLink>
          </li>
        )}

        {showTaxSeason && (
          <li>
            <NavLink to="/tax-season" onClick={closeMenu}>
              Temporada de Impuestos {year}
              <span className="seasonal-dot" />
            </NavLink>
          </li>
        )}

        <li><NavLink to="/news" onClick={closeMenu}>Noticias</NavLink></li>
        <li><NavLink to="/reviews" onClick={closeMenu}>Reseñas</NavLink></li>
      </ul>
    </nav>
  );
}
