import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageSlider from '../components/ui/ImageSlider';
import { useContent } from '../context/ContentContext';
import { INITIAL_HERO_SLIDES } from '../data/initialData';

function HomePage() {
  const { heroSlides, stories, homePageData } = useContent();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Shutter opening transition state when navigating from Hero
  const [shutterReveal, setShutterReveal] = useState(() => Boolean(location.state?.shutterTransition));
  const [shutterOpening, setShutterOpening] = useState(false);
  const isSmoothFade = Boolean(location.state?.smoothFade);

  useEffect(() => {
    if (shutterReveal) {
      // Trigger the opening animation slightly after mount so initial closed state renders cleanly
      const openTimer = setTimeout(() => {
        setShutterOpening(true);
      }, 40);

      // Clean up overlay when the opening animation completes
      const cleanupTimer = setTimeout(() => {
        setShutterReveal(false);
      }, 950);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [shutterReveal]);

  const defaultSliderUrls = INITIAL_HERO_SLIDES.map(s => s.url);

  // Use dynamic slides from ContentContext if available, otherwise default web URLs
  const sliderImages = (heroSlides && heroSlides.length > 0)
    ? heroSlides.map(s => (typeof s === 'string' ? s : s.url || s))
    : defaultSliderUrls;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`home-page-container ${isSmoothFade ? 'smooth-fade-entrance' : ''}`}>
      {/* Fullscreen Shutter Opening Reveal when entering from Hero */}
      {shutterReveal && (
        <div className={`shutter-reveal-overlay ${shutterOpening ? 'shutter-opening' : ''}`} aria-hidden="true">
          <div className="shutter-curtain shutter-curtain-top"></div>
          <div className="shutter-curtain shutter-curtain-bottom"></div>
          <div className="shutter-flash"></div>
        </div>
      )}

      {/* Portfolio Slider Section */}
      <section id="portfolio" className="portfolio" ref={sectionRef}>
        <ImageSlider images={sliderImages} slides={heroSlides} />
      </section>

      {/* Real Love Stories Section */}
      <section id="stories-copy" className="stories-copy">
        <div className="stories-header-copy">
          <p className="section-label">{homePageData?.storiesLabel || 'Love Stories'}</p>
          <h2 className="section-title">{homePageData?.storiesTitle || 'Real Stories'}</h2>
          <div className="section-divider"></div>
        </div>

        <div className="stories-container-copy">
          {stories.map((story, index) => {
            const coverImage =
              story.coverImage ||
              (story.images && story.images[0] && (story.images[0].url || story.images[0].src)) ||
              defaultSliderUrls[index % defaultSliderUrls.length];

            const count = story.images
              ? story.images.length
              : (story.imageCount || 40);

            return (
              <div
                key={story.id || story.slug || index}
                className={`story-card-copy ${isVisible ? 'fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Link to={`/event/${story.slug}`} className="story-cta-copy">
                  <div className="story-image-copy">
                    <img
                      src={coverImage}
                      alt={story.couple || 'Story'}
                      loading="lazy"
                      decoding="async"
                      className="story-image-cover-img"
                    />
                  </div>

                  <div className="story-content-copy">
                    <h3 className="story-couple-copy">
                      {story.couple}
                    </h3>

                    <p className="story-location-copy">
                      {story.location}
                    </p>

                    <p className="story-date-copy">
                      {story.date}
                    </p>

                    <p className="story-description-copy">
                      {story.description}
                    </p>

                    <p className="story-image-count-copy">
                      {count}+ Photos
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
