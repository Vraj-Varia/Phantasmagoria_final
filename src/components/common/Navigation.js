import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

function Navigation() {
  const { headerSettings } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/stories', label: 'Stories' },
    { to: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => {
    if (path === '/home' && (location.pathname === '/home' || location.pathname === '/portfolio')) return true;
    return location.pathname === path;
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="logo-text">
            {headerSettings?.logoImage ? (
              <img
                src={headerSettings.logoImage}
                alt={headerSettings.logoText || 'Logo'}
                className="nav-logo-img"
                loading="eager"
                decoding="async"
                style={{ maxHeight: '36px', width: 'auto', verticalAlign: 'middle' }}
              />
            ) : (
              <em>{headerSettings?.logoText || 'Phantasmagoria.in'}</em>
            )}
          </Link>
        </div>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                to={link.to}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
