import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures browser window scrolls to top on every route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant jump prevents awkward mid-scroll renders
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
