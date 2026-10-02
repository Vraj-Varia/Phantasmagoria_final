import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

function HeroPage() {
  const { heroPageData } = useContent();
  const navigate = useNavigate();
  const [transitionState, setTransitionState] = useState(null); // null | 'shutter' | 'soft-fade'

  const customBgStyle = heroPageData?.backgroundImage
    ? { backgroundImage: `url(${heroPageData.backgroundImage})` }
    : {};

  const tagline = heroPageData?.tagline || 'You Feel. I Focus. We Frame.';
  const buttonText = heroPageData?.buttonText || 'Enter';
  const buttonLink = heroPageData?.buttonLink || '/home';
  const isAnimationEnabled = heroPageData?.enableEnterAnimation !== false;

  const handleEnterClick = (e) => {
    e.preventDefault();
    if (transitionState) return;

    if (isAnimationEnabled) {
      setTransitionState('shutter');
      // After shutter closes completely (750ms), navigate to /home with shutterTransition state
      setTimeout(() => {
        navigate(buttonLink, { state: { shutterTransition: true } });
      }, 750);
    } else {
      setTransitionState('soft-fade');
      // Gentle, calm soft dissolve (750ms) into /home with smoothFade state
      setTimeout(() => {
        navigate(buttonLink, { state: { smoothFade: true } });
      }, 750);
    }
  };

  const isExiting = transitionState === 'shutter';
  const isSoftFading = transitionState === 'soft-fade';

  return (
    <section
      id="hero"
      className={`hero ${isExiting ? 'hero-exiting' : ''} ${isSoftFading ? 'hero-soft-fading' : ''}`}
    >
      <div className="hero-background" style={customBgStyle}></div>
      <div className="hero-overlay"></div>

      {/* Cinematic Camera Shutter / Curtain Reveal - active when animation enabled */}
      {isAnimationEnabled && (
        <>
          <div className="hero-shutter-curtain hero-shutter-top" aria-hidden="true"></div>
          <div className="hero-shutter-curtain hero-shutter-bottom" aria-hidden="true"></div>
          <div className="hero-flash-overlay" aria-hidden="true"></div>
        </>
      )}

      <div className="hero-content">
        <p className="hero-tagline">{tagline}</p>
        <div className="hero-cta">
          <button
            onClick={handleEnterClick}
            className={`btn-secondary hero-enter-btn ${transitionState ? 'clicked' : ''}`}
            aria-label={buttonText}
          >
            <span className="enter-text">{buttonText}</span>
            <span className="enter-shimmer" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroPage;
