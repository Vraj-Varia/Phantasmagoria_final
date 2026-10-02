/**
 * Cloudinary Helper Utilities
 * Provides automatic optimization, responsive sizing, and format conversion
 * for images hosted on Cloudinary or external CDNs.
 */

/**
 * Checks if a URL is hosted on Cloudinary
 * @param {string} url
 * @returns {boolean}
 */
export const isCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('cloudinary.com') || url.includes('res.cloudinary.com');
};

/**
 * Injects Cloudinary transformations into a Cloudinary URL
 * @param {string} url - Original Cloudinary image URL
 * @param {object} options - Transformation options
 * @param {number} [options.width] - Target width in px
 * @param {number} [options.height] - Target height in px
 * @param {string} [options.quality='auto'] - e.g. 'auto', 'auto:best', 'auto:eco', '80'
 * @param {string} [options.format='auto'] - e.g. 'auto' (serves WebP/AVIF depending on browser)
 * @param {string} [options.crop='limit'] - 'fill', 'fit', 'limit', 'thumb', 'scale'
 * @returns {string} Optimized URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || typeof url !== 'string') return '';

  // If not Cloudinary, return the original URL
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = width && height ? 'fill' : 'limit'
  } = options;

  // Build transformation flags
  const transformations = [];
  if (format) transformations.push(`f_${format}`);
  if (quality) transformations.push(`q_${quality}`);
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);

  const transformString = transformations.join(',');

  // Cloudinary standard upload pattern:
  // https://res.cloudinary.com/<cloud_name>/image/upload/<transformations>/<public_id>
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const prefix = url.substring(0, uploadIndex + 8); // includes '/upload/'
  const remainder = url.substring(uploadIndex + 8);

  // If already has transformations (starts with something like f_auto...), check and replace
  // Otherwise insert transformation
  return `${prefix}${transformString}/${remainder}`;
};

/**
 * Generate a thumbnail URL for quick previews in Admin and Masonry
 * @param {string} url
 * @param {number} size - width/height in px
 * @returns {string}
 */
export const getCloudinaryThumbnail = (url, size = 400) => {
  return getOptimizedImageUrl(url, {
    width: size,
    height: size,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  });
};

/**
 * Generate a hero/full-screen optimized image URL
 * @param {string} url
 * @param {number} width - default 1920
 * @returns {string}
 */
export const getCloudinaryHero = (url, width = 1920) => {
  return getOptimizedImageUrl(url, {
    width: width,
    quality: 'auto:best',
    format: 'auto'
  });
};
