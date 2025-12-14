# Assets Directory

This directory contains static assets for the portfolio.

## Structure

- `images/` - Screenshots, project images, photos
- `icons/` - SVG icons, favicons, logos
- `videos/` - Demo videos, background videos
- `fonts/` - Custom web fonts (if not using web fonts)

## Usage

### In React Components
```jsx
// For images in public folder
<img src="/assets/images/project-screenshot.jpg" alt="Project" />

// For imported images
import projectImage from '../assets/images/project.jpg';
<img src={projectImage} alt="Project" />
```

### In CSS
```css
.hero {
  background-image: url('/assets/images/hero-bg.jpg');
}
```

## Optimization Tips

1. **Images**: Use WebP format when possible, optimize for web
2. **Icons**: Prefer SVG for scalability
3. **Videos**: Compress videos, consider using video hosting services
4. **Fonts**: Use font-display: swap for better loading performance

## Recommended Tools

- **Image optimization**: TinyPNG, ImageOptim
- **Icon creation**: Figma, Adobe Illustrator
- **Video compression**: HandBrake, FFmpeg