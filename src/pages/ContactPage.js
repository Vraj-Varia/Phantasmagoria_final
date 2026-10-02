import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

function ContactPage() {
  const { addInquiry, contactData } = useContent();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    couple_name: '',
    wedding_details: '',
    contact: '',
    city: '',
    describe_wedding: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addInquiry) {
      addInquiry({
        name: formData.couple_name,
        email: formData.wedding_details.includes('@') ? formData.wedding_details : '',
        phone: formData.contact,
        city: formData.city,
        weddingDate: formData.wedding_details,
        message: formData.describe_wedding
      });
    }

    setSubmitted(true);
    alert('Thank you for your inquiry! I will get back to you soon.');
    setFormData({
      couple_name: '',
      wedding_details: '',
      contact: '',
      city: '',
      describe_wedding: ''
    });
  };

  const email = contactData?.email || 'hello@jaydabgar.com';
  const phone = contactData?.phone || '+1 (234) 567-890';
  const studio = contactData?.studio || 'New York, NY';
  const label = contactData?.label || 'Get in Touch';
  const title = contactData?.title || "Let's Create Something Beautiful";
  const desc = contactData?.description || "Ready to tell your story? I'd love to hear about your vision and discuss how we can create something extraordinary together.";
  const instagram = contactData?.instagram || 'https://instagram.com';
  const facebook = contactData?.facebook || 'https://facebook.com';
  const pinterest = contactData?.pinterest || 'https://pinterest.com';

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-container">
        {/* LEFT SIDE: Contact Information */}
        <div className={`contact-info ${isVisible ? 'fade-in-left' : ''}`}>
          <p className="section-label">{label}</p>
          <h2 className="section-title">{title}</h2>
          <div className="section-divider"></div>

          <p className="contact-text">
            {desc}
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href={`mailto:${email}`} className="contact-value">
                {email}
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <a href={`tel:${phone}`} className="contact-value">
                {phone}
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Studio</span>
              <span className="contact-value">{studio}</span>
            </div>
          </div>

          <div className="social-links">
            {instagram && <a href={instagram} className="social-link" target="_blank" rel="noopener noreferrer">Instagram</a>}
            {facebook && <a href={facebook} className="social-link" target="_blank" rel="noopener noreferrer">Facebook</a>}
            {pinterest && <a href={pinterest} className="social-link" target="_blank" rel="noopener noreferrer">Pinterest</a>}
          </div>
        </div>

        {/* RIGHT SIDE: Contact Form */}
        <form
          className={`contact-form ${isVisible ? 'fade-in-right' : ''}`}
          onSubmit={handleSubmit}
        >
          {submitted && (
            <div className="form-success-banner" style={{ marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
              Thank you for your inquiry! We will reach out shortly.
            </div>
          )}

          <div className="form-group">
            <label>Couple Name</label>
            <input
              type="text"
              value={formData.couple_name}
              onChange={(e) =>
                setFormData({ ...formData, couple_name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Wedding Details</label>
            <input
              type="text"
              value={formData.wedding_details}
              onChange={(e) =>
                setFormData({ ...formData, wedding_details: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="number"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Wedding Location</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Describe Your Wedding</label>
            <textarea
              rows="5"
              value={formData.describe_wedding}
              onChange={(e) =>
                setFormData({ ...formData, describe_wedding: e.target.value })
              }
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
