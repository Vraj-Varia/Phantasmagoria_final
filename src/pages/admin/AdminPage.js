import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import { compressImageFile } from '../../utils/imageCompressor';

function AdminPage() {
  const {
    stories,
    addStory,
    updateStory,
    deleteStory,
    addImageToStory,
    bulkAddImagesToStory,
    deleteImageFromStory,
    heroSlides,
    addHeroSlide,
    deleteHeroSlide,
    aboutData,
    setAboutData,
    heroPageData,
    setHeroPageData,
    homePageData,
    setHomePageData,
    storiesPageData,
    setStoriesPageData,
    contactData,
    setContactData,
    inquiries,
    deleteInquiry,
    markInquiryRead,
    headerSettings,
    setHeaderSettings,
    footerSettings,
    setFooterSettings,
    collageSlides,
    addCollageSlide,
    deleteCollageSlide,
    resetToInitialData,
    saveSettingsToServer,
    exportSettingsJSON,
    importSettingsJSON,
    reloadSettingsFromServer,
    getAllSettings
  } = useContent();

  const { isAuthenticated, login, logout, defaultPasscode } = useAuth();

  // Auth form state
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active admin tab: 'hero' | 'home' | 'stories' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState('hero');

  // Selected story for image gallery management
  const [selectedStoryId, setSelectedStoryId] = useState(stories[0]?.id || '');

  // Add Story Modal state
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyForm, setStoryForm] = useState({
    couple: '',
    slug: '',
    location: '',
    date: '',
    venue: '',
    duration: '2 Days',
    guests: '200+',
    coverImage: '',
    description: ''
  });

  // Edit Story Modal state
  const [editingStory, setEditingStory] = useState(null);
  const [editStoryForm, setEditStoryForm] = useState({
    couple: '',
    slug: '',
    location: '',
    date: '',
    venue: '',
    duration: '',
    guests: '',
    coverImage: '',
    description: ''
  });

  // Hero Section (Landing) form state
  const [heroForm, setHeroForm] = useState({
    backgroundImage: heroPageData?.backgroundImage || '',
    tagline: heroPageData?.tagline || 'You Feel. I Focus. We Frame.',
    buttonText: heroPageData?.buttonText || 'Enter',
    buttonLink: heroPageData?.buttonLink || '/home',
    enableEnterAnimation: heroPageData?.enableEnterAnimation !== false
  });

  // Home Page Section form state
  const [homeForm, setHomeForm] = useState({
    storiesLabel: homePageData?.storiesLabel || 'Love Stories',
    storiesTitle: homePageData?.storiesTitle || 'Real Stories'
  });

  // Stories Page Header form state
  const [storiesHeaderForm, setStoriesHeaderForm] = useState({
    title: storiesPageData?.title || 'Stories'
  });

  // Add Slide state (for Home page slideshow)
  const [slideForm, setSlideForm] = useState({
    url: '',
    title: '',
    subtitle: ''
  });

  // 3x3 Grid Slides form state
  const [gridSlideUrlInput, setGridSlideUrlInput] = useState('');

  // About form state
  const [aboutForm, setAboutForm] = useState({ ...aboutData });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    label: contactData?.label || 'Get in Touch',
    title: contactData?.title || "Let's Create Something Beautiful",
    description: contactData?.description || "Ready to tell your story? I'd love to hear about your vision and discuss how we can create something extraordinary together.",
    email: contactData?.email || 'hello@jaydabgar.com',
    phone: contactData?.phone || '+1 (234) 567-890',
    studio: contactData?.studio || 'New York, NY',
    instagram: contactData?.instagram || 'https://instagram.com',
    facebook: contactData?.facebook || 'https://facebook.com',
    pinterest: contactData?.pinterest || 'https://pinterest.com'
  });

  // Header & Footer Settings form states
  const [headerForm, setHeaderForm] = useState({
    logoText: headerSettings?.logoText || 'Phantasmagoria.in',
    logoImage: headerSettings?.logoImage || ''
  });

  const [footerForm, setFooterForm] = useState({
    logoText: footerSettings?.logoText || 'phantasmagoria',
    tagline: footerSettings?.tagline || 'Capturing moments, creating memories',
    copyrightText: footerSettings?.copyrightText || 'Jay Dabgar Photography. All rights reserved.',
    instagram: footerSettings?.instagram || 'https://instagram.com',
    facebook: footerSettings?.facebook || 'https://facebook.com',
    pinterest: footerSettings?.pinterest || 'https://pinterest.com'
  });

  // Sync state if context updates (e.g., Reset to Defaults)
  useEffect(() => {
    if (heroPageData) {
      setHeroForm({
        backgroundImage: heroPageData.backgroundImage || '',
        tagline: heroPageData.tagline || 'You Feel. I Focus. We Frame.',
        buttonText: heroPageData.buttonText || 'Enter',
        buttonLink: heroPageData.buttonLink || '/home',
        enableEnterAnimation: heroPageData.enableEnterAnimation !== false
      });
    }
  }, [heroPageData]);

  useEffect(() => {
    if (headerSettings) {
      setHeaderForm({
        logoText: headerSettings.logoText || 'Phantasmagoria.in',
        logoImage: headerSettings.logoImage || ''
      });
    }
  }, [headerSettings]);

  useEffect(() => {
    if (footerSettings) {
      setFooterForm({
        logoText: footerSettings.logoText || 'phantasmagoria',
        tagline: footerSettings.tagline || 'Capturing moments, creating memories',
        copyrightText: footerSettings.copyrightText || 'Jay Dabgar Photography. All rights reserved.',
        instagram: footerSettings.instagram || 'https://instagram.com',
        facebook: footerSettings.facebook || 'https://facebook.com',
        pinterest: footerSettings.pinterest || 'https://pinterest.com'
      });
    }
  }, [footerSettings]);

  // Single Image Add state (for story gallery)
  const [singleImageForm, setSingleImageForm] = useState({
    url: '',
    category: 'ceremony',
    size: 'medium',
    title: '',
    alt: ''
  });

  // Bulk Image Add state (for story gallery)
  const [bulkUrls, setBulkUrls] = useState('');
  const [bulkCategory, setBulkCategory] = useState('ceremony');

  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Config management handlers
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);

  const handleSaveAllToSettingsFile = async () => {
    setIsSavingConfig(true);
    try {
      const res = await saveSettingsToServer(null, true);
      if (res && res.mode === 'server') {
        showToast('Saved directly to public/site_settings.json on disk!');
      } else if (res && res.mode === 'download') {
        showToast('Downloaded site_settings.json! Put in public/ folder to deploy.');
      } else if (res && res.success) {
        showToast('Site settings updated successfully!');
      } else {
        showToast('Error saving: ' + (res?.error || 'Unknown issue'));
      }
    } catch (e) {
      showToast('Error saving settings: ' + e.message);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleDownloadSettingsJSON = () => {
    exportSettingsJSON();
    showToast('Downloaded site_settings.json successfully!');
  };

  const handleUploadSettingsJSON = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const res = importSettingsJSON(parsed);
        if (res.success) {
          showToast('Imported site_settings.json successfully!');
        } else {
          showToast('Failed to import JSON: ' + res.error);
        }
      } catch (err) {
        showToast('Invalid JSON file format');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReloadSettings = async () => {
    const res = await reloadSettingsFromServer();
    if (res.success) {
      showToast('Reloaded settings from public/site_settings.json!');
    } else {
      showToast('Failed to reload: ' + res.error);
    }
  };

  const handleCopyJSON = () => {
    const all = getAllSettings();
    navigator.clipboard.writeText(JSON.stringify(all, null, 2)).then(() => {
      setJsonCopySuccess(true);
      showToast('Full JSON configuration copied to clipboard!');
      setTimeout(() => setJsonCopySuccess(false), 2000);
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login(passcode);
    if (!res.success) {
      setAuthError(res.error);
    } else {
      setAuthError('');
      setPasscode('');
    }
  };

  // ---------------- 1. Hero / Landing Actions ----------------
  const handleSaveHero = (e) => {
    e.preventDefault();
    setHeroPageData(heroForm);
    showToast('Hero Landing Section updated successfully!');
  };

  const handleResetHeroBg = () => {
    const updated = { ...heroForm, backgroundImage: '' };
    setHeroForm(updated);
    setHeroPageData(updated);
    showToast('Reset to default local background.');
  };

  // ---------------- Header & Footer Actions ----------------
  const handleSaveHeaderFooter = (e) => {
    e.preventDefault();
    setHeaderSettings(headerForm);
    setFooterSettings(footerForm);
    showToast('Header & Footer settings updated successfully!');
  };

  // ---------------- 2. Home Page Actions ----------------
  const handleSaveHomeHeader = (e) => {
    e.preventDefault();
    setHomePageData(homeForm);
    showToast('Home page stories section header updated!');
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    if (!slideForm.url) return;
    addHeroSlide(slideForm);
    setSlideForm({ url: '', title: '', subtitle: '' });
    showToast('New slide added to Home slideshow!');
  };

  // ---------------- 3x3 Grid Slides Actions ----------------
  const handleGridFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        const compressedDataUrl = await compressImageFile(file, 1080, 1920, 0.88);
        if (compressedDataUrl) {
          addCollageSlide({ image: compressedDataUrl });
        }
      } catch (err) {
        console.error('Error compressing uploaded slide:', err);
      }
    }
    showToast(`Uploaded ${files.length} new 3x3 grid slide(s)!`);
    e.target.value = '';
  };

  const handleGridAddUrl = (e) => {
    e.preventDefault();
    if (!gridSlideUrlInput.trim()) return;
    const urls = gridSlideUrlInput.split(/[\n,]+/).map(u => u.trim()).filter(Boolean);
    urls.forEach(u => {
      addCollageSlide({ image: u });
    });
    setGridSlideUrlInput('');
    showToast(`Added ${urls.length} 3x3 slide(s)!`);
  };

  const handleAddDefaultSampleSlide = () => {
    addCollageSlide({ image: '/grid_slides/grid_slide_default.jpg' });
    showToast('Added copy of default 3x3 grid slide!');
  };

  // ---------------- 3. Stories Page Actions ----------------
  const handleSaveStoriesHeader = (e) => {
    e.preventDefault();
    setStoriesPageData(storiesHeaderForm);
    showToast('Stories page header updated!');
  };

  const handleSaveNewStory = (e) => {
    e.preventDefault();
    if (!storyForm.couple) return;

    const slug = storyForm.slug || storyForm.couple.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addStory({
      ...storyForm,
      slug,
      coverImage: storyForm.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      images: []
    });

    setStoryForm({
      couple: '',
      slug: '',
      location: '',
      date: '',
      venue: '',
      duration: '2 Days',
      guests: '200+',
      coverImage: '',
      description: ''
    });
    setShowStoryModal(false);
    showToast('New wedding story added successfully!');
  };

  const handleOpenEditStory = (story) => {
    setEditingStory(story);
    setEditStoryForm({
      couple: story.couple || '',
      slug: story.slug || '',
      location: story.location || '',
      date: story.date || '',
      venue: story.venue || '',
      duration: story.duration || '',
      guests: story.guests || '',
      coverImage: story.coverImage || '',
      description: story.description || ''
    });
  };

  const handleSaveEditedStory = (e) => {
    e.preventDefault();
    if (!editingStory || !editStoryForm.couple) return;

    updateStory(editingStory.id, editStoryForm);
    setEditingStory(null);
    showToast(`Story "${editStoryForm.couple}" updated successfully!`);
  };

  const handleDeleteStory = (id, couple) => {
    if (window.confirm(`Delete story for "${couple}"? All associated gallery photos will be removed.`)) {
      deleteStory(id);
      showToast(`Story "${couple}" deleted.`);
    }
  };

  // ---------------- Story Gallery Actions ----------------
  const currentStory = stories.find(s => s.id === selectedStoryId || s.slug === selectedStoryId) || stories[0];

  const handleAddSingleImage = (e) => {
    e.preventDefault();
    if (!singleImageForm.url || !currentStory) return;

    addImageToStory(currentStory.id, {
      url: singleImageForm.url.trim(),
      category: singleImageForm.category,
      size: singleImageForm.size,
      title: singleImageForm.title || `${currentStory.couple} - ${singleImageForm.category}`,
      alt: singleImageForm.alt || `${currentStory.couple} Wedding Photo`
    });

    setSingleImageForm({
      url: '',
      category: 'ceremony',
      size: 'medium',
      title: '',
      alt: ''
    });
    showToast('Photo added to wedding gallery!');
  };

  const handleBulkAddImages = (e) => {
    e.preventDefault();
    if (!bulkUrls.trim() || !currentStory) return;

    const urls = bulkUrls
      .split(/[\n,]/)
      .map(u => u.trim())
      .filter(u => u.length > 5);

    if (urls.length === 0) return;

    bulkAddImagesToStory(currentStory.id, urls, bulkCategory);
    setBulkUrls('');
    showToast(`Added ${urls.length} images to "${currentStory.couple}"!`);
  };

  const handleDeleteImage = (imageId, imageIndex = null) => {
    if (currentStory && window.confirm('Remove this photo from the gallery?')) {
      deleteImageFromStory(currentStory.id, imageId, imageIndex);
      showToast('Photo removed from gallery.');
    }
  };

  // ---------------- 4. About Page Actions ----------------
  const handleSaveAbout = (e) => {
    e.preventDefault();
    setAboutData(aboutForm);
    showToast('Photographer profile & bio updated!');
  };

  // ---------------- 5. Contact Page Actions ----------------
  const handleSaveContact = (e) => {
    e.preventDefault();
    setContactData(contactForm);
    showToast('Contact page details updated!');
  };

  // Count unread inquiries
  const unreadInquiries = inquiries.filter(i => i.status === 'new').length;
  const totalPhotos = stories.reduce((acc, s) => acc + (s.images ? s.images.length : 0), 0);

  // If not authenticated, render Login Gate
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-badge">Phantasmagoria Studio</div>
          <h2 className="admin-login-title">Admin Access</h2>
          <p className="admin-login-sub">
            Manage your images, stories, inquiries, and page details dynamically.
          </p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="passcode">Admin Passcode</label>
              <input
                id="passcode"
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
                required
              />
            </div>

            {authError && <div className="admin-error-box">{authError}</div>}

            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              Unlock Dashboard
            </button>
          </form>

          <div className="admin-login-hint">
            <p>Default Passcode: <code>{defaultPasscode}</code></p>
            <Link to="/home" className="admin-back-link">&larr; Return to Public Website</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {toast && <div className="admin-toast">{toast}</div>}

      {/* Admin Header */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <span className="admin-brand-tag">Phantasmagoria Admin</span>
          <h1 className="admin-portal-title">Content &amp; Image Management</h1>
        </div>
        <div className="admin-top-actions">
          <button
            className="admin-save-config-btn"
            onClick={handleSaveAllToSettingsFile}
            disabled={isSavingConfig}
            title="Save all configuration directly to site_settings.json"
            style={{
              background: '#1b5e20',
              color: '#ffffff',
              border: 'none',
              padding: '0.55rem 1rem',
              borderRadius: '4px',
              fontWeight: '600',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}
          >
            {isSavingConfig ? 'Saving...' : '💾 Save site_settings.json'}
          </button>
          <Link to="/home" className="admin-preview-btn">
            &larr; View Live Website
          </Link>
          <button className="admin-reset-btn" onClick={resetToInitialData} title="Reset all data to defaults">
            Reset Defaults
          </button>
          <button className="admin-logout-btn" onClick={logout}>
            Lock &amp; Logout
          </button>
        </div>
      </header>

      {/* Metrics Row / Quick Jump */}
      <div className="admin-metrics-row">
        <div
          className={`metric-box ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">Hero</span>
          <span className="metric-lbl">Landing Page</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">{heroSlides.length}</span>
          <span className="metric-lbl">Home Slides</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">{collageSlides ? collageSlides.length : 0}</span>
          <span className="metric-lbl">3x3 Slides</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">{stories.length}</span>
          <span className="metric-lbl">Stories ({totalPhotos} Photos)</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">Profile</span>
          <span className="metric-lbl">About Page</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'header-footer' ? 'active' : ''}`}
          onClick={() => setActiveTab('header-footer')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">Theme</span>
          <span className="metric-lbl">Header &amp; Footer</span>
        </div>
        <div
          className={`metric-box highlight ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
          style={{ cursor: 'pointer' }}
        >
          <span className="metric-num">{inquiries.length}</span>
          <span className="metric-lbl">Inquiries ({unreadInquiries} New)</span>
        </div>
        <div
          className={`metric-box ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
          style={{ cursor: 'pointer', borderColor: '#2e7d32' }}
        >
          <span className="metric-num" style={{ color: '#2e7d32' }}>JSON</span>
          <span className="metric-lbl">Config File</span>
        </div>
      </div>

      {/* Page-wise Tab Navigation */}
      <nav className="admin-tab-nav">
        <button
          className={`admin-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Hero Section (Landing)
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home Page
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          Stories Page ({stories.length})
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About Page
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'header-footer' ? 'active' : ''}`}
          onClick={() => setActiveTab('header-footer')}
        >
          Header &amp; Footer
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Page &amp; Inquiries
          {unreadInquiries > 0 && <span className="tab-pill">{unreadInquiries} New</span>}
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
          style={{ fontWeight: '600', color: activeTab === 'config' ? 'var(--color-accent)' : '#2e7d32' }}
        >
          ⚙️ site_settings.json
        </button>
      </nav>

      {/* Main Tab Views */}
      <main className="admin-content-area">

        {/* ================= TAB 1: HERO / LANDING PAGE ================= */}
        {activeTab === 'hero' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Hero Section (Landing Page)</h2>
                <p>Manage the initial splash landing page background image, tagline, entry button, and transition animations.</p>
              </div>
            </div>

            <div className="cloudinary-info-callout">
              <div className="callout-icon">&#9729;</div>
              <div className="callout-body">
                <h4>Dynamic Background Image</h4>
                <p>
                  Paste any <strong>Cloudinary URL</strong> or web image URL to customize the landing splash background. Leave blank to use the local default photography asset (<code>landing_background1.png</code>).
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Hero Form */}
              <form onSubmit={handleSaveHero} className="admin-form">
                <div className="form-group">
                  <label>Background Image URL (Cloudinary or Web URL)</label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/... or leave blank for default"
                    value={heroForm.backgroundImage}
                    onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                  />
                  {heroForm.backgroundImage && (
                    <button
                      type="button"
                      className="btn-link"
                      onClick={handleResetHeroBg}
                      style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}
                    >
                      &times; Reset to Default Image
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Tagline Text</label>
                  <input
                    type="text"
                    value={heroForm.tagline}
                    onChange={(e) => setHeroForm({ ...heroForm, tagline: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Entry Button Text</label>
                    <input
                      type="text"
                      value={heroForm.buttonText}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Button Destination</label>
                    <input
                      type="text"
                      value={heroForm.buttonLink}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonLink: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Animation Toggle Setting */}
                <div className="form-group" style={{ marginTop: '0.5rem', marginBottom: '1.25rem', padding: '0.85rem', background: '#181818', borderRadius: '4px', border: '1px solid #2e2e2e' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: '500', color: '#fff' }}>
                    <input
                      type="checkbox"
                      checked={heroForm.enableEnterAnimation}
                      onChange={(e) => setHeroForm({ ...heroForm, enableEnterAnimation: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                    />
                    <span>Enable Cinematic Shutter Animation on Enter</span>
                  </label>
                  <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.4rem', marginLeft: '2.1rem', lineHeight: '1.4' }}>
                    When enabled, the camera shutter curtain effect plays before entering the home page. When disabled, the page smoothly dissolves with a soft cross-fade into the home page.
                  </p>
                </div>

                <button type="submit" className="btn-primary">
                  Save Hero Section Changes
                </button>
              </form>

              {/* Live Preview Card */}
              <div className="uploader-card">
                <h3>Live Preview &mdash; Hero Splash</h3>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundImage: heroForm.backgroundImage
                      ? `url(${heroForm.backgroundImage})`
                      : 'linear-gradient(135deg, #111, #222)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '1rem',
                    border: '1px solid #333'
                  }}
                >
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}></div>
                  <p style={{
                    position: 'relative',
                    color: '#fff',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.12em',
                    textAlign: 'center',
                    padding: '0 1rem',
                    marginBottom: '1rem'
                  }}>
                    {heroForm.tagline || 'You Feel. I Focus. We Frame.'}
                  </p>
                  <span style={{
                    position: 'relative',
                    padding: '6px 16px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    border: '1px solid #fff',
                    background: 'rgba(0,0,0,0.4)'
                  }}>
                    {heroForm.buttonText || 'Enter'}
                  </span>
                </div>
                <div style={{ marginTop: '0.85rem', display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    background: heroForm.enableEnterAnimation ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                    color: heroForm.enableEnterAnimation ? '#4ade80' : '#bbb',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {heroForm.enableEnterAnimation ? '🎬 Shutter Animation: Enabled' : '✨ Smooth Dissolve: Enabled'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.6rem', textAlign: 'center' }}>
                  {heroForm.backgroundImage ? 'Using custom Cloudinary/web image' : 'Using default landing_background1.png'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: HOME PAGE ================= */}
        {activeTab === 'home' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Home Page Manager</h2>
                <p>Manage the fullscreen slideshow banner and the 3-column Real Stories section on the Home page.</p>
              </div>
            </div>

            {/* Sub-Section A: Slideshow Banner */}
            <div style={{ marginBottom: '3.5rem' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                1. Fullscreen Slideshow / Portfolio Slider ({heroSlides.length} Slides)
              </h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Add high-resolution Cloudinary photography to appear in the automatic rotating homepage hero slider.
              </p>

              <div className="uploader-card" style={{ maxWidth: '650px', marginBottom: '2rem' }}>
                <h4>+ Add New Homepage Slide</h4>
                <div className="form-group" style={{ background: '#191919', padding: '1rem', borderRadius: '4px', border: '1px dashed #3a3a3a', marginTop: '1rem', marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.85rem' }}>
                    Upload Photo from Device
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        try {
                          const compressed = await compressImageFile(file, 1600, 1200, 0.88);
                          if (compressed) {
                            setSlideForm(prev => ({ ...prev, url: compressed }));
                            showToast('Photo uploaded and optimized!');
                          }
                        } catch (err) {
                          console.error('Error compressing hero slide image:', err);
                        }
                      }
                    }}
                    style={{ color: '#ccc', fontSize: '0.85rem' }}
                  />
                </div>

                <form onSubmit={handleAddSlide} className="admin-form">
                  <div className="form-group">
                    <label>Or Image URL *</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={slideForm.url}
                      onChange={(e) => setSlideForm({ ...slideForm, url: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Slide Title (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Royal Union"
                        value={slideForm.title}
                        onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Subtitle / Location</label>
                      <input
                        type="text"
                        placeholder="e.g. Jaipur, India"
                        value={slideForm.subtitle}
                        onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary">Add Slide to Slideshow</button>
                </form>
              </div>

              <div className="slides-list-grid">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id || idx} className="slide-manage-card">
                    <div
                      className="slide-thumb-preview"
                      style={{ backgroundImage: `url(${slide.url})` }}
                    />
                    <div className="slide-manage-info">
                      <h4>{slide.title || `Slide ${idx + 1}`}</h4>
                      <p>{slide.subtitle || 'No subtitle'}</p>
                    </div>
                    <button
                      className="btn-action delete"
                      onClick={() => {
                        if (window.confirm('Delete this slide?')) {
                          deleteHeroSlide(slide.id, idx);
                          showToast('Slide deleted.');
                        }
                      }}
                    >
                      Delete Slide
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Section B: Real Stories Section Header */}
            <div style={{ borderTop: '1px solid #262626', paddingTop: '2.5rem' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                2. Real Stories Section Header on Home
              </h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Customize the label and title displayed above the 3-column stories grid on the Home page.
              </p>

              <form onSubmit={handleSaveHomeHeader} className="admin-form" style={{ maxWidth: '650px', marginBottom: '2rem' }}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={homeForm.storiesLabel}
                      onChange={(e) => setHomeForm({ ...homeForm, storiesLabel: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Section Title</label>
                    <input
                      type="text"
                      value={homeForm.storiesTitle}
                      onChange={(e) => setHomeForm({ ...homeForm, storiesTitle: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Save Section Header</button>
              </form>

              {/* Home 3-Column Stories Overview */}
              <div style={{ background: '#141414', border: '1px solid #222', borderRadius: '6px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#f5deb3', margin: 0 }}>Stories Featured in Home 3-Column Grid ({stories.length})</h4>
                  <button className="btn-link" onClick={() => setActiveTab('stories')} style={{ fontSize: '0.85rem' }}>
                    Manage Stories on Stories Tab &rarr;
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                  {stories.map(s => (
                    <div key={s.id} style={{ background: '#1c1c1c', borderRadius: '4px', overflow: 'hidden', border: '1px solid #2e2e2e' }}>
                      <div
                        style={{
                          height: '110px',
                          backgroundImage: `url(${s.coverImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      <div style={{ padding: '0.75rem' }}>
                        <div style={{ fontWeight: '500', color: '#fff', fontSize: '0.9rem' }}>{s.couple}</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>{s.location}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: '0.25rem' }}>
                          {s.images ? s.images.length : 0} Photos
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sub-Section C: 3x3 Grid Slideshow (Above Footer) */}
            <div style={{ borderTop: '1px solid #262626', paddingTop: '2.5rem', marginTop: '3rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                  3. 3x3 Grid Slideshow ({collageSlides ? collageSlides.length : 0} Slides)
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem' }}>
                  Manage the 3x3 multi-image composite photo slider displayed above the footer. Slides auto-slide smoothly every 3 to 4 seconds with no captions.
                </p>
              </div>

              {/* Add New Slide Card */}
              <div className="uploader-card" style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
                <h4 style={{ color: '#f5deb3', marginBottom: '0.5rem' }}>+ Add New 3x3 Grid Slide</h4>
                <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                  Upload a 3x3 composite image file from your device or paste an image URL.
                </p>

                {/* Upload from Device */}
                <div className="form-group" style={{ background: '#191919', padding: '1.25rem', borderRadius: '4px', border: '1px dashed #3a3a3a', marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                    Upload 3x3 Grid Photo from Device
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGridFileUpload}
                    style={{ color: '#ccc', fontSize: '0.85rem' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#777', display: 'block', marginTop: '0.4rem' }}>
                    Tip: You can select one or multiple 3x3 composite photo files at once.
                  </span>
                </div>

                {/* Or Paste URL */}
                <form onSubmit={handleGridAddUrl} className="admin-form" style={{ marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label>Or Paste Image URL(s) (comma or newline separated)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={gridSlideUrlInput}
                        onChange={(e) => setGridSlideUrlInput(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        Add Slide URL
                      </button>
                    </div>
                  </div>
                </form>

                {/* Quick Add Default Image */}
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button
                    type="button"
                    className="btn-link"
                    onClick={handleAddDefaultSampleSlide}
                    style={{ fontSize: '0.85rem' }}
                  >
                    + Add Copy of Default 3x3 Grid Photo
                  </button>
                </div>
              </div>

              {/* Current Slides Gallery */}
              <h4 style={{ color: '#f5deb3', marginBottom: '1rem' }}>
                Current 3x3 Grid Slides ({collageSlides ? collageSlides.length : 0})
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
                {(collageSlides || []).map((slide, sIdx) => {
                  const imgSrc = slide.image || slide.url || '/grid_slides/grid_slide_default.jpg';
                  return (
                    <div
                      key={slide.id || sIdx}
                      style={{
                        background: '#171717',
                        border: '1px solid #282828',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div style={{ width: '100%', height: '320px', background: '#000', overflow: 'hidden' }}>
                        <img
                          src={imgSrc}
                          alt={`Slide ${sIdx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                      <div style={{ padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#888' }}>Slide #{sIdx + 1}</span>
                        <button
                          type="button"
                          className="btn-action delete"
                          onClick={() => {
                            if (window.confirm(`Delete Slide #${sIdx + 1}?`)) {
                              deleteCollageSlide(slide.id, sIdx);
                              showToast(`Slide #${sIdx + 1} deleted.`);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: STORIES PAGE ================= */}
        {activeTab === 'stories' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Stories Page Manager</h2>
                <p>Manage the editorial stories journal header, wedding stories, and individual photo galleries.</p>
              </div>
              <button
                className="btn-primary"
                onClick={() => setShowStoryModal(true)}
              >
                + Add New Wedding Story
              </button>
            </div>

            {/* Sub-Section A: Stories Page Header */}
            <div className="uploader-card" style={{ maxWidth: '600px', marginBottom: '2.5rem' }}>
              <h4>Stories Page Header Settings</h4>
              <form onSubmit={handleSaveStoriesHeader} className="admin-form" style={{ marginTop: '0.75rem' }}>
                <div className="form-group">
                  <label>Stories Main Page Title</label>
                  <input
                    type="text"
                    value={storiesHeaderForm.title}
                    onChange={(e) => setStoriesHeaderForm({ ...storiesHeaderForm, title: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">Update Stories Title</button>
              </form>
            </div>

            {/* Sub-Section B: Stories List */}
            <div style={{ marginBottom: '3.5rem' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Wedding Stories Archive ({stories.length})
              </h3>

              <div className="admin-stories-table">
                {stories.map((story) => (
                  <div key={story.id || story.slug} className="admin-story-card">
                    <div
                      className="admin-story-thumb"
                      style={{
                        backgroundImage: `url(${story.coverImage || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'})`
                      }}
                    >
                      <span className="photo-count-badge">
                        {story.images ? story.images.length : 0} Photos
                      </span>
                    </div>

                    <div className="admin-story-body">
                      <h3>{story.couple}</h3>
                      <p className="story-loc-meta">{story.location} &bull; {story.date}</p>
                      {story.venue && <p className="story-venue-meta">{story.venue}</p>}
                      <p className="story-desc-snip">{story.description}</p>
                    </div>

                    <div className="admin-story-actions">
                      <button
                        className="btn-action edit"
                        onClick={() => handleOpenEditStory(story)}
                      >
                        Edit Details
                      </button>
                      <button
                        className="btn-action view"
                        onClick={() => {
                          setSelectedStoryId(story.id);
                          const galEl = document.getElementById('story-gallery-section');
                          if (galEl) galEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Manage Photos ({story.images ? story.images.length : 0})
                      </button>
                      <button
                        className="btn-action delete"
                        onClick={() => handleDeleteStory(story.id, story.couple)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-Section C: Story Photo Gallery Manager */}
            <div id="story-gallery-section" style={{ borderTop: '1px solid #262626', paddingTop: '2.5rem' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                Story Photo Gallery Manager
              </h3>
              <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Upload or paste Cloudinary image URLs into the gallery for each wedding story.
              </p>

              {/* Story Selector */}
              <div className="story-selector-bar" style={{ marginBottom: '2rem' }}>
                <label style={{ marginRight: '1rem', color: '#fff', fontSize: '0.9rem' }}>Select Wedding Story:</label>
                <select
                  value={selectedStoryId}
                  onChange={(e) => setSelectedStoryId(e.target.value)}
                  className="admin-select"
                  style={{ padding: '8px 14px', background: '#1c1c1c', color: '#fff', border: '1px solid #333', borderRadius: '4px' }}
                >
                  {stories.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.couple} ({s.location}) &mdash; {s.images ? s.images.length : 0} Photos
                    </option>
                  ))}
                </select>
              </div>

              {currentStory && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Add Single Image Form */}
                    <div className="uploader-card">
                      <h3>+ Add Single Photo to &ldquo;{currentStory.couple}&rdquo;</h3>
                      <div className="form-group" style={{ background: '#191919', padding: '1rem', borderRadius: '4px', border: '1px dashed #3a3a3a', marginTop: '1rem', marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--color-accent)', fontWeight: 500, fontSize: '0.85rem' }}>
                          Upload Photo from Device
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files && e.target.files[0];
                            if (file) {
                              try {
                                const compressed = await compressImageFile(file, 1600, 1200, 0.88);
                                if (compressed) {
                                  setSingleImageForm(prev => ({ ...prev, url: compressed }));
                                  showToast('Photo uploaded and optimized!');
                                }
                              } catch (err) {
                                console.error('Error compressing story photo:', err);
                              }
                            }
                          }}
                          style={{ color: '#ccc', fontSize: '0.85rem' }}
                        />
                      </div>

                      <form onSubmit={handleAddSingleImage} className="admin-form">
                        <div className="form-group">
                          <label>Or Photo URL *</label>
                          <input
                            type="url"
                            placeholder="https://..."
                            value={singleImageForm.url}
                            onChange={(e) => setSingleImageForm({ ...singleImageForm, url: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-row-2">
                          <div className="form-group">
                            <label>Category</label>
                            <select
                              value={singleImageForm.category}
                              onChange={(e) => setSingleImageForm({ ...singleImageForm, category: e.target.value })}
                            >
                              <option value="ceremony">Ceremony</option>
                              <option value="reception">Reception</option>
                              <option value="portraits">Portraits</option>
                              <option value="details">Details</option>
                              <option value="candid">Candid</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Masonry Layout Size</label>
                            <select
                              value={singleImageForm.size}
                              onChange={(e) => setSingleImageForm({ ...singleImageForm, size: e.target.value })}
                            >
                              <option value="small">Standard (1x1)</option>
                              <option value="medium">Medium (Vertical 2x1)</option>
                              <option value="large">Large Hero (2x2)</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Photo Caption / Title (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Royal Courtyard Portrait"
                            value={singleImageForm.title}
                            onChange={(e) => setSingleImageForm({ ...singleImageForm, title: e.target.value })}
                          />
                        </div>

                        <button type="submit" className="btn-primary">Add Photo</button>
                      </form>
                    </div>

                    {/* Bulk Add Form */}
                    <div className="uploader-card">
                      <h3>Bulk Import Photos</h3>
                      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1rem' }}>
                        Paste multiple Cloudinary URLs separated by a new line or comma.
                      </p>
                      <form onSubmit={handleBulkAddImages} className="admin-form">
                        <div className="form-group">
                          <label>Photo Category</label>
                          <select
                            value={bulkCategory}
                            onChange={(e) => setBulkCategory(e.target.value)}
                          >
                            <option value="ceremony">Ceremony</option>
                            <option value="reception">Reception</option>
                            <option value="portraits">Portraits</option>
                            <option value="details">Details</option>
                            <option value="candid">Candid</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Cloudinary URLs (One per line)</label>
                          <textarea
                            rows="5"
                            placeholder="https://res.cloudinary.com/...&#10;https://res.cloudinary.com/..."
                            value={bulkUrls}
                            onChange={(e) => setBulkUrls(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="btn-secondary">Import All Photos</button>
                      </form>
                    </div>
                  </div>

                  {/* Photo Gallery Grid */}
                  <h4 style={{ color: '#fff', marginBottom: '1rem' }}>
                    Current Gallery for &ldquo;{currentStory.couple}&rdquo; ({currentStory.images ? currentStory.images.length : 0} Photos)
                  </h4>

                  {(!currentStory.images || currentStory.images.length === 0) ? (
                    <div className="empty-gallery-prompt">
                      <p>No photos in this story yet. Add single photos or bulk import above.</p>
                    </div>
                  ) : (
                    <div className="admin-gallery-grid">
                      {currentStory.images.map((img, imgIdx) => (
                        <div key={img.id || imgIdx} className="admin-photo-card">
                          <div
                            className="admin-photo-thumb"
                            style={{ backgroundImage: `url(${img.url || img.src})` }}
                          >
                            <span className="photo-category-pill">{img.category || 'photo'}</span>
                          </div>
                          <div className="admin-photo-info">
                            <p className="photo-title">{img.title || 'Wedding Photo'}</p>
                            <button
                              className="btn-photo-delete"
                              onClick={() => handleDeleteImage(img.id, imgIdx)}
                            >
                              &times; Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Modal: Add New Story */}
            {showStoryModal && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <div className="modal-header">
                    <h3>Add New Wedding Story</h3>
                    <button className="modal-close" onClick={() => setShowStoryModal(false)}>&times;</button>
                  </div>
                  <form onSubmit={handleSaveNewStory} className="admin-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Couple Names *</label>
                        <input
                          type="text"
                          placeholder="e.g. Rohan &amp; Ananya"
                          value={storyForm.couple}
                          onChange={(e) => setStoryForm({ ...storyForm, couple: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>URL Slug</label>
                        <input
                          type="text"
                          placeholder="rohan-ananya (auto-generated if blank)"
                          value={storyForm.slug}
                          onChange={(e) => setStoryForm({ ...storyForm, slug: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          placeholder="e.g. Udaipur // India"
                          value={storyForm.location}
                          onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          placeholder="e.g. February 2025"
                          value={storyForm.date}
                          onChange={(e) => setStoryForm({ ...storyForm, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Venue</label>
                        <input
                          type="text"
                          placeholder="e.g. Taj Lake Palace"
                          value={storyForm.venue}
                          onChange={(e) => setStoryForm({ ...storyForm, venue: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Duration</label>
                        <input
                          type="text"
                          placeholder="e.g. 3 Days"
                          value={storyForm.duration}
                          onChange={(e) => setStoryForm({ ...storyForm, duration: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Guests</label>
                        <input
                          type="text"
                          placeholder="e.g. 300+"
                          value={storyForm.guests}
                          onChange={(e) => setStoryForm({ ...storyForm, guests: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cover Photo (Cloudinary or Image URL)</label>
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/... or https://..."
                        value={storyForm.coverImage}
                        onChange={(e) => setStoryForm({ ...storyForm, coverImage: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Editorial Description</label>
                      <textarea
                        rows="3"
                        placeholder="A royal sunset celebration combining traditional heritage with intimate romance..."
                        value={storyForm.description}
                        onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setShowStoryModal(false)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Wedding Story
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Existing Story */}
            {editingStory && (
              <div className="admin-modal-overlay">
                <div className="admin-modal">
                  <div className="modal-header">
                    <h3>Edit Wedding Story &mdash; {editingStory.couple}</h3>
                    <button className="modal-close" onClick={() => setEditingStory(null)}>&times;</button>
                  </div>
                  <form onSubmit={handleSaveEditedStory} className="admin-form">
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Couple Names *</label>
                        <input
                          type="text"
                          value={editStoryForm.couple}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, couple: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>URL Slug</label>
                        <input
                          type="text"
                          value={editStoryForm.slug}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, slug: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          value={editStoryForm.location}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, location: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          value={editStoryForm.date}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Venue</label>
                        <input
                          type="text"
                          value={editStoryForm.venue}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, venue: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Duration</label>
                        <input
                          type="text"
                          value={editStoryForm.duration}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, duration: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Guests</label>
                        <input
                          type="text"
                          value={editStoryForm.guests}
                          onChange={(e) => setEditStoryForm({ ...editStoryForm, guests: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cover Photo (Cloudinary or Image URL)</label>
                      <input
                        type="url"
                        value={editStoryForm.coverImage}
                        onChange={(e) => setEditStoryForm({ ...editStoryForm, coverImage: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Editorial Description</label>
                      <textarea
                        rows="3"
                        value={editStoryForm.description}
                        onChange={(e) => setEditStoryForm({ ...editStoryForm, description: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="modal-actions">
                      <button type="button" className="btn-secondary" onClick={() => setEditingStory(null)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Update Story Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: ABOUT PAGE ================= */}
        {activeTab === 'about' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>About Page Manager</h2>
                <p>Update photographer biography, portrait image, philosophy tagline, and milestones.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <form onSubmit={handleSaveAbout} className="admin-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Photographer Name</label>
                    <input
                      type="text"
                      value={aboutForm.name}
                      onChange={(e) => setAboutForm({ ...aboutForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={aboutForm.label || 'The Photographer'}
                      onChange={(e) => setAboutForm({ ...aboutForm, label: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tagline / Philosophy Title</label>
                  <input
                    type="text"
                    value={aboutForm.tagline}
                    onChange={(e) => setAboutForm({ ...aboutForm, tagline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Profile Portrait Image URL (Cloudinary)</label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/..."
                    value={aboutForm.profileImage}
                    onChange={(e) => setAboutForm({ ...aboutForm, profileImage: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Bio Paragraph 1</label>
                  <textarea
                    rows="3"
                    value={aboutForm.paragraphs[0] || ''}
                    onChange={(e) => {
                      const newPars = [...aboutForm.paragraphs];
                      newPars[0] = e.target.value;
                      setAboutForm({ ...aboutForm, paragraphs: newPars });
                    }}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Bio Paragraph 2</label>
                  <textarea
                    rows="3"
                    value={aboutForm.paragraphs[1] || ''}
                    onChange={(e) => {
                      const newPars = [...aboutForm.paragraphs];
                      newPars[1] = e.target.value;
                      setAboutForm({ ...aboutForm, paragraphs: newPars });
                    }}
                  ></textarea>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Weddings Stat</label>
                    <input
                      type="text"
                      value={aboutForm.stats[0]?.number || '500+'}
                      onChange={(e) => {
                        const newStats = [...aboutForm.stats];
                        newStats[0] = { ...newStats[0], number: e.target.value };
                        setAboutForm({ ...aboutForm, stats: newStats });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Years Stat</label>
                    <input
                      type="text"
                      value={aboutForm.stats[1]?.number || '10+'}
                      onChange={(e) => {
                        const newStats = [...aboutForm.stats];
                        newStats[1] = { ...newStats[1], number: e.target.value };
                        setAboutForm({ ...aboutForm, stats: newStats });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Awards Stat</label>
                    <input
                      type="text"
                      value={aboutForm.stats[2]?.number || '50+'}
                      onChange={(e) => {
                        const newStats = [...aboutForm.stats];
                        newStats[2] = { ...newStats[2], number: e.target.value };
                        setAboutForm({ ...aboutForm, stats: newStats });
                      }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Save Profile Changes
                </button>
              </form>

              {/* Portrait Preview Card */}
              <div className="uploader-card">
                <h3>Portrait Photo Preview</h3>
                <div
                  style={{
                    width: '100%',
                    height: '350px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    backgroundImage: aboutForm.profileImage
                      ? `url(${aboutForm.profileImage})`
                      : 'linear-gradient(135deg, #222, #111)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginTop: '1rem',
                    border: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {!aboutForm.profileImage && (
                    <span style={{ color: '#888', fontStyle: 'italic' }}>No profile image set</span>
                  )}
                </div>
                <div style={{ marginTop: '1rem', color: '#ccc', fontSize: '0.9rem' }}>
                  <strong>{aboutForm.name || 'Jay Dabgar'}</strong>
                  <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                    {aboutForm.tagline || 'Creating Fiction out of Reality'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: HEADER & FOOTER SETTINGS ================= */}
        {activeTab === 'header-footer' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Header &amp; Footer Branding Settings</h2>
                <p>Configure the header logo and footer branding, tagline, social links, and copyright text across all pages.</p>
              </div>
            </div>

            <form onSubmit={handleSaveHeaderFooter} className="admin-form">
              {/* Part 1: Header Settings */}
              <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid #282828' }}>
                <h3 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  1. Header Navigation Settings
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Customize the brand logo displayed on the top navigation bar. You can use brand text or provide an image logo URL.
                </p>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Logo Text / Brand Name</label>
                    <input
                      type="text"
                      placeholder="Phantasmagoria.in"
                      value={headerForm.logoText}
                      onChange={(e) => setHeaderForm({ ...headerForm, logoText: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Custom Logo Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://res.cloudinary.com/... or leave empty to use text logo"
                      value={headerForm.logoImage}
                      onChange={(e) => setHeaderForm({ ...headerForm, logoImage: e.target.value })}
                    />
                  </div>
                </div>

                {/* Header Live Preview */}
                <div style={{ marginTop: '1rem', padding: '1rem 1.5rem', background: '#ffffff', borderRadius: '4px', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', marginRight: '1rem' }}>Header Preview:</span>
                    {headerForm.logoImage ? (
                      <img src={headerForm.logoImage} alt={headerForm.logoText} style={{ maxHeight: '32px', width: 'auto' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#111', fontStyle: 'italic' }}>
                        {headerForm.logoText || 'Phantasmagoria.in'}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666' }}>
                    <span>Home</span>
                    <span>About</span>
                    <span>Stories</span>
                    <span>Contact</span>
                  </div>
                </div>
              </div>

              {/* Part 2: Footer Settings */}
              <div>
                <h3 style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  2. Footer Settings
                </h3>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  Manage the brand logo, tagline, social links, and copyright text displayed at the bottom of pages.
                  <span style={{ color: '#aaa', marginLeft: '0.35rem' }}>(Note: Navigation menu links are excluded from the footer as requested).</span>
                </p>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Footer Logo / Brand Text</label>
                    <input
                      type="text"
                      placeholder="phantasmagoria"
                      value={footerForm.logoText}
                      onChange={(e) => setFooterForm({ ...footerForm, logoText: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Footer Tagline</label>
                    <input
                      type="text"
                      placeholder="Capturing moments, creating memories"
                      value={footerForm.tagline}
                      onChange={(e) => setFooterForm({ ...footerForm, tagline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Copyright Text</label>
                  <input
                    type="text"
                    placeholder="Jay Dabgar Photography. All rights reserved."
                    value={footerForm.copyrightText}
                    onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
                    required
                  />
                  <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem' }}>
                    Year will automatically appear as &copy; {new Date().getFullYear()} preceding this text.
                  </p>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Instagram URL</label>
                    <input
                      type="url"
                      placeholder="https://instagram.com"
                      value={footerForm.instagram}
                      onChange={(e) => setFooterForm({ ...footerForm, instagram: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Facebook URL</label>
                    <input
                      type="url"
                      placeholder="https://facebook.com"
                      value={footerForm.facebook}
                      onChange={(e) => setFooterForm({ ...footerForm, facebook: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pinterest URL</label>
                    <input
                      type="url"
                      placeholder="https://pinterest.com"
                      value={footerForm.pinterest}
                      onChange={(e) => setFooterForm({ ...footerForm, pinterest: e.target.value })}
                    />
                  </div>
                </div>

                {/* Footer Live Preview */}
                <div style={{ marginTop: '1.25rem', padding: '1.5rem', background: '#111111', borderRadius: '4px', border: '1px solid #282828', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666', marginBottom: '0.75rem' }}>Footer Live Preview (No Menu Links):</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#fff', textTransform: 'lowercase', letterSpacing: '0.08em', margin: '0 0 0.4rem 0' }}>
                    {footerForm.logoText || 'phantasmagoria'}
                  </h4>
                  {footerForm.tagline && (
                    <p style={{ color: '#888', fontSize: '0.85rem', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                      {footerForm.tagline}
                    </p>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                    {footerForm.instagram && <span>Instagram</span>}
                    {footerForm.facebook && <span>Facebook</span>}
                    {footerForm.pinterest && <span>Pinterest</span>}
                  </div>
                  <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>
                    &copy; {new Date().getFullYear()} {footerForm.copyrightText || 'Jay Dabgar Photography. All rights reserved.'}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button type="submit" className="btn-primary">
                  Save Header &amp; Footer Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 6: CONTACT PAGE & INQUIRIES ================= */}
        {activeTab === 'contact' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Contact Page &amp; Client Inquiries</h2>
                <p>Manage studio address, email, phone, social links, and review client booking inquiries.</p>
              </div>
            </div>

            {/* Sub-Section A: Contact Details Form */}
            <div style={{ marginBottom: '3.5rem' }}>
              <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                1. Contact Page Details &amp; Social Links
              </h3>

              <form onSubmit={handleSaveContact} className="admin-form" style={{ maxWidth: '800px' }}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Section Label</label>
                    <input
                      type="text"
                      value={contactForm.label}
                      onChange={(e) => setContactForm({ ...contactForm, label: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Section Title</label>
                    <input
                      type="text"
                      value={contactForm.title}
                      onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Intro Description Text</label>
                  <textarea
                    rows="2"
                    value={contactForm.description}
                    onChange={(e) => setContactForm({ ...contactForm, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Studio Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Studio Location / City</label>
                    <input
                      type="text"
                      value={contactForm.studio}
                      onChange={(e) => setContactForm({ ...contactForm, studio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Instagram URL</label>
                    <input
                      type="url"
                      value={contactForm.instagram}
                      onChange={(e) => setContactForm({ ...contactForm, instagram: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Facebook URL</label>
                    <input
                      type="url"
                      value={contactForm.facebook}
                      onChange={(e) => setContactForm({ ...contactForm, facebook: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pinterest URL</label>
                    <input
                      type="url"
                      value={contactForm.pinterest}
                      onChange={(e) => setContactForm({ ...contactForm, pinterest: e.target.value })}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Save Contact Information
                </button>
              </form>
            </div>

            {/* Sub-Section B: Inquiries Inbox */}
            <div style={{ borderTop: '1px solid #262626', paddingTop: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ color: 'var(--color-accent)', margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>
                    2. Client Inquiries Inbox ({inquiries.length})
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Submitted inquiries received from the public Contact form.
                  </p>
                </div>
                {unreadInquiries > 0 && (
                  <span className="tab-pill" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                    {unreadInquiries} New Unread
                  </span>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="empty-gallery-prompt">
                  <p>No inquiries yet. Submissions on the Contact page will appear here immediately.</p>
                </div>
              ) : (
                <div className="inquiries-list">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className={`inquiry-card ${inq.status === 'new' ? 'unread' : ''}`}>
                      <div className="inquiry-header">
                        <div>
                          <h3>{inq.coupleName || inq.name}</h3>
                          <div className="inquiry-meta">
                            {inq.email && <a href={`mailto:${inq.email}`} className="inq-link">{inq.email}</a>}
                            {inq.phone && <span> &bull; <a href={`tel:${inq.phone}`} className="inq-link">{inq.phone}</a></span>}
                            <span> &bull; Received on {inq.date}</span>
                          </div>
                        </div>
                        <div className="inquiry-status-actions">
                          {inq.status === 'new' ? (
                            <button
                              className="btn-action edit"
                              onClick={() => markInquiryRead(inq.id)}
                            >
                              Mark Read
                            </button>
                          ) : (
                            <span className="read-badge">&#10003; Read</span>
                          )}
                          <button
                            className="btn-action delete"
                            onClick={() => {
                              if (window.confirm('Delete this inquiry?')) deleteInquiry(inq.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="inquiry-details-box">
                        <p><strong>Dates &amp; Venue:</strong> {inq.weddingDetails || inq.weddingDate || 'Not specified'}</p>
                        {inq.city && <p><strong>Location:</strong> {inq.city}</p>}
                        <p className="inquiry-message"><strong>Vision / Note:</strong> {inq.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 7: CONFIG (site_settings.json) ================= */}
        {activeTab === 'config' && (
          <div className="admin-section">
            <div className="section-head-bar">
              <div>
                <h2>Global Site Configuration (site_settings.json)</h2>
                <p>Manage, save, download, and synchronize the central configuration JSON file that all visitors and customers load.</p>
              </div>
            </div>

            <div style={{
              background: '#161616',
              border: '1px solid #2e7d32',
              borderRadius: '8px',
              padding: '1.8rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginTop: 0, color: '#4caf50', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.25rem' }}>
                <span>📁</span> Why <code>site_settings.json</code> is the Single Source of Truth
              </h3>
              <p style={{ lineHeight: '1.6', color: '#ccc', margin: '0.5rem 0 1.2rem' }}>
                Browser <code>localStorage</code> is private to only one browser on one computer—customers visiting your live website cannot see changes stored in your local browser.
                Instead, our website loads all stories, hero slides, 3x3 collage slides, bio, and contact settings directly from <strong><code>public/site_settings.json</code></strong>.
                When any client or customer accesses the site on their phone or computer, their browser fetches this JSON file in real time—<strong>zero database required!</strong>
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.2rem' }}>
                <button
                  type="button"
                  onClick={handleSaveAllToSettingsFile}
                  disabled={isSavingConfig}
                  style={{
                    background: '#2e7d32',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {isSavingConfig ? 'Saving...' : '💾 Save Directly to Disk / Server'}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSettingsJSON}
                  style={{
                    background: '#1976d2',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  📥 Download site_settings.json
                </button>

                <label
                  style={{
                    background: '#424242',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  📤 Upload / Import site_settings.json
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleUploadSettingsJSON}
                    style={{ display: 'none' }}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleReloadSettings}
                  style={{
                    background: '#616161',
                    color: '#fff',
                    border: 'none',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  🔄 Reload from Server
                </button>

                <button
                  type="button"
                  onClick={handleCopyJSON}
                  style={{
                    background: jsonCopySuccess ? '#2e7d32' : '#222',
                    color: '#fff',
                    border: '1px solid #444',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {jsonCopySuccess ? '✓ Copied to Clipboard!' : '📋 Copy Full JSON'}
                </button>
              </div>
            </div>

            <div className="admin-card" style={{ marginTop: '1.5rem', background: '#111', border: '1px solid #262626' }}>
              <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1.1rem' }}>Live Configuration Inspector</h3>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>Real-time reflection of current content state</span>
              </div>
              <div className="admin-card-body" style={{ padding: '0 1.25rem 1.25rem' }}>
                <textarea
                  readOnly
                  value={JSON.stringify(getAllSettings(), null, 2)}
                  style={{
                    width: '100%',
                    height: '420px',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    padding: '1rem',
                    background: '#0a0a0a',
                    color: '#a9ffb0',
                    border: '1px solid #262626',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminPage;
