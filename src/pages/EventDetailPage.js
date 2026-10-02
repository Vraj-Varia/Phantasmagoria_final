import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

function EventDetailPage() {
  const { eventId } = useParams();
  const { stories } = useContent();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);

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

  // Find story from ContentContext or fallback
  const story = stories.find(s =>
    s.slug.toLowerCase() === decodedId ||
    s.id.toLowerCase() === decodedId ||
    decodedId.includes(s.slug.toLowerCase()) ||
    decodedId.includes('vijay') ||
    decodedId.includes('isha')
  ) || stories[0] || {
    couple: 'Vijay & Isha',
    location: 'Jaipur // India',
    date: 'December 2024',
    description: 'A royal celebration at the majestic Rambagh Palace',
    venue: 'Rambagh Palace, Jaipur',
    duration: '3 Days',
    guests: '350+'
  };

  // Dynamic gallery images managed via ContentContext & Admin
  const images = (story.images && story.images.length > 0) ? story.images : [];

  const categoryLabels = {
    all: 'All Moments',
    ceremony: 'Ceremony',
    reception: 'Reception',
    portraits: 'Portraits',
    details: 'Details',
    candid: 'Candid'
  };

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => (img.category || '').toLowerCase() === filter);

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

  const navigateLightbox = useCallback((direction) => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      img => img.id === selectedImage.id || img.url === selectedImage.url || img.src === selectedImage.src
    );

    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }

    setSelectedImage(filteredImages[newIndex]);
  }, [selectedImage, filteredImages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, navigateLightbox]);

  return (
    <div className="event-detail" ref={sectionRef}>
      {/* Event Header */}
      <section className={`event-header ${isVisible ? 'fade-in-up' : ''}`}>
        <div className="event-header-content">
          <Link to="/stories" className="back-link">
            <span className="back-arrow">&larr;</span> Back to Stories
          </Link>
          <h1 className="event-title">{story.couple}</h1>
          <p className="event-location">{story.location}</p>
          <p className="event-date">{story.date}</p>
          <p className="event-description">{story.description}</p>

          <div className="event-stats">
            {story.venue && (
              <div className="event-stat">
                <span className="event-stat-label">Venue</span>
                <span className="event-stat-value">{story.venue}</span>
              </div>
            )}
            {story.duration && (
              <div className="event-stat">
                <span className="event-stat-label">Duration</span>
                <span className="event-stat-value">{story.duration}</span>
              </div>
            )}
            {story.guests && (
              <div className="event-stat">
                <span className="event-stat-label">Guests</span>
                <span className="event-stat-value">{story.guests}</span>
              </div>
            )}
            <div className="event-stat">
              <span className="event-stat-label">Photos</span>
              <span className="event-stat-value">{images.length}+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      {images.length > 0 && (
        <section className={`event-filters ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="filter-container">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const count = key === 'all'
                ? images.length
                : images.filter(img => (img.category || '').toLowerCase() === key).length;

              if (key !== 'all' && count === 0) return null;

              return (
                <button
                  key={key}
                  className={`filter-btn ${filter === key ? 'active' : ''}`}
                  onClick={() => setFilter(key)}
                >
                  {label} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Image Gallery */}
      <section className={`event-gallery ${isVisible ? 'fade-in-up' : ''}`}>
        <div className="gallery-masonry">
          {filteredImages.map((image, index) => {
            const imgSrc = image.src || image.url;
            const sizeClass = image.size || (index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small');

            return (
              <div
                key={`${filter}-${image.id || index}`}
                className={`gallery-item ${sizeClass} ${isVisible ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${Math.min(index * 0.03, 0.6)}s` }}
                onClick={() => openLightbox(image)}
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={imgSrc}
                    alt={image.alt || `${story.couple} photo ${index + 1}`}
                    className={`gallery-image ${loadedImages.has(image.id || index) ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(image.id || index)}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  {!loadedImages.has(image.id || index) && (
                    <div className="image-skeleton"></div>
                  )}
                  <div className="gallery-overlay">
                    <span className="gallery-zoom">View</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            &times;
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            aria-label="Previous photo"
          >
            &larr;
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            aria-label="Next photo"
          >
            &rarr;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src || selectedImage.url}
              alt={selectedImage.alt || 'Full size photo'}
              className="lightbox-image"
              decoding="async"
            />
            <div className="lightbox-caption">
              <span className="lightbox-title">{selectedImage.title || story.couple}</span>
              <span className="lightbox-counter">
                {filteredImages.findIndex(
                  img => img.id === selectedImage.id || (img.url && img.url === selectedImage.url)
                ) + 1} / {filteredImages.length}
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
            Let&apos;s create something beautiful together for your special day.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export default EventDetailPage;
