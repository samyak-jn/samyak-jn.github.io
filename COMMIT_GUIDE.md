# Commit Guide

Run these commands in order to create informative commits. Each commit has a clear message and description.

## Commit 1: Remove old Jekyll site files

```bash
git add CNAME Gemfile LICENSE _config.yml _drafts/ _includes/ _layouts/ _posts/ assets/.DS_Store assets/css/.DS_Store assets/css/main.css assets/css/scss/ assets/fonts/ assets/img/ gulpfile.js package.json tags.html
git commit -m "chore: remove old Jekyll site files and dependencies

- Remove Jekyll configuration files (_config.yml, Gemfile)
- Remove Jekyll layouts and includes
- Remove old blog posts and drafts
- Remove Font Awesome and old CSS/SCSS files
- Remove old images and assets
- Clean up build tools (gulpfile.js, package.json)
- Remove CNAME and LICENSE files

This commit removes all legacy Jekyll-based site files to prepare
for the new vanilla JavaScript static site architecture."
```

## Commit 2: Add CSS architecture

```bash
git add assets/css/
git commit -m "feat: add modern CSS architecture with theme support

- Add base.css with CSS variables for theming and design tokens
- Add layout.css with responsive grid system and component styles
- Add theme.css with light/dark mode support
- Add animations.css with smooth, professional animations
- Add enhancements.css for interactive UI components
- Add opensource.css for open-source showcase section

The CSS architecture uses:
- CSS custom properties for theming
- Mobile-first responsive design
- Smooth transitions (500ms-1200ms)
- Modern layout techniques (Grid, Flexbox)
- Accessibility-focused styling"
```

## Commit 3: Add JavaScript modules

```bash
git add assets/js/
git commit -m "feat: add vanilla JavaScript modules for site functionality

- Add main.js for navigation, theme toggle, and core functionality
- Add blog.js for blog post rendering, filtering, and search
- Add animations.js for scroll reveal and interactive effects
- Add utils.js for helper functions and lazy loading

All modules use ES6+ syntax and work without build tools.
Features include:
- Dynamic content loading from JSON
- Client-side filtering and search
- Smooth scroll animations
- Theme persistence (localStorage)
- Responsive navigation menu"
```

## Commit 4: Add data structure

```bash
git add data/
git commit -m "feat: add JSON-based data structure for content management

- Add data/posts/ with individual JSON files per blog post
- Add data/projects/ with individual JSON files per project
- Add data/conferences/ with individual JSON files per conference
- Add index.json files for each data type to list available items

This structure allows:
- Easy content management (one file per item)
- Better organization and maintainability
- Dynamic loading of content
- Extensible for future content types"
```

## Commit 5: Add HTML pages

```bash
git add about.html portfolio.html blog.html post.html contact.html
git commit -m "feat: add new HTML pages for portfolio site

- Add about.html: Personal introduction, skills, experience timeline
- Add portfolio.html: Project showcase with filtering
- Add blog.html: Blog listing with search and tag filtering
- Add post.html: Individual blog post template
- Add contact.html: Redesigned contact page with social links

All pages feature:
- Responsive design
- Dark/light theme support
- Accessible markup (ARIA labels, semantic HTML)
- Smooth animations and transitions
- Consistent navigation and footer"
```

## Commit 6: Update landing page

```bash
git add index.html
git commit -m "feat: redesign landing page with interactive open-source showcase

- Add hero section with pastel blue gradient background
- Add typing animation for name display
- Add interactive open-source timeline visualization
- Add 3D flip cards for community showcase (Fedora, Debian, Red Hat, Linux)
- Add animated stats counter
- Add featured posts, projects, and conferences sections
- Update community icons with proper SVG logos

Key features:
- Smooth top-to-bottom gradient animation
- Interactive timeline with hover effects
- 3D card flip animations on hover
- Real community logos (Fedora, Debian, Red Hat, Linux)
- Responsive design for all screen sizes"
```

## Commit 7: Update documentation and assets

```bash
git add assets/images/ README.md
git commit -m "docs: update README and add profile image

- Update README.md with new project structure and setup instructions
- Add assets/images/profile.jpg for use across the site
- Document vanilla JavaScript architecture
- Add GitHub Pages deployment instructions
- Update copyright year to 2024"
```

## Note

Make sure to exclude the `tmp/` directory from all commits. If you see it in `git status`, you can add it to `.gitignore`:

```bash
echo "tmp/" >> .gitignore
git add .gitignore
git commit -m "chore: add tmp directory to gitignore"
```
