import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/example/ecommerce",
      live: "https://example-ecommerce.com"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      github: "https://github.com/example/taskmanager",
      live: "https://example-tasks.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasting",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/example/weather",
      live: "https://example-weather.com"
    }
  ];

  return (
    <div className="projects">
      <section className="projects-hero">
        <h1>My Projects</h1>
        <p>A collection of my recent work and experiments</p>
      </section>
      
      <section className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;