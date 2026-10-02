import React, { useState } from 'react';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

/**
 * CloudinaryImage Component
 * Optimizes Cloudinary images with auto format (f_auto), quality (q_auto),
 * responsive widths, skeleton placeholder loading, and smooth fade-in.
 */
function CloudinaryImage({
  src,
  alt = 'Photograph by Jay Dabgar',
  className = '',
  width,
  height,
  quality = 'auto',
  crop,
  style = {},
  onClick,
  priority = false
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute optimized URL
  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    crop
  });

  const fallbackPlaceholder = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className={`cloudinary-image-container ${isLoaded ? 'loaded' : ''} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
        ...style
      }}
      onClick={onClick}
    >
      {!isLoaded && !hasError && (
        <div
          className="image-skeleton-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #1f1f1f 0%, #2a2a2a 50%, #1f1f1f 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite linear'
          }}
        />
      )}

      <img
        src={hasError ? fallbackPlaceholder : (optimizedSrc || fallbackPlaceholder)}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease, transform 0.6s ease'
        }}
      />
    </div>
  );
}

export default CloudinaryImage;
