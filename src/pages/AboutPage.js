import React, { useEffect, useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';

function AboutPage() {
  const { aboutData } = useContent();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = (aboutData && aboutData.stats && aboutData.stats.length > 0)
    ? aboutData.stats
    : [
        { number: '500+', label: 'Weddings' },
        { number: '10+', label: 'Years' },
        { number: '50+', label: 'Awards' }
      ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-container">
        {/* Left: Photographer Image */}
        <div className={`about-image-wrapper ${isVisible ? 'fade-in-left' : ''}`}>
          <div className="about-image">
            {aboutData?.profileImage ? (
              <img
                src={aboutData.profileImage}
                alt={aboutData?.name || 'Jay Dabgar'}
                loading="lazy"
                decoding="async"
                className="about-profile-img"
              />
            ) : (
              <div className="about-image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-text">{aboutData?.name || 'Jay Dabgar'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Bio & Philosophy */}
        <div className={`about-content ${isVisible ? 'fade-in-right' : ''}`}>
          <p className="about-label">{aboutData?.label || 'The Photographer'}</p>
          <h2 className="about-title">{aboutData?.tagline || 'Creating Fiction out of Reality'}</h2>
          <div className="about-divider"></div>

          {aboutData && aboutData.paragraphs && aboutData.paragraphs.length > 0 ? (
            aboutData.paragraphs.map((p, i) => (
              <p key={i} className="about-text">
                {p}
              </p>
            ))
          ) : (
            <>
              <p className="about-text">
                With over a decade of experience capturing life&apos;s most precious moments,
                I believe that every photograph tells a story. My approach combines
                documentary authenticity with artistic vision, creating images that
                are both timeless and emotionally resonant.
              </p>
              <p className="about-text">
                From intimate weddings to grand celebrations, I seek to capture the
                genuine connections and fleeting moments that make your story uniquely yours.
                Photography is not just about preserving memories&mdash;it&apos;s about creating art
                that will be treasured for generations.
              </p>
            </>
          )}

          {/* About Stats */}
          <div className="about-stats">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
