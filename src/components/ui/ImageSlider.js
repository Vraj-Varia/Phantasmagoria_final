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
      className="custom-slider-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Image Carousel"
    >
      <div
        className="custom-slider-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              className="slider-arrow slider-arrow-left"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              &#10229;
            </button>
            <button
              className="slider-arrow slider-arrow-right"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              &#10230;
            </button>
          </>
        )}

        {/* Crossfade Slides */}
        <div className="slider-slides-track">
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
                className={`slider-slide-layer ${isActive ? 'active' : ''}`}
                style={{
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                <img
                  src={optimizedUrl}
                  alt={slide.title || 'Slide'}
                  className="slider-slide-img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                {(slide.title || slide.subtitle) && (
                  <div className="slider-caption-overlay">
                    {slide.subtitle && <span className="slider-subtitle">{slide.subtitle}</span>}
                    {slide.title && <h3 className="slider-title">{slide.title}</h3>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dots Pagination */}
        {total > 1 && (
          <div className="slider-dots-wrapper">
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
    </div>
  );
};

export default ImageSlider;
