import React, { useState } from 'react';
import { useGitHubRepos } from '../hooks/useGitHub';
import GitHubRepoCard from '../components/GitHubRepoCard';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'peterparker1718';

const Projects = () => {
  const [sortBy, setSortBy] = useState('updated');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const { repos, loading, error } = useGitHubRepos(GITHUB_USERNAME, { sort: sortBy });

  // Get unique languages from repos - memoized to avoid recalculation
  const languages = React.useMemo(() => {
    return [...new Set(repos.map(repo => repo.language).filter(Boolean))].sort();
  }, [repos]);

  // Filter repos by language - memoized to avoid recalculation
  const filteredRepos = React.useMemo(() => {
    if (filterLanguage === 'all') {
      return repos.filter(repo => !repo.fork); // Exclude forked repos by default
    }
    return repos.filter(repo => repo.language === filterLanguage && !repo.fork);
  }, [repos, filterLanguage]);

  return (
    <div className="projects">
      <section className="projects-hero">
        <h1>My GitHub Projects</h1>
        <p>A collection of {repos.length} repositories showcasing my work and contributions</p>
      </section>

      <section className="projects-filters">
        <div className="filter-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="updated">Recently Updated</option>
            <option value="created">Recently Created</option>
            <option value="pushed">Recently Pushed</option>
            <option value="full_name">Name</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="language-select">Language:</label>
          <select 
            id="language-select" 
            value={filterLanguage} 
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </section>
      
      <section className="projects-list">
        {loading && (
          <div className="loading-container">
            <p>Loading projects from GitHub...</p>
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p>Error loading projects: {error}</p>
            <p>Please check your internet connection or try again later.</p>
          </div>
        )}
        
        {!loading && !error && filteredRepos.length === 0 && (
          <div className="no-projects-container">
            <p>No projects found with the selected filters.</p>
          </div>
        )}
        
        {!loading && !error && filteredRepos.length > 0 && (
          <>
            <div className="projects-count">
              Showing {filteredRepos.length} {filteredRepos.length === 1 ? 'project' : 'projects'}
            </div>
            <div className="projects-grid">
              {filteredRepos.map(repo => (
                <GitHubRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="github-link-section">
        <a 
          href={`https://github.com/${GITHUB_USERNAME}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary"
        >
          View All on GitHub →
        </a>
      </section>
    </div>
  );
};

export default Projects;