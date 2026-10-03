import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';

/**
 * CollageGridSlider Component
 * Displays full 3x3 photo-grid composite images in a seamless, gap-free horizontal slider.
 * 
 * Features:
 * - Gap between images is strictly 0 (seamless side-by-side images).
 * - Slider navigation buttons are fully visible, circular, and never cut off.
 * - Starts at index 0 so images are immediately visible on mount.
 * - Infinite seamless loop: after cycling through base slides, snaps seamlessly back to 0.
 * - Works with 1, 2, 5, 8, or any number of images with ZERO blank space.
 * - Auto-slides smoothly every 3.5 seconds.
 * - Pauses on hover; supports touch swipe on mobile.
 * - Non-clickable and non-hoverable images.
 * - Constrained strictly to page width (max-width: 1400px).
 * - No captions.
 * - All images loaded eagerly to ensure immediate rendering.
 */
function CollageGridSlider({
  slides = [],
  title = null,
  subtitle = null,
  slideInterval = 3500 // 3.5 seconds
}) {
  const trackRef = useRef(null);
  const isSlidingRef = useRef(false);
  const resetTimerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardStep, setCardStep] = useState(340);
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  // Normalize input slides
  const cleanSlides = useMemo(() => {
    if (!Array.isArray(slides) || slides.length === 0) {
      return [{ id: 'default-1', image: '/grid_slides/grid_slide_default.jpg' }];
    }
    return slides.map((s, idx) => ({
      id: s.id || `grid-slide-${idx}`,
      image: s.image || s.url || '/grid_slides/grid_slide_default.jpg'
    }));
  }, [slides]);

  // Ensure base set has at least 5 slides so loop is continuous
  const baseSlides = useMemo(() => {
    const res = [...cleanSlides];
    while (res.length < 5) {
      res.push(...cleanSlides);
    }
    return res;
  }, [cleanSlides]);

  const N = baseSlides.length; // Number of unique slides in one full loop cycle (>= 5)

  // Repeat baseSlides at least 4 times (or enough to have 20+ cards)
  // This guarantees that when sliding from 0 to N, there are ALWAYS multiple viewports of cards ahead!
  const repeatCount = Math.max(4, Math.ceil(20 / N));
  const displaySlides = useMemo(() => {
    const list = [];
    for (let setIdx = 0; setIdx < repeatCount; setIdx++) {
      baseSlides.forEach((slide, itemIdx) => {
        list.push({
          ...slide,
          uniqueKey: `s${setIdx}-i${itemIdx}-${slide.id || itemIdx}`
        });
      });
    }
    return list;
  }, [baseSlides, repeatCount]);

  // Measure card width dynamically (gap is 0 so cardStep === card width)
  useEffect(() => {
    const updateCardStep = () => {
      if (trackRef.current) {
        const firstCard = trackRef.current.querySelector('.grid-slide-card');
        if (firstCard) {
          const rect = firstCard.getBoundingClientRect();
          if (rect.width > 0) {
            setCardStep(rect.width);
          }
        }
      }
    };

    updateCardStep();
    const t1 = setTimeout(updateCardStep, 50);
    const t2 = setTimeout(updateCardStep, 200);
    window.addEventListener('resize', updateCardStep);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateCardStep);
    };
  }, [displaySlides]);

  // Next slide handler
  const handleNext = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;
    setIsTransitioning(true);

    setCurrentIndex(prev => {
      const nextIdx = prev + 1;

      // When reaching index N:
      // Slide N is visually identical to Slide 0.
      // After transition completes (650ms), snap back to index 0 with transition: none!
      if (nextIdx >= N) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(0);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsTransitioning(true);
              isSlidingRef.current = false;
            });
          });
        }, 660);
      } else {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
          isSlidingRef.current = false;
        }, 500);
      }

      return nextIdx;
    });
  }, [N]);

  // Previous slide handler
  const handlePrev = useCallback(() => {
    if (isSlidingRef.current) return;
    isSlidingRef.current = true;

    if (currentIndex <= 0) {
      // 1. Instantly snap to index N without transition
      setIsTransitioning(false);
      setCurrentIndex(N);

      // 2. In next frame, re-enable transition and smoothly slide to N - 1
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(N - 1);
          clearTimeout(resetTimerRef.current);
          resetTimerRef.current = setTimeout(() => {
            isSlidingRef.current = false;
          }, 660);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        isSlidingRef.current = false;
      }, 500);
    }
  }, [N, currentIndex]);

  // Step-by-step auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, slideInterval);

    return () => clearInterval(timer);
  }, [isPaused, slideInterval, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e) => {
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current < -40) {
      handleNext();
    } else if (touchDeltaXRef.current > 40) {
      handlePrev();
    }
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const offset = currentIndex * cardStep;

  return (
    <section className="collage-grid-slider-section" id="grid-vignettes">
      <div className="collage-grid-slider-container">
        {(title || subtitle) && (
          <div className="collage-grid-slider-header">
            {subtitle && <p className="grid-slider-subtitle">{subtitle}</p>}
            {title && <h2 className="grid-slider-title">{title}</h2>}
            <div className="section-divider"></div>
          </div>
        )}

        <div
          className="sqs-gallery-container sqs-gallery-block-slider sqs-gallery-has-controls collage-grid-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Controls: Inset 16px inside view, 100% visible and unclipped */}
          <div className="sqs-gallery-controls collage-slider-controls">
            <button
              type="button"
              className="previous collage-arrow"
              onClick={handlePrev}
              aria-label="Previous Slide"
            >
              <svg viewBox="0 0 100 100" className="control-arrow" aria-hidden="true">
                <polyline points="65 20, 35 50, 65 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="next collage-arrow"
              onClick={handleNext}
              aria-label="Next Slide"
            >
              <svg viewBox="0 0 100 100" className="control-arrow" aria-hidden="true">
                <polyline points="35 20, 65 50, 35 80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Stepped Sliding Viewport constrained to 1400px page container */}
          <div className="collage-slider-viewport">
            <div
              className="collage-grid-slider-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${offset}px)`,
                transition: isTransitioning ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
              }}
            >
              {displaySlides.map((slide) => {
                const imgSrc =
                  slide.image ||
                  slide.url ||
                  '/grid_slides/grid_slide_default.jpg';

                return (
                  <div
                    key={slide.uniqueKey}
                    className="grid-slide-card"
                  >
                    <img
                      src={imgSrc}
                      alt="3x3 Grid Photograph"
                      loading="eager"
                      decoding="async"
                      className="collage-grid-img"
                      draggable="false"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollageGridSlider;
