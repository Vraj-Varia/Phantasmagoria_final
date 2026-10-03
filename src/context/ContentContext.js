import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
  INITIAL_FOOTER_SETTINGS,
  INITIAL_COLLAGE_SLIDES
} from '../data/initialData';

const ContentContext = createContext(null);

const STORAGE_KEYS = {
  STORIES: 'phantasmagoria_stories_v1',
  HERO_SLIDES: 'phantasmagoria_hero_slides_v2',
  ABOUT: 'phantasmagoria_about_v1',
  SERVICES: 'phantasmagoria_services_v1',
  INQUIRIES: 'phantasmagoria_inquiries_v1',
  HERO_PAGE: 'phantasmagoria_hero_page_v1',
  HOME_PAGE: 'phantasmagoria_home_page_v1',
  STORIES_PAGE: 'phantasmagoria_stories_page_v1',
  CONTACT: 'phantasmagoria_contact_v1',
  HEADER_SETTINGS: 'phantasmagoria_header_v1',
  FOOTER_SETTINGS: 'phantasmagoria_footer_v1',
  COLLAGE_SLIDES: 'phantasmagoria_collage_slides_v4'
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

  const [collageSlides, setCollageSlides] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COLLAGE_SLIDES);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(s => ({
            ...s,
            image: s.image || s.url || '/grid_slides/grid_slide_default.jpg'
          }));
        }
      }
      return INITIAL_COLLAGE_SLIDES;
    } catch (e) {
      console.error('Error loading collage slides from localStorage:', e);
      return INITIAL_COLLAGE_SLIDES;
    }
  });

  const [isConfigLoaded, setIsConfigLoaded] = useState(false);

  // Load latest site_settings.json on initial app mount so ALL visitors see current settings
  useEffect(() => {
    let isMounted = true;
    const loadSiteSettings = async () => {
      try {
        const response = await fetch(`/site_settings.json?t=${Date.now()}`);
        if (response.ok) {
          const config = await response.json();
          if (isMounted && config && typeof config === 'object') {
            const hasUserEdits = localStorage.getItem('phantasmagoria_has_user_edits') === 'true';
            const localModified = parseInt(localStorage.getItem('phantasmagoria_last_modified') || '0', 10);
            const serverUpdated = config.lastUpdated ? new Date(config.lastUpdated).getTime() : 0;

            // If the user has made local edits on this browser more recently than the static JSON file on disk,
            // PRESERVE the user's edits! Never overwrite new user slides or deletions with stale defaults!
            const shouldPreserveLocalEdits = hasUserEdits && (localModified > serverUpdated || !config.lastUpdated);

            if (!shouldPreserveLocalEdits) {
              if (Array.isArray(config.stories)) {
                setStories(config.stories);
              }
              if (Array.isArray(config.heroSlides)) {
                setHeroSlides(config.heroSlides);
              }
              if (Array.isArray(config.collageSlides)) {
                setCollageSlides(config.collageSlides);
              }
              if (config.about) {
                setAboutData(config.about);
              }
              if (Array.isArray(config.services)) {
                setServices(config.services);
              }
              if (Array.isArray(config.inquiries)) {
                setInquiries(config.inquiries);
              }
              if (config.heroPage) {
                setHeroPageData(config.heroPage);
              }
              if (config.homePage) {
                setHomePageData(config.homePage);
              }
              if (config.storiesPage) {
                setStoriesPageData(config.storiesPage);
              }
              if (config.contact) {
                setContactData(config.contact);
              }
              if (config.headerSettings) {
                setHeaderSettings(config.headerSettings);
              }
              if (config.footerSettings) {
                setFooterSettings(config.footerSettings);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch /site_settings.json, running with initial state:', err);
      } finally {
        if (isMounted) setIsConfigLoaded(true);
      }
    };

    loadSiteSettings();
    return () => {
      isMounted = false;
    };
  }, []);

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COLLAGE_SLIDES, JSON.stringify(collageSlides));
    } catch (e) {
      console.error('Error saving collage slides to localStorage:', e);
    }
  }, [collageSlides]);

  const markUserEdited = useCallback(() => {
    try {
      localStorage.setItem('phantasmagoria_has_user_edits', 'true');
      localStorage.setItem('phantasmagoria_last_modified', Date.now().toString());
    } catch (e) {
      console.warn('Error marking user edits in localStorage:', e);
    }
  }, []);

  // Whenever user alters state after initial config is loaded, mark that local edits exist
  useEffect(() => {
    if (!isConfigLoaded) return;
    markUserEdited();
  }, [
    isConfigLoaded,
    stories,
    heroSlides,
    collageSlides,
    aboutData,
    services,
    inquiries,
    heroPageData,
    homePageData,
    storiesPageData,
    contactData,
    headerSettings,
    footerSettings,
    markUserEdited
  ]);

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

  const deleteImageFromStory = (storyId, imageId, fallbackIndex = null) => {
    setStories(prev => prev.map(story => {
      if (story.id === storyId || story.slug === storyId) {
        return {
          ...story,
          images: (story.images || []).filter((img, idx) => {
            if (typeof fallbackIndex === 'number' && fallbackIndex >= 0) {
              return idx !== fallbackIndex;
            }
            if (imageId) {
              return img.id !== imageId;
            }
            return true;
          })
        };
      }
      return story;
    }));
  };

  // Hero Slides
  const addHeroSlide = (slideData) => {
    const newSlide = {
      id: slideData.id || `slide-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      url: slideData.url,
      title: slideData.title || '',
      subtitle: slideData.subtitle || ''
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const deleteHeroSlide = (slideIdOrIndex, fallbackIndex = null) => {
    setHeroSlides(prev => {
      if (typeof fallbackIndex === 'number' && fallbackIndex >= 0 && fallbackIndex < prev.length) {
        return prev.filter((_, idx) => idx !== fallbackIndex);
      }
      if (typeof slideIdOrIndex === 'number' && slideIdOrIndex >= 0 && slideIdOrIndex < prev.length) {
        return prev.filter((_, idx) => idx !== slideIdOrIndex);
      }
      return prev.filter(slide => slide.id !== slideIdOrIndex);
    });
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

  // Collage 3x3 Slides
  const addCollageSlide = (slideData) => {
    const newSlide = {
      id: slideData.id || `grid-slide-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      image: slideData.image || slideData.url || '/grid_slides/grid_slide_default.jpg'
    };
    setCollageSlides(prev => [...prev, newSlide]);
    return newSlide;
  };

  const updateCollageSlide = (slideId, updatedFields) => {
    setCollageSlides(prev => prev.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          ...updatedFields,
          image: updatedFields.image || updatedFields.url || slide.image || slide.url
        };
      }
      return slide;
    }));
  };

  const deleteCollageSlide = (slideIdOrIndex, fallbackIndex = null) => {
    setCollageSlides(prev => {
      if (typeof fallbackIndex === 'number' && fallbackIndex >= 0 && fallbackIndex < prev.length) {
        return prev.filter((_, idx) => idx !== fallbackIndex);
      }
      if (typeof slideIdOrIndex === 'number' && slideIdOrIndex >= 0 && slideIdOrIndex < prev.length) {
        return prev.filter((_, idx) => idx !== slideIdOrIndex);
      }
      return prev.filter(slide => slide.id !== slideIdOrIndex);
    });
  };

  // Compile entire site configuration into clean JSON object
  const getAllSettings = useCallback(() => {
    return {
      heroSlides,
      collageSlides,
      stories,
      about: aboutData,
      services,
      inquiries,
      heroPage: heroPageData,
      homePage: homePageData,
      storiesPage: storiesPageData,
      contact: contactData,
      headerSettings,
      footerSettings
    };
  }, [
    heroSlides,
    collageSlides,
    stories,
    aboutData,
    services,
    inquiries,
    heroPageData,
    homePageData,
    storiesPageData,
    contactData,
    headerSettings,
    footerSettings
  ]);

  // Export & download site_settings.json to the local device
  const exportSettingsJSON = useCallback((customData = null) => {
    const dataToExport = customData || getAllSettings();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'site_settings.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [getAllSettings]);

  // Save settings directly to public/site_settings.json (via Node API) or trigger download fallback
  const saveSettingsToServer = useCallback(async (customSettings = null, triggerDownloadFallback = false) => {
    const settings = customSettings || getAllSettings();
    settings.lastUpdated = new Date().toISOString();

    let saved = false;
    let savedMode = null;

    // 1. Try dev proxy /api/save-settings
    try {
      const res = await fetch('/api/save-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const result = await res.json();
        if (result && result.success) {
          saved = true;
          savedMode = 'server';
        }
      }
    } catch (e) {
      // proxy not reachable
    }

    // 2. If proxy not reachable, try companion save-server on port 3001
    if (!saved) {
      try {
        const res = await fetch('http://localhost:3001/api/save-settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(settings)
        });
        if (res.ok) {
          const result = await res.json();
          if (result && result.success) {
            saved = true;
            savedMode = 'server';
          }
        }
      } catch (e) {
        // companion server not reachable
      }
    }

    if (saved) {
      try {
        localStorage.setItem('phantasmagoria_last_modified', new Date(settings.lastUpdated).getTime().toString());
      } catch (e) {}
      return {
        success: true,
        mode: savedMode,
        message: 'Successfully saved directly to public/site_settings.json on disk!'
      };
    }

    if (triggerDownloadFallback) {
      // Static hosting fallback: trigger download so user can commit/push
      exportSettingsJSON(settings);
      return {
        success: true,
        mode: 'download',
        message: 'Downloaded updated site_settings.json! Replace public/site_settings.json to deploy changes.'
      };
    }

    return {
      success: false,
      error: 'Could not connect to /api/save-settings server endpoint.'
    };
  }, [getAllSettings, exportSettingsJSON]);

  // Automatic background persistence whenever content changes
  const autoSaveTimerRef = useRef(null);
  useEffect(() => {
    if (!isConfigLoaded) return;
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      saveSettingsToServer(null, false).catch(() => {});
    }, 600);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [isConfigLoaded, getAllSettings, saveSettingsToServer]);

  // Import and apply an external JSON configuration
  const importSettingsJSON = useCallback((input) => {
    try {
      const data = typeof input === 'string' ? JSON.parse(input) : input;
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON format');
      }
      if (Array.isArray(data.stories)) setStories(data.stories);
      if (Array.isArray(data.heroSlides)) setHeroSlides(data.heroSlides);
      if (Array.isArray(data.collageSlides)) setCollageSlides(data.collageSlides);
      if (data.about) setAboutData(data.about);
      if (Array.isArray(data.services)) setServices(data.services);
      if (Array.isArray(data.inquiries)) setInquiries(data.inquiries);
      if (data.heroPage) setHeroPageData(data.heroPage);
      if (data.homePage) setHomePageData(data.homePage);
      if (data.storiesPage) setStoriesPageData(data.storiesPage);
      if (data.contact) setContactData(data.contact);
      if (data.headerSettings) setHeaderSettings(data.headerSettings);
      if (data.footerSettings) setFooterSettings(data.footerSettings);
      return { success: true };
    } catch (err) {
      console.error('Error importing JSON:', err);
      return { success: false, error: err.message };
    }
  }, []);

  // Reload settings directly from public/site_settings.json
  const reloadSettingsFromServer = useCallback(async () => {
    try {
      const response = await fetch(`/site_settings.json?t=${Date.now()}`);
      if (response.ok) {
        const config = await response.json();
        if (config && typeof config === 'object') {
          if (Array.isArray(config.stories)) setStories(config.stories);
          if (Array.isArray(config.heroSlides)) setHeroSlides(config.heroSlides);
          if (Array.isArray(config.collageSlides)) setCollageSlides(config.collageSlides);
          if (config.about) setAboutData(config.about);
          if (Array.isArray(config.services)) setServices(config.services);
          if (Array.isArray(config.inquiries)) setInquiries(config.inquiries);
          if (config.heroPage) setHeroPageData(config.heroPage);
          if (config.homePage) setHomePageData(config.homePage);
          if (config.storiesPage) setStoriesPageData(config.storiesPage);
          if (config.contact) setContactData(config.contact);
          if (config.headerSettings) setHeaderSettings(config.headerSettings);
          if (config.footerSettings) setFooterSettings(config.footerSettings);
          localStorage.removeItem('phantasmagoria_has_user_edits');
          localStorage.removeItem('phantasmagoria_last_modified');
          return { success: true };
        }
      }
      return { success: false, error: 'Failed to fetch /site_settings.json' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }, []);

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
      setCollageSlides(INITIAL_COLLAGE_SLIDES);
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
      localStorage.removeItem(STORAGE_KEYS.COLLAGE_SLIDES);
      localStorage.removeItem('phantasmagoria_has_user_edits');
      localStorage.removeItem('phantasmagoria_last_modified');
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
        collageSlides,
        setCollageSlides,
        addCollageSlide,
        updateCollageSlide,
        deleteCollageSlide,
        resetToInitialData,
        isConfigLoaded,
        getAllSettings,
        saveSettingsToServer,
        exportSettingsJSON,
        importSettingsJSON,
        reloadSettingsFromServer
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
