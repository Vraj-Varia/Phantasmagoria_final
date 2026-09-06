import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';



function Stories() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const stories = [
    {
      id: 1,
      slug: 'vijay-isha',
      couple: 'Vijay & Isha',
      location: 'Jaipur // India',
      date: 'December 2024',
      description: 'A royal celebration at the majestic Rambagh Palace',
      imageCount: 86
    },
    {
      id: 2,
      slug: 'emma-james',
      couple: 'Emma & James',
      location: 'Tuscany // Italy',
      date: 'September 2024',
      description: 'An intimate vineyard wedding under the Italian sun',
      imageCount: 45
    },
    {
      id: 3,
      slug: 'sofia-michael',
      couple: 'Sofia & Michael',
      location: 'Santorini // Greece',
      date: 'August 2024',
      description: 'Sunset vows overlooking the Aegean Sea',
      imageCount: 38
    }
  ];

  return (
    <>
      <Navigation
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <section id="stories" className="stories" ref={sectionRef}>
        <div className="stories-header">
          <p className="section-label">Love Stories</p>
          <h2 className="section-title">Real Weddings</h2>
          <div className="section-divider"></div>
        </div>

        <div className="stories-container">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`story-card ${isVisible ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Link to={`/event/${story.slug}`} className="story-cta">
                <div className="story-image">
                  <div className="story-placeholder">
                    <span>{story.couple}</span>
                  </div>
                </div>
                <div className="story-content">
                  <h3 className="story-couple">{story.couple}</h3>
                  <p className="story-location">{story.location}</p>
                  <p className="story-date">{story.date}</p>
                  <p className="story-description">{story.description}</p>
                  <p className="story-image-count">{story.imageCount}+ Photos</p>
                  {/* <Link to={`/event/${story.slug}`} className="story-cta">View Gallery →</Link> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Stories
