/**
 * Initial Seed Data for Phantasmagoria
 * This serves as the default state for stories, images, services, and photographer bio.
 * All data is dynamically managed via ContentContext and can be edited in the Admin dashboard.
 */

import slide1 from '../assets/slider/slide_1.jpg';
import slide2 from '../assets/slider/slide_2.jpg';
import slide3 from '../assets/slider/slide_3.jpg';
import slide4 from '../assets/slider/slide_4.jpg';
import slide5 from '../assets/slider/slide_5.jpg';

export const INITIAL_HERO_SLIDES = [
  {
    id: 'slide-1',
    url: slide1,
    title: 'Motion in Grace',
    subtitle: 'Udaipur // India'
  },
  {
    id: 'slide-2',
    url: slide2,
    title: 'Timeless Monochrome',
    subtitle: 'Jaipur // India'
  },
  {
    id: 'slide-3',
    url: slide3,
    title: 'The Royal Courtyard',
    subtitle: 'Rambagh Palace'
  },
  {
    id: 'slide-4',
    url: slide4,
    title: 'Golden Twilight Glow',
    subtitle: 'Jodhpur // India'
  },
  {
    id: 'slide-5',
    url: slide5,
    title: 'The Regal Twirl',
    subtitle: 'City Palace'
  }
];

export const INITIAL_STORIES = [
  {
    id: 'vijay-isha',
    slug: 'vijay-isha',
    couple: 'Vijay & Isha',
    location: 'Jaipur // India',
    date: 'December 2024',
    venue: 'Rambagh Palace, Jaipur',
    photographer: 'Jay Dabgar',
    duration: '3 Days',
    guests: '350+',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'A royal celebration at the majestic Rambagh Palace blending regal heritage with intimate romantic moments.',
    images: [
      {
        id: 'vi-1',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        alt: 'Vijay & Isha - Grand Royal Entrance',
        category: 'ceremony',
        size: 'large',
        title: 'Grand Entrance Under the Palace Chandeliers'
      },
      {
        id: 'vi-2',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Intimate Portrait in Palace Courtyard',
        category: 'portraits',
        size: 'medium',
        title: 'Courtyard Silhouette'
      },
      {
        id: 'vi-3',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
        alt: 'Vijay & Isha - Traditional Vows',
        category: 'ceremony',
        size: 'small',
        title: 'The Sacred Vows'
      },
      {
        id: 'vi-4',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Delicate Jewelry and Henna Details',
        category: 'details',
        size: 'medium',
        title: 'Heirloom Jewels & Mehndi'
      },
      {
        id: 'vi-5',
        url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
        alt: 'Vijay & Isha - Joyful Sangeet Dance Candid',
        category: 'candid',
        size: 'large',
        title: 'Laughter during the Sangeet'
      },
      {
        id: 'vi-6',
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Evening Reception Under Fairy Lights',
        category: 'reception',
        size: 'medium',
        title: 'Reception Under the Stars'
      },
      {
        id: 'vi-7',
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        alt: 'Vijay & Isha - Royal Floral Mandap Architecture',
        category: 'details',
        size: 'large',
        title: 'The Floral Mandap'
      },
      {
        id: 'vi-8',
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Golden Hour Sunset Portraits',
        category: 'portraits',
        size: 'medium',
        title: 'Golden Palace Glow'
      },
      {
        id: 'vi-9',
        url: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
        alt: 'Vijay & Isha - Joyful Baraat Procession',
        category: 'candid',
        size: 'small',
        title: 'Baraat Celebration'
      },
      {
        id: 'vi-10',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Royal Rings and Garland Exchange',
        category: 'ceremony',
        size: 'medium',
        title: 'Exchange of Garlands'
      },
      {
        id: 'vi-11',
        url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=80',
        alt: 'Vijay & Isha - Sunset Courtyard Dance',
        category: 'reception',
        size: 'medium',
        title: 'First Dance as One'
      },
      {
        id: 'vi-12',
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
        alt: 'Vijay & Isha - Fireworks over the Palace',
        category: 'candid',
        size: 'large',
        title: 'Palace Fireworks Finale'
      }
    ]
  },
  {
    id: 'emma-james',
    slug: 'emma-james',
    couple: 'Emma & James',
    location: 'Tuscany // Italy',
    date: 'September 2024',
    venue: 'Castello di Vicarello, Tuscany',
    photographer: 'Jay Dabgar',
    duration: '2 Days',
    guests: '120',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    description: 'An intimate vineyard wedding under the golden Tuscan sun, filled with warmth, wine, and laughter.',
    images: [
      {
        id: 'ej-1',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        alt: 'Emma & James - Tuscan Vineyard Vows',
        category: 'ceremony',
        size: 'large',
        title: 'Vows Among the Olive Groves'
      },
      {
        id: 'ej-2',
        url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1000&q=80',
        alt: 'Emma & James - Sunset Kiss',
        category: 'portraits',
        size: 'medium',
        title: 'Golden Hour Embrace'
      },
      {
        id: 'ej-3',
        url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80',
        alt: 'Emma & James - Rustic Table Details',
        category: 'details',
        size: 'small',
        title: 'Tuscan Table Setting'
      },
      {
        id: 'ej-4',
        url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80',
        alt: 'Emma & James - Twilight Toast',
        category: 'reception',
        size: 'medium',
        title: 'Candlelight Dinner'
      }
    ]
  },
  {
    id: 'sofia-michael',
    slug: 'sofia-michael',
    couple: 'Sofia & Michael',
    location: 'Santorini // Greece',
    date: 'August 2024',
    venue: 'Canaves Oia, Santorini',
    photographer: 'Jay Dabgar',
    duration: '1 Day',
    guests: '80',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'Sunset vows overlooking the Aegean Sea, captured with editorial precision and Mediterranean romance.',
    images: [
      {
        id: 'sm-1',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        alt: 'Sofia & Michael - Aegean Clifftop Portrait',
        category: 'portraits',
        size: 'large',
        title: 'Caldera Horizon'
      },
      {
        id: 'sm-2',
        url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=80',
        alt: 'Sofia & Michael - White Architecture Walk',
        category: 'ceremony',
        size: 'medium',
        title: 'White Domes & Blue Seas'
      },
      {
        id: 'sm-3',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
        alt: 'Sofia & Michael - Floral Rings',
        category: 'details',
        size: 'small',
        title: 'Custom Diamond Bands'
      }
    ]
  }
];

