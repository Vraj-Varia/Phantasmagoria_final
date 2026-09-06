import React, { useEffect, useRef, useState } from 'react';

import ImageSlider from "./ImageSlider";
// import image1 from '../assets/1_slider.jpg';
import image2 from '../assets/2_slider.jpg';
import image3 from '../assets/3_slider.jpg';
import image4 from '../assets/4_slider.jpg';
import image5 from '../assets/5_slider.jpg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

import realimage1 from '../assets/real1.jpg';
import Footer from './Footer';


// Portfolio Section with Parallax Grid
function Portfolio({ scrollY }) {



  const projectImages = [
    realimage1,
    image2,
    image3,
    image4,
    image5
  ];

  // const storiesImages = [
  //   realimage1,
  //   image2,
  //   image3
  // ]


  // const sectionRef = useRef(null);
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

      <section id="portfolio" className="portfolio" ref={sectionRef}>
        <ImageSlider images={projectImages} />
      </section>

      <section
        id="stories-copy"
        className="stories-copy"
        ref={sectionRef}
      >
        <div className="stories-header-copy">
          <p className="section-label">Love Stories</p>
          <h2 className="section-title">Real Stories</h2>
          <div className="section-divider"></div>
        </div>

        <div
          className="stories-container-copy"
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className={`story-card-copy ${isVisible ? "fade-in-up" : ""
                }`}
            >
              <Link
                to={`/event/${story.slug}`}
                className="story-cta-copy"
              >
                <div
                  className="story-image-copy"
                  style={{
                    backgroundImage: `url(${projectImages[index % projectImages.length]
                      })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />

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
                    {story.imageCount}+ Photos
                  </p>
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

// function PortfolioItem({ item, index, scrollY, isVisible }) {
//   const itemRef = useRef(null);
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     if (itemRef.current) {
//       const rect = itemRef.current.getBoundingClientRect();
//       setItemOffset(rect.top + window.scrollY);
//     }
//   }, []);

//   const parallaxSpeed = 0.05 + (index % 3) * 0.02;
//   const parallaxY = (scrollY - itemOffset) * parallaxSpeed;

//   return (
//     <div
//       ref={itemRef}
//       className={`portfolio-item ${item.size} ${isVisible ? 'fade-in-up' : ''}`}
//       style={{ animationDelay: `${index * 0.1}s` }}
//     >
//       <div className="portfolio-image-wrapper">
//         <div
//           className="portfolio-image"
//           style={{ transform: `translateY(${parallaxY}px) scale(1.1)` }}
//         >
//           <div className="portfolio-placeholder">
//             <span>{item.title}</span>
//           </div>
//         </div>
//         <div className="portfolio-overlay">
//           <span className="portfolio-category">{item.category}</span>
//           <h3 className="portfolio-item-title">{item.title}</h3>
//           <button className="portfolio-view">View Gallery</button>
//         </div>
//       </div>
//     </div>
//   );
// }

export default Portfolio
