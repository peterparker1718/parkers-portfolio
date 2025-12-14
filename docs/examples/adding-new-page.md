# Example: Adding a New Page

This example shows how to add a new page to the portfolio.

## 1. Create the Page Component

Create `frontend/src/pages/Blog.js`:

```jsx
import React from 'react';

const Blog = () => {
  return (
    <div className="blog">
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>Thoughts, tutorials, and insights</p>
      </section>
      
      <section className="blog-posts">
        <div className="post-card">
          <h3>Getting Started with React</h3>
          <p>A beginner's guide to React development...</p>
          <span className="post-date">March 15, 2024</span>
        </div>
      </section>
    </div>
  );
};

export default Blog;
```

## 2. Add Route to App.js

Update `frontend/src/App.js`:

```jsx
import Blog from './pages/Blog';

// Add to Routes
<Route path="/blog" element={<Blog />} />
```

## 3. Update Navigation

Update `frontend/src/components/Header.js`:

```jsx
<li><Link to="/blog">Blog</Link></li>
```

## 4. Add Styles (Optional)

Add styles to `frontend/src/styles/App.css`:

```css
.blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.post-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}
```

That's it! Your new page is now accessible at `/blog`.