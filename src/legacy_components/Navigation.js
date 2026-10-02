import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Navigation({ menuOpen, setMenuOpen, scrollY }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(scrollY > 100);
  }, [scrollY]);

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        <div className="logo">
          <Link to="/" className="logo-text"><em>Phantasmagoria.in</em></Link>
          {/* <span className="logo-subtitle">Photography</span> */}
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {/* <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/stories" onClick={() => setMenuOpen(false)}>Stories</Link></li> */}
          {/* <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li> */}
          {/* <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li> */}

          <li><Link className='nav-link' to="/home">Home</Link></li>
          <li><Link className='nav-link' to="/about">About</Link></li>
          <li><Link className='nav-link' to="/stories">Stories</Link></li>
          <li><Link className='nav-link' to="/contact">Contact</Link></li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <li></li>
          <li></li>
          <li></li>
        </button>

      </div>
    </nav>
  );
}

export default Navigation;