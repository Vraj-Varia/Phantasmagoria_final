import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

/**
 * Standard Layout Shell for Phantasmagoria
 * Ensures consistent navigation, page transitions, and footer across all public routes.
 */
function Layout() {
  return (
    <div className="site-wrapper">
      <Navigation />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
