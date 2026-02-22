/**
 * Utility Functions
 * Helper functions used across the application
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Get query parameter from URL
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Set query parameter in URL
 * @param {string} name - Parameter name
 * @param {string} value - Parameter value
 */
export function setQueryParam(name, value) {
  const url = new URL(window.location);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url);
}

/**
 * Remove query parameter from URL
 * @param {string} name - Parameter name
 */
export function removeQueryParam(name) {
  const url = new URL(window.location);
  url.searchParams.delete(name);
  window.history.pushState({}, '', url);
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
export function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -rect.height * threshold &&
    rect.left >= -rect.width * threshold &&
    rect.bottom <= windowHeight + rect.height * threshold &&
    rect.right <= windowWidth + rect.width * threshold
  );
}

/**
 * Lazy load images
 * @param {NodeList|Array} images - Image elements to lazy load
 */
export function lazyLoadImages(images) {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

/**
 * Scroll to element smoothly
 * @param {string|Element} target - Element selector or element
 * @param {number} offset - Offset from top
 */
export function scrollToElement(target, offset = 0) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML
 */
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Highlight search terms in text
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Term to highlight
 * @returns {string} HTML with highlighted terms
 */
export function highlightText(text, searchTerm) {
  if (!searchTerm) return escapeHtml(text);
  
  const regex = new RegExp(`(${escapeHtml(searchTerm)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}
