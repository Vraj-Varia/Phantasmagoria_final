import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_STORIES,
  INITIAL_HERO_SLIDES,
  INITIAL_ABOUT,
  INITIAL_SERVICES,
  INITIAL_INQUIRIES,
  INITIAL_HERO_PAGE,
  INITIAL_HOME_PAGE,
  INITIAL_STORIES_PAGE,
  INITIAL_CONTACT,
  INITIAL_HEADER_SETTINGS,
  INITIAL_FOOTER_SETTINGS
} from '../data/initialData';

const ContentContext = createContext(null);

const STORAGE_KEYS = {
  STORIES: 'phantasmagoria_stories_v1',
  HERO_SLIDES: 'phantasmagoria_hero_slides_v1',
  ABOUT: 'phantasmagoria_about_v1',
  SERVICES: 'phantasmagoria_services_v1',
  INQUIRIES: 'phantasmagoria_inquiries_v1',
  HERO_PAGE: 'phantasmagoria_hero_page_v1',
  HOME_PAGE: 'phantasmagoria_home_page_v1',
  STORIES_PAGE: 'phantasmagoria_stories_page_v1',
  CONTACT: 'phantasmagoria_contact_v1',
  HEADER_SETTINGS: 'phantasmagoria_header_v1',
  FOOTER_SETTINGS: 'phantasmagoria_footer_v1'
};

