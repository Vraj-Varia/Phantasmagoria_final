import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Providers
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';

// Common & Layout
import ScrollToTop from './components/common/ScrollToTop';
import Layout from './components/layout/Layout';

// Pages
import HeroPage from './pages/HeroPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StoriesPage from './pages/StoriesPage';
import EventDetailPage from './pages/EventDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/admin/AdminPage';

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <ScrollToTop />
      <Routes>
        {/* Fullscreen Entry Hero / Cover Grid */}
        <Route path="/" element={<HeroPage />} />

        {/* Public Routes with Shared Layout (Navigation + Main Content + Footer) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/portfolio" element={<HomePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/event/:eventId" element={<EventDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Dashboard Area (Accessible via Direct URL) */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
