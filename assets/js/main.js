/**
 * Main JavaScript
 * Handles navigation, theme toggle, and general site functionality
 */

import { debounce, scrollToElement } from './utils.js';

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Apply saved theme
    this.applyTheme(this.theme);
    
    // Set up theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggle());
    }
    
    // Update toggle icon based on current theme
    this.updateToggleIcon();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.theme = theme;
    this.updateToggleIcon();
  }

  toggle() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  updateToggleIcon() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('svg');
    if (!icon) return;
    
    // Update icon based on theme
    if (this.theme === 'dark') {
      icon.innerHTML = `
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757l1.591-1.59a.75.75 0 00-1.06-1.06l-1.59 1.591a.75.75 0 001.06 1.06z"/>
      `;
    } else {
      icon.innerHTML = `
        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10 10 0 01-19.8 0 .75.75 0 01.982-.98zM15 6a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819 8.97 8.97 0 00-.981 3.463A9 9 0 0018 15a8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10 10 0 01-19.8 0 .75.75 0 01.982-.98zM15 6a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>
      `;
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.navbarNav = document.querySelector('.navbar-nav');
    this.init();
  }

  init() {
    // Set active link based on current page
    this.setActiveLink();
    
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.navbarNav && 
          !this.navbarNav.contains(e.target) && 
          !this.menuToggle.contains(e.target) &&
          this.navbarNav.getAttribute('aria-expanded') === 'true') {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navbarNav?.getAttribute('aria-expanded') === 'true') {
        this.closeMenu();
        this.menuToggle.focus();
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = href.substring(1);
          scrollToElement(`#${target}`, 80);
        }
      });
    });
  }

  setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar-link');
    
    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath || 
          (currentPath === '/' && linkPath.includes('index.html')) ||
          (currentPath.endsWith('/') && linkPath.includes('index.html'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  toggleMenu() {
    const isExpanded = this.navbarNav.getAttribute('aria-expanded') === 'true';
    this.menuToggle.setAttribute('aria-expanded', !isExpanded);
    this.navbarNav.setAttribute('aria-expanded', !isExpanded);
  }

  closeMenu() {
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.navbarNav.setAttribute('aria-expanded', 'false');
  }
}

// Scroll Reveal Animation
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    // Check on load
    this.checkElements();
    
    // Check on scroll (debounced)
    const checkOnScroll = debounce(() => this.checkElements(), 100);
    window.addEventListener('scroll', checkOnScroll);
    window.addEventListener('resize', checkOnScroll);
  }

  checkElements() {
    this.elements.forEach(element => {
      if (this.isInViewport(element)) {
        element.classList.add('revealed');
      }
    });
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Form Validation
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        // Since this is frontend-only, just show a message
        this.showMessage('Thank you for your message! (This is a demo form - no data is sent.)', 'success');
        this.form.reset();
      }
    });
    
    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validate() {
    let isValid = true;
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    // Email validation
    const emailInput = this.form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      if (!this.validateEmail(emailInput.value)) {
        this.showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
    }
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }
    
    if (field.type === 'email' && value && !this.validateEmail(value)) {
      this.showFieldError(field, 'Please enter a valid email address');
      return false;
    }
    
    this.clearError(field);
    return true;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showFieldError(field, message) {
    this.clearError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error show';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
  }

  clearError(field) {
    field.classList.remove('error');
    const error = field.parentElement.querySelector('.form-error');
    if (error) {
      error.remove();
    }
  }

  showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 0.5rem;
      background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
      color: ${type === 'success' ? '#155724' : '#721c24'};
      border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    this.form.insertBefore(messageDiv, this.form.firstChild);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

// Typing Animation
class TypingAnimation {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.init();
  }

  init() {
    if (!this.element) return;
    this.element.textContent = '';
    this.type();
  }

  type() {
    let i = 0;
    const timer = setInterval(() => {
      if (i < this.text.length) {
        this.element.textContent += this.text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        // Add cursor after typing
        this.element.classList.add('typing-complete');
      }
    }, this.speed);
  }
}

// Scroll Effects
class ScrollEffects {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    if (!this.navbar) return;
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class for shadow effect
      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.parallax');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      this.elements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize navigation
  new NavigationManager();
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // Initialize scroll effects
  new ScrollEffects();
  
  // Initialize parallax
  new ParallaxEffect();
  
  // Initialize form validation for contact form
  new FormValidator('#contact-form');
  
  // Typing animation for hero title
  const heroTitle = document.querySelector('.typing-animation');
  if (heroTitle) {
    const originalText = heroTitle.textContent.trim();
    new TypingAnimation(heroTitle, originalText, 80);
  }
  
  // Scroll indicator click handler
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
  
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    import('./utils.js').then(({ lazyLoadImages }) => {
      lazyLoadImages(images);
    });
  }
  
  // Add stagger animation to cards
  const cards = document.querySelectorAll('.card.reveal');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});
