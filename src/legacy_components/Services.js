import React, { useEffect, useState, useRef } from 'react';


// Services Section with Parallax
function Services() {
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

  const services = [
    {
      title: 'Wedding Photography',
      subtitle: 'Complete Coverage',
      description: 'From the intimate preparation moments to the grand celebration, I capture every emotion, every detail, and every fleeting glance that makes your day uniquely yours.',
      features: ['Full Day Coverage', 'Second Shooter Available', 'Online Gallery', 'Premium Album'],
      price: 'Starting at $5,000',
      popular: true
    },
    {
      title: 'Engagement Sessions',
      subtitle: 'Pre-Wedding Love Story',
      description: 'Celebrate your love story with a personalized engagement session. Perfect for save-the-dates and getting comfortable in front of the camera before the big day.',
      features: ['2 Hour Session', 'Multiple Locations', '50+ Edited Photos', 'Digital Delivery'],
      price: 'Starting at $1,500',
      popular: false
    },
    {
      title: 'Portrait Photography',
      subtitle: 'Timeless Portraits',
      description: 'Individual and family portraits that capture your authentic self. Studio or on-location sessions tailored to your vision and style.',
      features: ['Studio or Location', 'Wardrobe Changes', 'Professional Editing', 'Print Options'],
      price: 'Starting at $800',
      popular: false
    },
    {
      title: 'Event Coverage',
      subtitle: 'Corporate & Private Events',
      description: 'Professional event photography with quick turnaround. From corporate gatherings to milestone celebrations, I document every important moment.',
      features: ['4+ Hours Coverage', 'Same-Day Previews', 'Quick Turnaround', 'Usage Rights'],
      price: 'Starting at $2,000',
      popular: false
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We discuss your vision, preferences, and create a custom photography plan tailored to your needs.'
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Detailed timeline creation, location scouting, and coordination to ensure nothing is missed.'
    },
    {
      number: '03',
      title: 'The Day',
      description: 'Relaxed, professional coverage that captures authentic moments while you enjoy your celebration.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Carefully edited images delivered in a beautiful online gallery within 4-6 weeks.'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <p className="services-hero-label">Services</p>
          <h1 className="services-hero-title">Investment</h1>
          <p className="services-hero-subtitle">
            Photography is more than just images—it is the art of preserving your most precious moments
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="services-section" ref={sectionRef}>
        <div className="section-header">
          <p className="section-label">What I Offer</p>
          <h2 className="section-title">Collections</h2>
          <div className="section-divider"></div>
        </div>

        <div className="services-grid-modern">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card-modern ${service.popular ? 'popular' : ''} ${isVisible ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {service.popular && (
                <div className="service-badge">Most Popular</div>
              )}
              <div className="service-card-header">
                <span className="service-card-subtitle">{service.subtitle}</span>
                <h3 className="service-card-title">{service.title}</h3>
              </div>
              <p className="service-card-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i} className="service-feature">
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="service-card-footer">
                <span className="service-price">{service.price}</span>
                <a href="/contact" className="service-cta">Inquire Now</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="services-process">
        <div className="section-header light">
          <p className="section-label">How It Works</p>
          <h2 className="section-title">The Experience</h2>
          <div className="section-divider"></div>
        </div>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`process-step ${isVisible ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              <span className="process-number">{step.number}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="services-testimonial">
        <div className="testimonial-content">
          <span className="testimonial-quote">"</span>
          <p className="testimonial-text">
            Jay did not just capture our wedding—he captured the essence of our love story.
            Every image is a work of art that brings tears to our eyes.
          </p>
          <p className="testimonial-author">— Priya & Rahul</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="services-faq">
        <div className="section-header">
          <p className="section-label">Questions</p>
          <h2 className="section-title">Frequently Asked</h2>
          <div className="section-divider"></div>
        </div>

        <div className="faq-grid">
          <div className="faq-item">
            <h4 className="faq-question">How far in advance should we book?</h4>
            <p className="faq-answer">
              I recommend booking 9-12 months in advance for weddings, especially during peak season (May-October).
              For other sessions, 4-6 weeks notice is typically sufficient.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">Do you travel for destination weddings?</h4>
            <p className="faq-answer">
              Absolutely! I love destination weddings and have photographed celebrations across Europe, Asia, and the Caribbean.
              Travel fees are customized based on location.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">What is your photography style?</h4>
            <p className="faq-answer">
              My style is best described as timeless documentary with an editorial touch.
              I focus on authentic emotions while creating beautifully composed, artful images.
            </p>
          </div>
          <div className="faq-item">
            <h4 className="faq-question">How long until we receive our photos?</h4>
            <p className="faq-answer">
              Wedding galleries are delivered within 4-6 weeks. Engagement and portrait sessions
              are typically ready within 2-3 weeks. Rush delivery is available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Begin?</h2>
          <p className="cta-text">
            Let us create something beautiful together. I would love to hear about your vision.
          </p>
          <a href="/contact" className="btn-primary">Get in Touch</a>
        </div>
      </section>


    </div>
  );
}

export default Services;
