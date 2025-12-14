import React from 'react';
import { useGitHubProfile } from '../hooks/useGitHub';

const GitHubProfile = ({ username }) => {
  const { profile, loading, error } = useGitHubProfile(username);

  if (loading) {
    return <div className="github-profile loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="github-profile error">Error loading profile: {error}</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="github-profile-card">
      <div className="profile-header">
        <img 
          src={profile.avatar_url} 
          alt={profile.name || profile.login} 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>{profile.name || profile.login}</h2>
          <p className="profile-username">@{profile.login}</p>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{profile.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{profile.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{profile.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-details">
        {profile.location && (
          <div className="detail-item">
            <span className="detail-icon">📍</span>
            <span>{profile.location}</span>
          </div>
        )}
        {profile.blog && (
          <div className="detail-item">
            <span className="detail-icon">🔗</span>
            <a href={profile.blog} target="_blank" rel="noopener noreferrer">
              {profile.blog}
            </a>
          </div>
        )}
        {profile.twitter_username && (
          <div className="detail-item">
            <span className="detail-icon">🐦</span>
            <a 
              href={`https://twitter.com/${profile.twitter_username}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              @{profile.twitter_username}
            </a>
          </div>
        )}
        {profile.company && (
          <div className="detail-item">
            <span className="detail-icon">🏢</span>
            <span>{profile.company}</span>
          </div>
        )}
      </div>

      <a 
        href={profile.html_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-github"
      >
        View on GitHub
      </a>
    </div>
  );
};

export default GitHubProfile;
