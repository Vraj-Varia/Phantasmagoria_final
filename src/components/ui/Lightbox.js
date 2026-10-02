import React, { useEffect, useCallback, useRef } from 'react';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

/**
 * Lightbox Modal Component
 * Displays high-resolution image with keyboard & swipe navigation,
 * image counter, captions, and accessibility features.
 */
function Lightbox({ images = [], selectedImage, onClose, onNavigate }) {
  const touchStartX = useRef(null);

  const currentIndex = images.findIndex(img => img.id === selectedImage?.id);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(images[newIndex]);
  }, [images, currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    const newIndex = (currentIndex + 1) % images.length;
    onNavigate(images[newIndex]);
  }, [images, currentIndex, onNavigate]);

  // Lock body scroll and listen for keydown events
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handlePrev, handleNext]);

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();

    touchStartX.current = null;
  };

  if (!selectedImage) return null;

  const highResSrc = getOptimizedImageUrl(selectedImage.url, {
    width: 2000,
    quality: 'auto:best',
    format: 'auto'
  });

  return (
    <div
      className="lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      <button
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
          >
            &#8594;
          </button>
        </>
      )}

      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={highResSrc || selectedImage.url}
          alt={selectedImage.alt || 'Full size wedding photograph'}
          className="lightbox-image"
        />

        <div className="lightbox-caption">
          <span className="lightbox-title">
            {selectedImage.title || selectedImage.alt || ''}
          </span>
          {currentIndex !== -1 && images.length > 0 && (
            <span className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
