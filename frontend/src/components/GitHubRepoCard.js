import React from 'react';

const GitHubRepoCard = ({ repo }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="github-repo-card">
      <div className="repo-header">
        <h3 className="repo-name">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        {repo.fork && <span className="repo-badge fork">Forked</span>}
        {repo.private && <span className="repo-badge private">Private</span>}
      </div>

      {repo.description && (
        <p className="repo-description">{repo.description}</p>
      )}

      <div className="repo-meta">
        {repo.language && (
          <div className="repo-meta-item">
            <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
            <span>{repo.language}</span>
          </div>
        )}
        
        {repo.stargazers_count > 0 && (
          <div className="repo-meta-item">
            <span className="meta-icon">⭐</span>
            <span>{repo.stargazers_count}</span>
          </div>
        )}
        
        {repo.forks_count > 0 && (
          <div className="repo-meta-item">
            <span className="meta-icon">🔱</span>
            <span>{repo.forks_count}</span>
          </div>
        )}
        
        {repo.open_issues_count > 0 && (
          <div className="repo-meta-item">
            <span className="meta-icon">❗</span>
            <span>{repo.open_issues_count}</span>
          </div>
        )}
      </div>

      <div className="repo-footer">
        <span className="repo-updated">Updated {formatDate(repo.updated_at)}</span>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="repo-link">
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
};

// Language colors based on GitHub's color scheme
const getLanguageColor = (language) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'Dart': '#00B4AB',
  };
  return colors[language] || '#8b8b8b';
};

export default GitHubRepoCard;
