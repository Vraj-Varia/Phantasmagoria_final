import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
// import Footer from './Footer';

// Load images from assets/event_images/Vijay & Isha directory dynamically
const loadVijayIshaImages = () => {
  try {
    const context = require.context(
      '../assets/event_images/Vijay & Isha',
      false,
      /\.(png|jpe?g|svg|JPG|JPEG|PNG)$/
    );
    const categories = ['ceremony', 'reception', 'portraits', 'details', 'candid'];

    return context.keys().map((key, index) => {
      const imgModule = context(key);
      const src = imgModule.default || imgModule;
      const category = categories[index % categories.length];
      const size = index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small';
      const cleanName = key.replace('./', '').replace(/\.[^/.]+$/, '');

      return {
        id: index + 1,
        src: src,
        alt: `Vijay & Isha - ${cleanName}`,
        category: category,
        size: size,
        title: `Vijay & Isha - Photo ${index + 1}`
      };
    });
  } catch (err) {
    console.error("Error loading Vijay & Isha images:", err);
    return [];
  }
};

const vijayIshaImages = loadVijayIshaImages();

// Generate fallback placeholder images if needed
const generateFallbackImages = (eventId) => {
  const images = [];
  const categories = ['ceremony', 'reception', 'portraits', 'details', 'candid'];

  for (let i = 1; i <= 42; i++) {
    const category = categories[i % categories.length];
    const size = i % 5 === 0 ? 'large' : i % 3 === 0 ? 'medium' : 'small';
    images.push({
      id: i,
      src: `https://picsum.photos/800/${size === 'large' ? 1200 : size === 'medium' ? 1000 : 800}?random=${eventId}${i}`,
      alt: `Event moment ${i}`,
      category: category,
      size: size,
      title: `Moment ${i}`
    });
  }
  return images;
};

function EventDetail() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const { eventId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const decodedId = decodeURIComponent(eventId || '').toLowerCase().trim();

  const eventData = {
    'vijay-isha': {
      couple: 'Vijay & Isha',
      location: 'Jaipur // India',
      date: 'December 2024',
      description: 'A royal celebration at the majestic Rambagh Palace',
      venue: 'Rambagh Palace, Jaipur',
      photographer: 'Jay Dabgar',
      duration: '3 Days',
      guests: '350+',
      images: vijayIshaImages.length > 0 ? vijayIshaImages : generateFallbackImages('vijay-isha')
    },
    'priya-rahul': {
      couple: 'Vijay & Isha',
      location: 'Jaipur // India',
      date: 'December 2024',
      description: 'A royal celebration at the majestic Rambagh Palace',
      venue: 'Rambagh Palace, Jaipur',
      photographer: 'Jay Dabgar',
      duration: '3 Days',
      guests: '350+',
      images: vijayIshaImages.length > 0 ? vijayIshaImages : generateFallbackImages('priya-rahul')
    },
    'emma-james': {
      couple: 'Emma & James',
      location: 'Tuscany // Italy',
      date: 'September 2024',
      description: 'An intimate vineyard wedding under the Italian sun',
      venue: 'Castello di Vicarello, Tuscany',
      photographer: 'Jay Dabgar',
      duration: '2 Days',
      guests: '120',
      images: generateFallbackImages('emma-james')
    },
    'sofia-michael': {
      couple: 'Sofia & Michael',
      location: 'Santorini // Greece',
      date: 'August 2024',
      description: 'Sunset vows overlooking the Aegean Sea',
      venue: 'Canaves Oia, Santorini',
      photographer: 'Jay Dabgar',
      duration: '1 Day',
      guests: '80',
      images: generateFallbackImages('sofia-michael')
    }
  };

  const eventKey = Object.keys(eventData).find(key =>
    key === decodedId || decodedId.includes('vijay') || decodedId.includes('isha')
  ) || 'vijay-isha';

  const event = eventData[eventKey];

  const filteredImages = filter === 'all'
    ? event.images
    : event.images.filter(img => img.category === filter);

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    if (currentIndex === -1) return;
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    setSelectedImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages]);

  const categoryLabels = {
    all: 'All Moments',
    ceremony: 'Ceremony',
    reception: 'Reception',
    portraits: 'Portraits',
    details: 'Details',
    candid: 'Candid'
  };

  return (
    <>
      <Navigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <div className="event-detail" ref={sectionRef}>
        {/* Event Header */}
        <br />
        <br />
        <section className={`event-header ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="event-header-content">
            <Link to="/stories" className="back-link">
              <span className="back-arrow">←</span> Back to Stories
            </Link>
            <h1 className="event-title">{event.couple}</h1>
            <p className="event-location">{event.location}</p>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>

            <div className="event-stats">
              <div className="event-stat">
                <span className="event-stat-label">Venue</span>
                <span className="event-stat-value">{event.venue}</span>
              </div>
              <div className="event-stat">
                <span className="event-stat-label">Duration</span>
                <span className="event-stat-value">{event.duration}</span>
              </div>
              <div className="event-stat">
                <span className="event-stat-label">Guests</span>
                <span className="event-stat-value">{event.guests}</span>
              </div>
              <div className="event-stat">
                <span className="event-stat-label">Photos</span>
                <span className="event-stat-value">{event.images.length}+</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className={`event-filters ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="filter-container">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                className={`filter-btn ${filter === key ? 'active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Image Gallery */}
        <section className={`event-gallery ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="gallery-masonry">
            {filteredImages.map((image, index) => (
              <div
                key={`${filter}-${image.id}`}
                className={`gallery-item ${image.size} ${isVisible ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.03}s` }}
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`gallery-image ${loadedImages.has(image.id) ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(image.id)}
                    loading="lazy"
                  />
                  {!loadedImages.has(image.id) && (
                    <div className="image-skeleton"></div>
                  )}
                  <div className="gallery-overlay">
                    <span className="gallery-zoom">View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div className="lightbox" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
            >
              ←
            </button>
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
            >
              →
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="lightbox-image"
              />
              <div className="lightbox-caption">
                <span className="lightbox-title">{selectedImage.title}</span>
                <span className="lightbox-counter">
                  {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <section className="event-footer">
          <div className="event-footer-content">
            <h2 className="event-footer-title">Love This Style?</h2>
            <p className="event-footer-text">
              Let's create something beautiful together for your special day.
            </p>
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default EventDetail;
