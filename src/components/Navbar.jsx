import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const scrollContainer = document.querySelector('.phone-content');
    if (!scrollContainer) return;

    if (menuOpen) {
      scrollContainer.style.overflowY = 'hidden';
    } else {
      scrollContainer.style.overflowY = 'auto';
    }

    return () => {
      scrollContainer.style.overflowY = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'nav-active' : ''}`}>
        {/* Custom 3-line Hamburger Menu left aligned */}
        <button 
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Premium Glassmorphic Slide Drawer Menu */}
      <div className={`menu-drawer ${menuOpen ? 'drawer-active' : ''}`}>
        <div className="drawer-glow"></div>
        <ul className="drawer-links">
          <li>
            <a href="#inicio" onClick={toggleMenu} className="drawer-link">
              <span className="link-num">01</span> Início
            </a>
          </li>
          <li>
            <a href="#camisas" onClick={toggleMenu} className="drawer-link">
              <span className="link-num">02</span> Camisas
            </a>
          </li>
          <li>
            <a href="#detalhes" onClick={toggleMenu} className="drawer-link">
              <span className="link-num">03</span> Detalhes
            </a>
          </li>
          <li>
            <a href="#comprar" onClick={toggleMenu} className="drawer-link drawer-link-cta">
              <span className="link-num">04</span> Comprar
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
