import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import CloudinaryImage from '../components/common/CloudinaryImage';

function StoriesPage() {
  const { stories, storiesPageData } = useContent();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="stories" className="stories-journal-page" ref={sectionRef}>
      {/* Editorial Page Header */}
      <div className="stories-journal-header">
        <h1 className="stories-journal-main-title">{storiesPageData?.title || 'Stories'}</h1>
        <div className="stories-journal-divider"></div>
      </div>

      {/* Stories Editorial Journal Feed */}
      <div className="stories-article-list">
        {stories.map((story, index) => {
          const cover =
            story.coverImage ||
            (story.images && story.images[0] && (story.images[0].url || story.images[0].src)) ||
            '';

          // Format title and location like Naman Verma: "COUPLE NAME | LOCATION"
          const locationClean = story.location
            ? story.location.replace(/\s*\/\/\s*/g, ', ').trim().toUpperCase()
            : '';
          const displayTitle = locationClean
            ? `${story.couple.toUpperCase()} | ${locationClean}`
            : story.couple.toUpperCase();

          return (
            <article
              key={story.id || story.slug || index}
              className={`story-journal-article ${isVisible ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 1. Cinematic Featured Hero Image */}
              <div className="story-journal-image-block">
                <Link to={`/event/${story.slug}`} className="story-journal-image-link" aria-label={`View story of ${displayTitle}`}>
                  <div className="story-journal-image-frame">
                    <CloudinaryImage
                      src={cover}
                      alt={displayTitle}
                      className="story-journal-img"
                      width={1600}
                      quality="auto:best"
                      priority={index === 0}
                    />
                    <div className="story-journal-hover-overlay">
                      <span className="story-journal-view-btn">View Story &rarr;</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* 2. Editorial Entry Header */}
              <header className="story-journal-entry-header">
                <h2 className="story-journal-entry-title">
                  <Link to={`/event/${story.slug}`}>{displayTitle}</Link>
                </h2>
                <div className="story-journal-meta">
                  <span className="story-journal-date">{story.date}</span>
                </div>
              </header>

              {/* 3. Post Body Excerpt & Read More */}
              <div className="story-journal-body">
                <p className="story-journal-excerpt">{story.description}</p>
                <Link to={`/event/${story.slug}`} className="story-journal-read-more">
                  Read More
                </Link>
              </div>

              {/* 4. Post Divider */}
              <div className="story-journal-post-divider"></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default StoriesPage;
