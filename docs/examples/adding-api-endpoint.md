# Example: Adding a New API Endpoint

This example shows how to add a new API endpoint for blog posts.

## 1. Create the Route File

Create `backend/src/routes/blog.js`:

```javascript
const express = require('express');
const router = express.Router();

// Sample blog posts (in production, use a database)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a popular JavaScript library...",
    author: "Parker",
    createdAt: "2024-03-15",
    tags: ["react", "javascript", "tutorial"]
  }
];

// GET /api/blog - Get all blog posts
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: blogPosts,
      count: blogPosts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// GET /api/blog/:id - Get single blog post
router.get('/:id', (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

module.exports = router;
```

## 2. Register the Route

Update `backend/src/server.js`:

```javascript
// Add this line with other route imports
app.use('/api/blog', require('./routes/blog'));
```

## 3. Test the Endpoint

Start the backend server and test:

```bash
# Get all blog posts
curl http://localhost:5000/api/blog

# Get specific blog post
curl http://localhost:5000/api/blog/1
```

## 4. Use in Frontend

Create a hook to fetch blog posts:

```javascript
// frontend/src/hooks/useBlog.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/blog');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading };
};
```

Now you can use the hook in your Blog component!