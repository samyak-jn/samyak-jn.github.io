/**
 * Advanced Animations & Interactive Effects
 */

// Scroll Progress Bar
class ScrollProgress {
  constructor() {
    this.bar = null;
    this.init();
  }

  init() {
    this.bar = document.createElement('div');
    this.bar.className = 'scroll-progress';
    document.body.appendChild(this.bar);
    
    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    this.bar.style.width = `${scrolled}%`;
  }
}

// Removed floating particles and cursor trail - too distracting

// 3D Card Tilt Effect
class CardTilt {
  constructor() {
    this.cards = document.querySelectorAll('.card-3d');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
      card.addEventListener('mouseleave', () => this.resetTilt(card));
    });
  }

  handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }

  resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }
}

// Animated Counter
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = target;
    this.duration = duration;
    this.start = 0;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.element);
  }

  animate() {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      
      const current = Math.floor(this.start + (this.target - this.start) * this.easeOutCubic(progress));
      this.element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.element.textContent = this.target;
      }
    };
    
    requestAnimationFrame(animate);
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}

// Skill Bar Animation
class SkillBars {
  constructor() {
    this.bars = document.querySelectorAll('.skill-bar-fill');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width || '100';
          entry.target.style.width = `${width}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.bars.forEach(bar => observer.observe(bar));
  }
}

// Magnetic Button Effect
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.magnetic-btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => this.handleMagnetic(e, button));
      button.addEventListener('mouseleave', () => this.resetMagnetic(button));
    });
  }

  handleMagnetic(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.3;
    const moveY = y * 0.3;
    
    button.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-4px)`;
  }

  resetMagnetic(button) {
    button.style.transform = 'translate(0, 0) translateY(-4px)';
  }
}

// Stagger Animation
class StaggerAnimation {
  constructor(selector, delay = 100) {
    this.elements = document.querySelectorAll(selector);
    this.delay = delay;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('stagger-item');
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }, index * this.delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.elements.forEach(el => observer.observe(el));
  }
}

// Page Transition
class PageTransition {
  constructor() {
    this.transition = null;
    this.init();
  }

  init() {
    this.transition = document.createElement('div');
    this.transition.className = 'page-transition';
    document.body.appendChild(this.transition);
    
    // Add transition on link clicks
    document.querySelectorAll('a[href^=""]').forEach(link => {
      if (link.hostname === window.location.hostname || !link.hostname) {
        link.addEventListener('click', (e) => {
          if (link.target !== '_blank' && !link.hasAttribute('download')) {
            e.preventDefault();
            this.animate(() => {
              window.location.href = link.href;
            });
          }
        });
      }
    });
  }

  animate(callback) {
    this.transition.classList.add('active');
    setTimeout(() => {
      if (callback) callback();
    }, 500);
  }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on desktop/large screens for performance
  if (window.innerWidth > 768) {
    new ScrollProgress();
    new CardTilt();
    new MagneticButtons();
  }
  
  new SkillBars();
  new StaggerAnimation('.stagger-animate', 50);
  
  // Initialize counters if they exist
  document.querySelectorAll('.counter').forEach(counter => {
    const target = parseInt(counter.dataset.target || counter.textContent);
    new AnimatedCounter(counter, target);
  });
});