export const INITIAL_ABOUT = {
  name: 'Jay Dabgar',
  label: 'The Photographer',
  tagline: 'Creating Fiction out of Reality',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  paragraphs: [
    "With over a decade of experience capturing life's most precious moments, I believe that every photograph tells a story. My approach combines documentary authenticity with artistic vision, creating images that are both timeless and emotionally resonant.",
    "From intimate destination weddings to grand royal celebrations, I seek to capture the genuine connections and fleeting moments that make your story uniquely yours. Photography is not just about preserving memories—it's about creating art that will be treasured for generations."
  ],
  stats: [
    { number: '500+', label: 'Weddings' },
    { number: '10+', label: 'Years' },
    { number: '50+', label: 'Awards' }
  ]
};

export const INITIAL_SERVICES = [
  {
    id: 'wedding-photography',
    title: 'Wedding Photography',
    subtitle: 'Complete Coverage',
    description: 'From intimate morning preparations to the grand celebration, every emotion and fleeting glance captured with fine art precision.',
    features: ['Full Day Coverage', 'Second Shooter Available', 'Online Private Gallery', 'Handcrafted Fine Art Album'],
    price: 'Starting at $5,000 / ₹3,50,000',
    popular: true
  },
  {
    id: 'engagement-sessions',
    title: 'Engagement & Pre-Wedding',
    subtitle: 'Pre-Wedding Love Story',
    description: 'Celebrate your romance with a personalized pre-wedding destination session. Perfect for save-the-dates and editorial keepsakes.',
    features: ['Half-Day Session', 'Multiple Curated Locations', '50+ High-Resolution Edited Photos', 'Styling Consultation'],
    price: 'Starting at $1,500 / ₹1,00,000',
    popular: false
  },
  {
    id: 'portrait-photography',
    title: 'Fine Art Portraits',
    subtitle: 'Timeless Portraits',
    description: 'Individual, bridal, and editorial portraits capturing authentic personality in natural light or tailored studio setups.',
    features: ['Studio or On-Location', 'Wardrobe Changes', 'Master Retouching', 'Museum-Grade Print Rights'],
    price: 'Starting at $800 / ₹50,000',
    popular: false
  },
  {
    id: 'destination-coverage',
    title: 'Destination Celebrations',
    subtitle: 'Global Coverage',
    description: 'Specialized international wedding documentation across Europe, the Middle East, and Asia with complete travel coordination.',
    features: ['Multi-Day Coverage', 'Drone Aerials', 'Same-Day Preview Cuts', 'High-Res Digital Masters'],
    price: 'Custom Bespoke Quote',
    popular: false
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-1',
    coupleName: 'Aarav & Meera',
    email: 'aarav.meera@example.com',
    phone: '+91 98765 43210',
    weddingDetails: '3-Day Destination Wedding in Udaipur',
    city: 'Udaipur, Rajasthan',
    message: 'We are planning a palace wedding for next February and fell in love with your royal Jaipur story! We would love to check your availability.',
    date: '2026-09-28',
    status: 'new'
  }
];

export const INITIAL_HERO_PAGE = {
  backgroundImage: '',
  tagline: 'You Feel. I Focus. We Frame.',
  buttonText: 'Enter',
  buttonLink: '/home',
  enableEnterAnimation: true
};

export const INITIAL_HOME_PAGE = {
  storiesLabel: 'Love Stories',
  storiesTitle: 'Real Stories',
  gridSliderSubtitle: '',
  gridSliderTitle: ''
};

export const INITIAL_STORIES_PAGE = {
  title: 'Stories',
  subtitle: 'Editorial Journal'
};

export const INITIAL_CONTACT = {
  label: 'Get in Touch',
  title: "Let's Create Something Beautiful",
  description: "Ready to tell your story? I'd love to hear about your vision and discuss how we can create something extraordinary together.",
  email: 'hello@jaydabgar.com',
  phone: '+1 (234) 567-890',
  studio: 'New York, NY',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  pinterest: 'https://pinterest.com'
};

export const INITIAL_HEADER_SETTINGS = {
  logoText: 'Phantasmagoria.in',
  logoImage: ''
};

export const INITIAL_FOOTER_SETTINGS = {
  logoText: 'phantasmagoria',
  tagline: 'Capturing moments, creating memories',
  copyrightText: 'Jay Dabgar Photography. All rights reserved.',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  pinterest: 'https://pinterest.com'
};

export const INITIAL_COLLAGE_SLIDES = [
  {
    id: 'grid-slide-1',
    image: '/grid_slides/grid_slide_default.jpg'
  },
  {
    id: 'grid-slide-2',
    image: '/grid_slides/grid_slide_default.jpg'
  },
  {
    id: 'grid-slide-3',
    image: '/grid_slides/grid_slide_default.jpg'
  },
  {
    id: 'grid-slide-4',
    image: '/grid_slides/grid_slide_default.jpg'
  },
  {
    id: 'grid-slide-5',
    image: '/grid_slides/grid_slide_default.jpg'
  }
];


