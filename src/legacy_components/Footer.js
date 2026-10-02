import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-logo-text">phantasmagoria</span>
          {/* <span className="footer-logo-subtitle">Photography</span> */}
        </div>

        <p className="footer-tagline">Capturing moments, creating memories</p>

        <div className="footer-links">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/stories">Stories</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-social">
          <a href="instagram.com" aria-label="Instagram">Instagram</a>
          <a href="facebook.com" aria-label="Facebook">Facebook</a>
          <a href="pinterest.com" aria-label="Pinterest">Pinterest</a>
        </div>

        <p className="footer-copyright">&copy; {new Date().getFullYear()} Jay Dabgar Photography. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
