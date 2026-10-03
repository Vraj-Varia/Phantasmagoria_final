import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

/**
 * ImageSlider Component
 * Feature-rich slider with smooth crossfade transitions, mobile touch swipe,
 * keyboard accessibility, autoplay with pause-on-hover, and Cloudinary optimization.
 */
const ImageSlider = ({ slides = [], autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Normalize input: can be array of strings or array of { url, title, subtitle }
  const normalizedSlides = slides.map(item => {
    if (typeof item === 'string') {
      return { url: item, title: '', subtitle: '' };
    }
    return item;
  });

  const total = normalizedSlides.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [total, isPaused, autoPlayInterval, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped left -> next
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  if (total === 0) {
    return (
      <div className="slider-empty">
        <p>No images available for the slider.</p>
      </div>
    );
  }

  return (
    <div
      className="sqs-gallery-container sqs-gallery-block-slideshow sqs-gallery-block-slider sqs-gallery-has-controls sqs-gallery-block-show-meta sqs-gallery-transparent-background block-animation-none clear custom-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Wedding Gallery Slideshow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slideshow Track */}
      <div className="sqs-gallery slider-slides-track">
        {normalizedSlides.map((slide, index) => {
          const isActive = index === currentIndex;
          const optimizedUrl = getOptimizedImageUrl(slide.url, {
            width: 1600,
            quality: 'auto:best',
            format: 'auto'
          });

          return (
            <div
              key={slide.id || index}
              className={`slide content-fill slider-slide-layer ${isActive ? 'active' : ''}`}
              data-type="image"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <img
                src={optimizedUrl}
                alt={slide.title || 'Wedding Photograph'}
                className="thumb-image slider-slide-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="color-overlay"></div>
              {(slide.title || slide.subtitle) && (
                <div className="sqs-gallery-meta slider-caption-overlay">
                  {slide.subtitle && <span className="slider-subtitle">{slide.subtitle}</span>}
                  {slide.title && <h3 className="slider-title">{slide.title}</h3>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Squarespace Style Navigation Arrows */}
      {total > 1 && (
        <div className="sqs-gallery-meta-container">
          <div className="sqs-gallery-controls">
            <button
              type="button"
              className="previous"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <svg viewBox="0 0 100 100" className="control-arrow prev-arrow" aria-hidden="true">
                <polyline points="65 20, 35 50, 65 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="next"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <svg viewBox="0 0 100 100" className="control-arrow next-arrow" aria-hidden="true">
                <polyline points="35 20, 65 50, 35 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Dots Pagination */}
      {total > 1 && (
        <div className="sqs-gallery-dots slider-dots-wrapper">
          {normalizedSlides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot-btn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
