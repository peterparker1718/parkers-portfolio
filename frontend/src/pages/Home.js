import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Parker's Portfolio</h1>
          <p>Full-Stack Developer & Creative Problem Solver</p>
          <div className="hero-buttons">
            <button className="btn-primary">View My Work</button>
            <button className="btn-secondary">Get In Touch</button>
          </div>
        </div>
      </section>
      
      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Description of project 1</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Description of project 2</p>
          </div>
          <div className="project-card">
            <h3>Project 3</h3>
            <p>Description of project 3</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;