import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page" style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <p className="section-label" style={{ letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
        404 &mdash; Page Not Found
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        fontWeight: '300',
        margin: '1rem 0'
      }}>
        Lost in the Shadows
      </h1>
      <p style={{
        maxWidth: '500px',
        color: 'var(--color-gray-medium)',
        marginBottom: '2rem'
      }}>
        The page or moment you are seeking might have been moved or does not exist in our archive.
      </p>
      <Link to="/home" className="btn-primary">
        Return to Home Gallery
      </Link>
    </section>
  );
}

export default NotFoundPage;