export const ContentProvider = ({ children }) => {
  // Load from localStorage or fallback to initial seed
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch (e) {
      console.error('Error loading stories from localStorage:', e);
      return INITIAL_STORIES;
    }
  });

  const [heroSlides, setHeroSlides] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
      return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
    } catch (e) {
      console.error('Error loading hero slides from localStorage:', e);
      return INITIAL_HERO_SLIDES;
    }
  });

  const [aboutData, setAboutData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
      return saved ? JSON.parse(saved) : INITIAL_ABOUT;
    } catch (e) {
      console.error('Error loading about data from localStorage:', e);
      return INITIAL_ABOUT;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch (e) {
      console.error('Error loading services from localStorage:', e);
      return INITIAL_SERVICES;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch (e) {
      console.error('Error loading inquiries from localStorage:', e);
      return INITIAL_INQUIRIES;
    }
  });

  const [heroPageData, setHeroPageData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_PAGE);
      return saved ? JSON.parse(saved) : INITIAL_HERO_PAGE;
    } catch (e) {
      console.error('Error loading hero page data from localStorage:', e);
      return INITIAL_HERO_PAGE;
    }
  });

  const [homePageData, setHomePageData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HOME_PAGE);
      return saved ? JSON.parse(saved) : INITIAL_HOME_PAGE;
    } catch (e) {
      console.error('Error loading home page data from localStorage:', e);
      return INITIAL_HOME_PAGE;
    }
  });

  const [storiesPageData, setStoriesPageData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES_PAGE);
      return saved ? JSON.parse(saved) : INITIAL_STORIES_PAGE;
    } catch (e) {
      console.error('Error loading stories page data from localStorage:', e);
      return INITIAL_STORIES_PAGE;
    }
  });

  const [contactData, setContactData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACT);
      return saved ? JSON.parse(saved) : INITIAL_CONTACT;
    } catch (e) {
      console.error('Error loading contact data from localStorage:', e);
      return INITIAL_CONTACT;
    }
  });

  const [headerSettings, setHeaderSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HEADER_SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_HEADER_SETTINGS;
    } catch (e) {
      console.error('Error loading header settings from localStorage:', e);
      return INITIAL_HEADER_SETTINGS;
    }
  });

  const [footerSettings, setFooterSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOOTER_SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_FOOTER_SETTINGS;
    } catch (e) {
      console.error('Error loading footer settings from localStorage:', e);
      return INITIAL_FOOTER_SETTINGS;
    }
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('Error saving stories to localStorage:', e);
    }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(heroSlides));
    } catch (e) {
      console.error('Error saving hero slides to localStorage:', e);
    }
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutData));
    } catch (e) {
      console.error('Error saving about data to localStorage:', e);
    }
  }, [aboutData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error('Error saving services to localStorage:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Error saving inquiries to localStorage:', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HERO_PAGE, JSON.stringify(heroPageData));
    } catch (e) {
      console.error('Error saving hero page data to localStorage:', e);
    }
  }, [heroPageData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOME_PAGE, JSON.stringify(homePageData));
    } catch (e) {
      console.error('Error saving home page data to localStorage:', e);
    }
  }, [homePageData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES_PAGE, JSON.stringify(storiesPageData));
    } catch (e) {
      console.error('Error saving stories page data to localStorage:', e);
    }
  }, [storiesPageData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(contactData));
    } catch (e) {
      console.error('Error saving contact data to localStorage:', e);
    }
  }, [contactData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HEADER_SETTINGS, JSON.stringify(headerSettings));
    } catch (e) {
      console.error('Error saving header settings to localStorage:', e);
    }
  }, [headerSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FOOTER_SETTINGS, JSON.stringify(footerSettings));
    } catch (e) {
      console.error('Error saving footer settings to localStorage:', e);
    }
  }, [footerSettings]);

  // Story CRUD operations
  const addStory = (newStory) => {
    const slug = newStory.slug || newStory.couple.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = newStory.id || slug || `story-${Date.now()}`;
    const formatted = {
      ...newStory,
      id,
      slug,
      images: newStory.images || []
    };
    setStories(prev => [formatted, ...prev]);
    return formatted;
  };

  const updateStory = (storyId, updatedFields) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId || story.slug === storyId) {
        return { ...story, ...updatedFields };
      }
      return story;
    }));
  };

  const deleteStory = (storyId) => {
    setStories(prev => prev.filter(story => story.id !== storyId && story.slug !== storyId));
  };

  // Image operations inside a Story
  const addImageToStory = (storyId, imageData) => {
    const newImage = {
      id: imageData.id || `img-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url: imageData.url,
      alt: imageData.alt || 'Wedding gallery photograph',
      category: imageData.category || 'ceremony',
      size: imageData.size || 'medium',
      title: imageData.title || ''
    };

    setStories(prev => prev.map(story => {
      if (story.id === storyId || story.slug === storyId) {
        return {
          ...story,
          images: [...(story.images || []), newImage]
        };
      }
      return story;
    }));
  };

  const bulkAddImagesToStory = (storyId, imageUrls, category = 'ceremony') => {
    const newImages = imageUrls.map((url, index) => ({
      id: `img-${Date.now()}-${index}`,
      url: url.trim(),
      alt: `Wedding photograph ${index + 1}`,
      category,
      size: index % 5 === 0 ? 'large' : index % 3 === 0 ? 'medium' : 'small',
      title: `Moment ${index + 1}`
    }));

    setStories(prev => prev.map(story => {
      if (story.id === storyId || story.slug === storyId) {
        return {
          ...story,
          images: [...(story.images || []), ...newImages]
        };
      }
      return story;
    }));
  };

  const deleteImageFromStory = (storyId, imageId) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId || story.slug === storyId) {
        return {
          ...story,
          images: (story.images || []).filter(img => img.id !== imageId)
        };
      }
      return story;
    }));
  };

  // Hero Slides
  const addHeroSlide = (slideData) => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      url: slideData.url,
      title: slideData.title || '',
      subtitle: slideData.subtitle || ''
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const deleteHeroSlide = (slideId) => {
    setHeroSlides(prev => prev.filter(slide => slide.id !== slideId));
  };

  // Inquiries
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const deleteInquiry = (inquiryId) => {
    setInquiries(prev => prev.filter(inq => inq.id !== inquiryId));
  };

  const markInquiryRead = (inquiryId) => {
    setInquiries(prev => prev.map(inq =>
      inq.id === inquiryId ? { ...inq, status: 'read' } : inq
    ));
  };

  // Reset to initial seed state
  const resetToInitialData = () => {
    if (window.confirm('Reset all stories, images, and content to initial defaults? Any custom added content will be reset.')) {
      setStories(INITIAL_STORIES);
      setHeroSlides(INITIAL_HERO_SLIDES);
      setAboutData(INITIAL_ABOUT);
      setHeroPageData(INITIAL_HERO_PAGE);
      setHomePageData(INITIAL_HOME_PAGE);
      setStoriesPageData(INITIAL_STORIES_PAGE);
      setContactData(INITIAL_CONTACT);
      setServices(INITIAL_SERVICES);
      setInquiries(INITIAL_INQUIRIES);
      setHeaderSettings(INITIAL_HEADER_SETTINGS);
      setFooterSettings(INITIAL_FOOTER_SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.STORIES);
      localStorage.removeItem(STORAGE_KEYS.HERO_SLIDES);
      localStorage.removeItem(STORAGE_KEYS.ABOUT);
      localStorage.removeItem(STORAGE_KEYS.HERO_PAGE);
      localStorage.removeItem(STORAGE_KEYS.HOME_PAGE);
      localStorage.removeItem(STORAGE_KEYS.STORIES_PAGE);
      localStorage.removeItem(STORAGE_KEYS.CONTACT);
      localStorage.removeItem(STORAGE_KEYS.SERVICES);
      localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.HEADER_SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.FOOTER_SETTINGS);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        stories,
        addStory,
        updateStory,
        deleteStory,
        addImageToStory,
        bulkAddImagesToStory,
        deleteImageFromStory,
        heroSlides,
        addHeroSlide,
        deleteHeroSlide,
        aboutData,
        setAboutData,
        heroPageData,
        setHeroPageData,
        homePageData,
        setHomePageData,
        storiesPageData,
        setStoriesPageData,
        contactData,
        setContactData,
        services,
        setServices,
        inquiries,
        addInquiry,
        deleteInquiry,
        markInquiryRead,
        headerSettings,
        setHeaderSettings,
        footerSettings,
        setFooterSettings,
        resetToInitialData
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
