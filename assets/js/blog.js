/**
 * Blog JavaScript
 * Handles blog post loading, filtering, and search
 */

import { formatDate, getQueryParam, highlightText, debounce } from './utils.js';

class BlogManager {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.currentTag = null;
    this.searchTerm = '';
    this.init();
  }

  async init() {
    // Check if we're on a blog post page (support both slug and id for backward compatibility)
    const postSlug = getQueryParam('slug') || getQueryParam('id');
    if (postSlug) {
      await this.loadPost(postSlug);
      return;
    }
    
    // Otherwise, load blog listing
    await this.loadPosts();
    this.setupFilters();
    this.setupSearch();
  }

  async loadPosts() {
    try {
      // Load index to get list of post IDs
      const indexResponse = await fetch('data/posts/index.json');
      if (!indexResponse.ok) throw new Error('Failed to load posts index');
      
      const postIds = await indexResponse.json();
      
      // Load all posts in parallel
      const postPromises = postIds.map(id => 
        fetch(`data/posts/${id}.json`)
          .then(res => res.json())
          .catch(err => {
            console.error(`Failed to load post ${id}:`, err);
            return null;
          })
      );
      
      const posts = await Promise.all(postPromises);
      this.posts = posts.filter(post => post !== null).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      this.filteredPosts = [...this.posts];
      this.renderPosts();
      this.renderTags();
    } catch (error) {
      console.error('Error loading posts:', error);
      this.showError('Failed to load blog posts. Please try again later.');
    }
  }

  async loadPost(postSlugOrId) {
    try {
      // First, try to load by ID (for backward compatibility)
      let post = null;
      try {
        const response = await fetch(`data/posts/${postSlugOrId}.json`);
        if (response.ok) {
          post = await response.json();
          // If the slug doesn't match, it might be an old ID link, so continue
          if (post.slug && post.slug !== postSlugOrId && !postSlugOrId.match(/^\d+$/)) {
            post = null; // Slug mismatch, need to search
          }
        }
      } catch (e) {
        // Not found by ID, will search by slug
      }
      
      // If not found by ID, search by slug
      if (!post) {
        const indexResponse = await fetch('data/posts/index.json');
        if (!indexResponse.ok) throw new Error('Failed to load posts index');
        
        const postIds = await indexResponse.json();
        const postPromises = postIds.map(id => 
          fetch(`data/posts/${id}.json`)
            .then(res => res.json())
            .catch(() => null)
        );
        
        const posts = await Promise.all(postPromises);
        post = posts.find(p => p && (p.slug === postSlugOrId || p.id === postSlugOrId));
      }
      
      if (!post) {
        this.showError('Post not found.');
        return;
      }
      
      // Load markdown content if needed
      if (post.contentType === 'markdown' && post.contentFile) {
        try {
          const contentResponse = await fetch(post.contentFile);
          if (contentResponse.ok) {
            post.content = await contentResponse.text();
          } else {
            throw new Error('Failed to load markdown content');
          }
        } catch (error) {
          console.error('Error loading markdown content:', error);
          this.showError('Failed to load post content. Please try again later.');
          return;
        }
      }
      
      // Ensure content exists
      if (!post.content) {
        this.showError('Post content is missing.');
        return;
      }
      
      this.renderPost(post);
    } catch (error) {
      console.error('Error loading post:', error);
      this.showError('Failed to load blog post. Please try again later.');
    }
  }

  renderPosts() {
    const container = document.getElementById('blog-posts');
    if (!container) return;
    
    if (this.filteredPosts.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem;">
          <p>No posts found matching your criteria.</p>
        </div>
      `;
      return;
    }
    
    container.innerHTML = this.filteredPosts.map(post => this.createPostCard(post)).join('');
    
    // Use ScrollReveal system for consistent animations
    const cards = container.querySelectorAll('.card.reveal');
    cards.forEach((card, index) => {
      requestAnimationFrame(() => {
        if (window.scrollReveal) {
          window.scrollReveal.addElement(card);
        } else {
          // Fallback: reveal with stagger animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.classList.add('revealed');
          }, index * 100);
        }
      });
    });
  }

  createPostCard(post) {
    const tags = post.tags.map(tag => 
      `<a href="#" class="tag" data-tag="${tag}">${tag}</a>`
    ).join('');
    
    const excerpt = post.excerpt || post.content.substring(0, 150) + '...';
    const highlightedExcerpt = this.searchTerm ? highlightText(excerpt, this.searchTerm) : excerpt;
    
    return `
      <article class="card reveal">
        ${post.image ? `
          <div class="card-image-wrapper" style="margin-bottom: 1rem; border-radius: var(--border-radius); overflow: hidden; height: 200px;">
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
          </div>
        ` : ''}
        <h2 class="card-title">
          <a href="post.html?slug=${post.slug || post.id}" style="text-decoration: none; color: inherit;">
            ${this.searchTerm ? highlightText(post.title, this.searchTerm) : post.title}
          </a>
        </h2>
        <div class="card-meta">
          <span>${formatDate(post.date)}</span>
          <span>•</span>
          <span>${post.readTime || '5 min'} read</span>
        </div>
        <div class="card-description">
          ${highlightedExcerpt}
        </div>
        <div class="card-footer">
          <div class="filter-tags">${tags}</div>
          <a href="post.html?slug=${post.slug || post.id}" class="btn btn-primary">Read More</a>
        </div>
      </article>
    `;
  }

  renderTags() {
    const container = document.getElementById('blog-tags');
    if (!container) return;
    
    // Get all unique tags
    const allTags = [...new Set(this.posts.flatMap(post => post.tags))];
    
    container.innerHTML = `
      <a href="#" class="tag ${this.currentTag === null ? 'active' : ''}" data-tag="all">
        All
      </a>
      ${allTags.map(tag => 
        `<a href="#" class="tag ${this.currentTag === tag ? 'active' : ''}" data-tag="${tag}">
          ${tag}
        </a>`
      ).join('')}
    `;
    
    // Add click handlers
    container.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        const tagValue = tag.dataset.tag;
        this.filterByTag(tagValue === 'all' ? null : tagValue);
      });
    });
  }

  filterByTag(tag) {
    this.currentTag = tag;
    this.applyFilters();
    this.renderTags();
  }

  setupFilters() {
    const filterTags = document.getElementById('blog-tags');
    if (!filterTags) return;
    
    filterTags.addEventListener('click', (e) => {
      if (e.target.classList.contains('tag')) {
        e.preventDefault();
        const tag = e.target.dataset.tag;
        this.filterByTag(tag === 'all' ? null : tag);
      }
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('blog-search');
    if (!searchInput) return;
    
    const handleSearch = debounce((e) => {
      this.searchTerm = e.target.value.toLowerCase().trim();
      this.applyFilters();
    }, 300);
    
    searchInput.addEventListener('input', handleSearch);
  }

  applyFilters() {
    this.filteredPosts = this.posts.filter(post => {
      // Tag filter
      if (this.currentTag && !post.tags.includes(this.currentTag)) {
        return false;
      }
      
      // Search filter
      if (this.searchTerm) {
        const searchLower = this.searchTerm.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchLower);
        const matchesContent = post.content.toLowerCase().includes(searchLower);
        const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesTitle && !matchesContent && !matchesTags) {
          return false;
        }
      }
      
      return true;
    });
    
    this.renderPosts();
  }

  renderPost(post) {
    const container = document.getElementById('post-content');
    if (!container) return;
    
    // Update page title
    document.title = `${post.title} | Blog`;
    
    // Update meta description if exists
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = post.excerpt || post.content.substring(0, 160);
    }
    
    const tags = post.tags.map(tag => 
      `<a href="blog.html?tag=${tag}" class="tag">${tag}</a>`
    ).join('');
    
    // Convert markdown-like content to HTML (simple conversion)
    const content = this.formatContent(post.content);
    
    container.innerHTML = `
      <article class="post-article">
        <header class="post-header">
          <h1 class="post-title">${post.title}</h1>
          <div class="card-meta">
            <span>${formatDate(post.date)}</span>
            <span>•</span>
            <span>${post.readTime || '5 min'} read</span>
            ${post.author ? `<span>•</span><span>By ${post.author}</span>` : ''}
          </div>
          ${tags ? `<div class="filter-tags" style="margin-top: 1rem;">${tags}</div>` : ''}
        </header>
        ${post.image ? `
          <div class="post-image" style="margin: 2rem 0; border-radius: var(--border-radius-lg); overflow: hidden;">
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: auto; display: block; object-fit: contain;">
          </div>
        ` : ''}
        <div class="post-content">
          ${content}
        </div>
        <footer class="post-footer">
          <a href="blog.html" class="btn btn-secondary">← Back to Blog</a>
        </footer>
      </article>
    `;
    
    // Add syntax highlighting if code blocks exist
    this.highlightCode();
  }

  formatContent(content) {
    // Simple markdown to HTML converter
    let html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraphs
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    
    return html;
  }

  highlightCode() {
    // Simple code highlighting (can be enhanced with a library)
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
      block.style.backgroundColor = 'var(--color-bg-tertiary)';
      block.style.padding = '1rem';
      block.style.borderRadius = '0.5rem';
      block.style.display = 'block';
      block.style.overflowX = 'auto';
    });
  }

  showError(message) {
    const container = document.getElementById('blog-posts') || document.getElementById('post-content');
    if (container) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem;">
          <p style="color: #dc3545;">${message}</p>
          <a href="blog.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Blog</a>
        </div>
      `;
    }
  }
}

// Initialize blog manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on a blog page
  if (document.getElementById('blog-posts') || document.getElementById('post-content')) {
    new BlogManager();
  }
  
  // Handle tag filter from URL
  const tagParam = getQueryParam('tag');
  if (tagParam && document.getElementById('blog-tags')) {
    setTimeout(() => {
      const tagElement = document.querySelector(`[data-tag="${tagParam}"]`);
      if (tagElement) {
        tagElement.click();
      }
    }, 100);
  }
});
