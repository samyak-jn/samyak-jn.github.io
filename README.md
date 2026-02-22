# Personal Portfolio Website

A modern, responsive, static personal website built with vanilla HTML5, CSS3, and JavaScript (ES6+). Perfect for showcasing your portfolio, blog posts, and personal information. Designed to be hosted on GitHub Pages with no build step required.

## ✨ Features

- **Modern Design**: Clean, minimal, and professional aesthetic
- **Fully Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Theme toggle with persistent preference
- **Blog System**: Dynamic blog posts loaded from JSON with search and filtering
- **Portfolio Showcase**: Project listings with tech stack tags
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **Performance**: Lightweight, fast-loading, no framework overhead
- **Easy to Extend**: Simple JSON-based content management

## 📁 Project Structure

```
/
├── index.html            # Landing page
├── blog.html             # Blog listing page
├── post.html             # Single blog post template
├── portfolio.html        # Portfolio/projects page
├── about.html            # About me page
├── contact.html          # Contact page
│
├── assets/
│   ├── css/
│   │   ├── base.css      # Global styles, CSS variables
│   │   ├── layout.css    # Grid, layout, responsiveness
│   │   └── theme.css     # Theme-specific styles
│   │
│   ├── js/
│   │   ├── main.js       # Navigation, theme, animations
│   │   ├── blog.js       # Blog rendering, filtering
│   │   └── utils.js      # Helper functions
│   │
│   └── images/           # Image assets
│
├── data/
│   ├── posts.json        # Blog metadata/content
│   └── projects.json     # Portfolio data
│
└── README.md
```

## 🚀 Getting Started

### Local Development

1. **Clone or download** this repository
2. **Open** `index.html` in your browser, or
3. **Serve locally** using a simple HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### GitHub Pages Deployment

1. **Push** your code to a GitHub repository
2. Go to **Settings** → **Pages**
3. Select your branch (usually `main` or `master`)
4. Select the root directory
5. Click **Save**
6. Your site will be available at `https://yourusername.github.io/repository-name`

## 📝 Adding Content

### Adding a Blog Post

Edit `data/posts.json` and add a new entry:

```json
{
  "id": "5",
  "title": "Your Post Title",
  "date": "2024-01-20",
  "author": "Your Name",
  "readTime": "5 min",
  "tags": ["javascript", "web-development"],
  "excerpt": "A short description of your post...",
  "content": "Your full blog post content here. You can use markdown-like syntax:\n\n## Headers\n\n**Bold text** and *italic text*\n\n```javascript\n// Code blocks\nconst example = 'code';\n```"
}
```

The post will automatically appear on the blog page and can be accessed via `post.html?id=5`.

### Adding a Project

Edit `data/projects.json` and add a new entry:

```json
{
  "id": "7",
  "title": "Project Name",
  "description": "A brief description of your project",
  "tech": ["JavaScript", "CSS3", "HTML5"],
  "github": "https://github.com/username/project",
  "demo": "https://project-demo-url.com",
  "image": "assets/images/project.jpg"
}
```

### Customizing Personal Information

- **Name/Brand**: Update the `navbar-brand` text in all HTML files
- **About Page**: Edit `about.html` directly
- **Social Links**: Update the social media links in the footer of each page
- **Contact Email**: Update the email in `contact.html`

## 🎨 Customization

### Colors & Theme

All colors are defined as CSS variables in `assets/css/base.css`. Modify the `:root` variables to change the color scheme:

```css
:root {
  --color-accent: #0d6efd;
  --color-bg-primary: #ffffff;
  /* ... more variables */
}
```

### Typography

Font families and sizes are also defined as CSS variables:

```css
:root {
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
  --font-size-base: 1rem;
  /* ... more variables */
}
```

### Layout

Modify `assets/css/layout.css` to adjust spacing, grid layouts, and component styles.

## 🔧 Features Explained

### Theme Toggle

The theme toggle persists user preference in `localStorage` and applies the theme on page load. The toggle button is in the navigation bar.

### Blog System

- **Search**: Real-time search through post titles, content, and tags
- **Filtering**: Click tags to filter posts by category
- **Dynamic Loading**: Posts are loaded from `posts.json` and rendered client-side
- **Markdown Support**: Basic markdown-to-HTML conversion for post content

### Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Flexible grid layouts that adapt to screen size
- Touch-friendly interactive elements

### Accessibility

- Semantic HTML5 elements
- ARIA labels for screen readers
- Keyboard navigation support
- Skip to main content link
- Proper focus indicators
- Sufficient color contrast ratios

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS features (Grid, Flexbox, Variables, Custom Properties)
- **JavaScript ES6+**: Modules, async/await, classes
- **No Dependencies**: Pure vanilla JavaScript

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## 📧 Support

For questions or issues, please open an issue on GitHub or contact through the contact page.

---

**Built with ❤️ using vanilla web technologies**
