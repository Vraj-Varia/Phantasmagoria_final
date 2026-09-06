import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';



// About Section
function About({ scrollY }) {

    const [menuOpen, setMenuOpen] = useState(false);

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const parallaxOffset = scrollY * 0.1;

  return (
    <>
      <Navigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
      <section id="about" className="about" ref={sectionRef}>
        <br />
        <br />
        <div className="about-container">
          <div className={`about-image-wrapper ${isVisible ? 'fade-in-left' : ''}`}>
            <div
              className="about-image"
              style={{ transform: `translateY(${-parallaxOffset}px)` }}
            >
              <div className="about-image-placeholder">
                <div className="placeholder-content">
                  <span className="placeholder-text">Jay Dabgar</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`about-content ${isVisible ? 'fade-in-right' : ''}`}>
            <p className="about-label">The Photographer</p>
            <h2 className="about-title">Creating Fiction out of Reality</h2>
            <div className="about-divider"></div>
            <p className="about-text">
              With over a decade of experience capturing life's most precious moments,
              I believe that every photograph tells a story. My approach combines
              documentary authenticity with artistic vision, creating images that
              are both timeless and emotionally resonant.
            </p>
            <p className="about-text">
              From intimate weddings to grand celebrations, I seek to capture the
              genuine connections and fleeting moments that make your story uniquely yours.
              Photography is not just about preserving memories—it's about creating art
              that will be treasured for generations.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Weddings</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  );
}


export default About
