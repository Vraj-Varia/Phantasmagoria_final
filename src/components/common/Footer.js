import React from 'react';
import { useContent } from '../../context/ContentContext';

function Footer() {
  const { footerSettings } = useContent();

  const logoText = footerSettings?.logoText || 'phantasmagoria';
  const tagline = footerSettings?.tagline || 'Capturing moments, creating memories';
  const copyrightText = footerSettings?.copyrightText || 'Jay Dabgar Photography. All rights reserved.';
  const instagram = footerSettings?.instagram || 'https://instagram.com';
  const facebook = footerSettings?.facebook || 'https://facebook.com';
  const pinterest = footerSettings?.pinterest || 'https://pinterest.com';

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-logo-text">{logoText}</span>
        </div>

        {tagline && <p className="footer-tagline">{tagline}</p>}

        <div className="footer-social">
          {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>}
          {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>}
          {pinterest && <a href={pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">Pinterest</a>}
        </div>

        <p className="footer-copyright">&copy; {new Date().getFullYear()} {copyrightText}</p>
      </div>
    </footer>
  );
}

export default Footer;
