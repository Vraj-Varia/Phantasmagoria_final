import React, { useState, useRef, useEffect } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';

function Contact() {

    const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    couple_name: "",
    wedding_details: "",
    contact: "",
    city: "",
    describe_wedding: "",
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
    alert("Thank you for your inquiry! I will get back to you soon.");
  };

  return (
    <>
    <Navigation
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />
    <section id="contact" className="contact" ref={sectionRef}>
      <br />
      <br />
      <div className="contact-container">

        {/* LEFT SIDE */}
        <div className={`contact-info ${isVisible ? "fade-in-left" : ""}`}>
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">Let's Create Something Beautiful</h2>
          <div className="section-divider"></div>

          <p className="contact-text">
            Ready to tell your story? I'd love to hear about your vision and
            discuss how we can create something extraordinary together.
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:hello@jaydabgar.com" className="contact-value">
                hello@jaydabgar.com
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <a href="tel:+1234567890" className="contact-value">
                +1 (234) 567-890
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Studio</span>
              <span className="contact-value">New York, NY</span>
            </div>
          </div>

          <div className="social-links">
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://pinterest.com" className="social-link" target="_blank" rel="noopener noreferrer">Pinterest</a>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          className={`contact-form ${isVisible ? "fade-in-right" : ""}`}
          onSubmit={handleSubmit}
        >
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
    <Footer />
    </>
  );
}

export default Contact;
