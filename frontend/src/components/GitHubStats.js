import React from 'react';
import { useGitHubStats } from '../hooks/useGitHub';

const GitHubStats = ({ username }) => {
  const { stats, loading, error } = useGitHubStats(username);

  if (loading) {
    return <div className="github-stats loading">Loading stats...</div>;
  }

  if (error) {
    return <div className="github-stats error">Error loading stats</div>;
  }

  if (!stats) {
    return null;
  }

  // Get top 5 languages
  const topLanguages = Object.entries(stats.languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="github-stats-container">
      <h2>GitHub Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalRepos}</div>
            <div className="stat-title">Total Repositories</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalStars}</div>
            <div className="stat-title">Total Stars</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔱</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalForks}</div>
            <div className="stat-title">Total Forks</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-content">
            <div className="stat-number">{topLanguages.length}</div>
            <div className="stat-title">Languages Used</div>
          </div>
        </div>
      </div>

      {topLanguages.length > 0 && (
        <div className="languages-section">
          <h3>Top Languages</h3>
          <div className="languages-list">
            {topLanguages.map(([language, count]) => (
              <div key={language} className="language-item">
                <span className="language-name">{language}</span>
                <span className="language-count">{count} repos</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.mostStarredRepo && (
        <div className="highlight-section">
          <h3>Most Starred Repository</h3>
          <div className="highlight-repo">
            <a href={stats.mostStarredRepo.html_url} target="_blank" rel="noopener noreferrer">
              {stats.mostStarredRepo.name}
            </a>
            <span className="highlight-stat">⭐ {stats.mostStarredRepo.stargazers_count}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
