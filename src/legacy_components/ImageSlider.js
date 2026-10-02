import React, { useState } from 'react';

// Inline CSS styles leveraging your project's :root variables
const styles = {
  sliderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    width: '100%',
    maxWidth: '900px',
    margin: 'var(--space-md) auto',
  },
  sliderContainer: {
    width: '100%',
    height: '550px',
    position: 'relative',
    borderRadius: '4px', // Clean, premium subtle radius
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'var(--color-gray-dark)',
  },
  slide: {
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    transition: 'background-image var(--transition-medium)',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'var(--color-cream-trans)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)', // Safari support
    color: 'var(--color-gray-dark)',
    border: '1px solid var(--color-accent)',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    cursor: 'pointer',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'all var(--transition-fast)',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 'var(--space-sm)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 'var(--space-xs)',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: '6px 12px',
    borderRadius: '20px',
    backdropFilter: 'blur(2px)',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    border: '1px solid var(--color-white)',
    cursor: 'pointer',
    padding: 0,
    transition: 'all var(--transition-fast)',
  }
};

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState({ left: false, right: false });

  if (!images || images.length === 0) {
    return (
      <div style={{ color: 'var(--color-gray-medium)', fontFamily: 'var(--font-sans)', textAlign: 'center', padding: 'var(--space-md)' }}>
        No images available.
      </div>
    );
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div style={styles.sliderWrapper}>
      <div style={styles.sliderContainer}>
        {/* Left Nav Arrow */}
        <button 
          onClick={prevSlide} 
          onMouseEnter={() => setIsHovered(prev => ({ ...prev, left: true }))}
          onMouseLeave={() => setIsHovered(prev => ({ ...prev, left: false }))}
          style={{ 
            ...styles.arrow, 
            left: '20px',
            backgroundColor: isHovered.left ? 'var(--color-accent)' : 'var(--color-cream-trans)',
            color: isHovered.left ? 'var(--color-white)' : 'var(--color-gray-dark)'
          }} 
          aria-label="Previous slide"
        >
          &#10229; {/* Clean unicode left arrow string */}
        </button>

        {/* The Slide Background */}
        <div 
          style={{
            ...styles.slide,
            backgroundImage: `url(${images[currentIndex]})`
          }} 
        />

        {/* Right Nav Arrow */}
        <button 
          onClick={nextSlide} 
          onMouseEnter={() => setIsHovered(prev => ({ ...prev, right: true }))}
          onMouseLeave={() => setIsHovered(prev => ({ ...prev, right: false }))}
          style={{ 
            ...styles.arrow, 
            right: '20px',
            backgroundColor: isHovered.right ? 'var(--color-accent)' : 'var(--color-cream-trans)',
            color: isHovered.right ? 'var(--color-white)' : 'var(--color-gray-dark)'
          }} 
          aria-label="Next slide"
        >
          &#10230; {/* Clean unicode right arrow string */}
        </button>

        {/* Pagination Dots */}
        <div style={styles.dotContainer}>
          {images.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              style={{
                ...styles.dot,
                backgroundColor: currentIndex === slideIndex ? 'var(--color-accent)' : 'transparent',
                borderColor: currentIndex === slideIndex ? 'var(--color-accent)' : 'var(--color-white-mid)',
                transform: currentIndex === slideIndex ? 'scale(1.2)' : 'scale(1)'
              }}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;