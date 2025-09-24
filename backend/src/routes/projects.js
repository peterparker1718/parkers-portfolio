const express = require('express');
const router = express.Router();

// Sample projects data (in production, this would come from a database)
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with React and Node.js",
    longDescription: "This comprehensive e-commerce platform features user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Built with modern technologies for scalability and performance.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
    github: "https://github.com/peterparker1718/ecommerce-platform",
    live: "https://parker-ecommerce.vercel.app",
    image: "/api/assets/images/ecommerce-project.jpg",
    featured: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    longDescription: "A modern task management solution featuring real-time collaboration, project boards, team management, progress tracking, and notification system. Perfect for teams looking to improve productivity and project coordination.",
    technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/peterparker1718/task-manager",
    live: "https://parker-tasks.netlify.app",
    image: "/api/assets/images/task-manager-project.jpg",
    featured: true,
    createdAt: "2024-02-20"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasting",
    longDescription: "An intuitive weather dashboard that provides current conditions, 7-day forecasts, weather maps, and historical data. Features geolocation support, multiple location tracking, and beautiful data visualizations.",
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3", "PWA"],
    github: "https://github.com/peterparker1718/weather-dashboard",
    live: "https://parker-weather.vercel.app",
    image: "/api/assets/images/weather-project.jpg",
    featured: false,
    createdAt: "2024-03-10"
  }
];

// GET /api/projects - Get all projects
router.get('/', (req, res) => {
  try {
    const { featured } = req.query;
    
    let filteredProjects = projects;
    if (featured === 'true') {
      filteredProjects = projects.filter(project => project.featured);
    }
    
    res.json({
      success: true,
      data: filteredProjects,
      count: filteredProjects.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

module.exports = router;