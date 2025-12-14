import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedRepos } from '../hooks/useGitHub';
import GitHubProfile from '../components/GitHubProfile';
import GitHubRepoCard from '../components/GitHubRepoCard';
import GitHubStats from '../components/GitHubStats';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'peterparker1718';

const Home = () => {
  const { featuredRepos, loading, error } = useFeaturedRepos(GITHUB_USERNAME, 6);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Parker's Portfolio</h1>
          <p>Full-Stack Developer & Creative Problem Solver</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-secondary">Get In Touch</Link>
          </div>
        </div>
      </section>

      <section className="github-section">
        <div className="section-container">
          <div className="github-profile-section">
            <GitHubProfile username={GITHUB_USERNAME} />
          </div>
          <div className="github-stats-section">
            <GitHubStats username={GITHUB_USERNAME} />
          </div>
        </div>
      </section>
      
      <section className="featured-projects">
        <h2>Featured GitHub Projects</h2>
        {loading && <p className="loading-message">Loading projects from GitHub...</p>}
        {error && <p className="error-message">Unable to load projects. Please check back later.</p>}
        {!loading && !error && featuredRepos.length === 0 && (
          <p className="no-projects">No projects found.</p>
        )}
        {!loading && !error && featuredRepos.length > 0 && (
          <div className="projects-grid">
            {featuredRepos.map(repo => (
              <GitHubRepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
        <div className="view-all-projects">
          <Link to="/projects" className="btn-secondary">
            View All Projects →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;