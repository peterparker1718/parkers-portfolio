import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// GitHub username - can be configured via environment variable
const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'peterparker1718';

// GitHub API service
class GitHubService {
  constructor() {
    this.api = axios.create({
      baseURL: GITHUB_API_BASE,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });
    
    // Add GitHub token if available for higher rate limits
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `token ${token}`;
    }
  }

  // Get user profile information
  async getUserProfile(username = GITHUB_USERNAME) {
    try {
      const response = await this.api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      throw error;
    }
  }

  // Get user's repositories
  async getUserRepos(username = GITHUB_USERNAME, options = {}) {
    try {
      const params = {
        sort: options.sort || 'updated',
        per_page: options.perPage || 100,
        type: options.type || 'owner'
      };
      
      const response = await this.api.get(`/users/${username}/repos`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      throw error;
    }
  }

  // Get user's contribution events
  async getUserEvents(username = GITHUB_USERNAME, perPage = 30) {
    try {
      const response = await this.api.get(`/users/${username}/events/public`, {
        params: { per_page: perPage }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub events:', error);
      throw error;
    }
  }

  // Get repository details
  async getRepo(username = GITHUB_USERNAME, repoName) {
    try {
      const response = await this.api.get(`/repos/${username}/${repoName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository:', error);
      throw error;
    }
  }

  // Get repository languages
  async getRepoLanguages(username = GITHUB_USERNAME, repoName) {
    try {
      const response = await this.api.get(`/repos/${username}/${repoName}/languages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      throw error;
    }
  }

  // Get user's starred repositories
  async getStarredRepos(username = GITHUB_USERNAME) {
    try {
      const response = await this.api.get(`/users/${username}/starred`);
      return response.data;
    } catch (error) {
      console.error('Error fetching starred repos:', error);
      throw error;
    }
  }

  // Calculate user statistics from repos
  calculateStats(repos) {
    const stats = {
      totalRepos: repos.length,
      totalStars: 0,
      totalForks: 0,
      languages: {},
      mostStarredRepo: null,
      mostForkedRepo: null
    };

    repos.forEach(repo => {
      stats.totalStars += repo.stargazers_count;
      stats.totalForks += repo.forks_count;
      
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }

      if (!stats.mostStarredRepo || repo.stargazers_count > stats.mostStarredRepo.stargazers_count) {
        stats.mostStarredRepo = repo;
      }

      if (!stats.mostForkedRepo || repo.forks_count > stats.mostForkedRepo.forks_count) {
        stats.mostForkedRepo = repo;
      }
    });

    return stats;
  }

  // Get featured/pinned repositories (simulated by filtering top repos)
  getFeaturedRepos(repos, count = 6) {
    return repos
      .filter(repo => !repo.fork) // Exclude forked repos
      .sort((a, b) => {
        // Sort by a combination of stars, forks, and recency
        const scoreA = (a.stargazers_count * 3) + (a.forks_count * 2) + (new Date(a.updated_at).getTime() / 1000000000);
        const scoreB = (b.stargazers_count * 3) + (b.forks_count * 2) + (new Date(b.updated_at).getTime() / 1000000000);
        return scoreB - scoreA;
      })
      .slice(0, count);
  }
}

export default new GitHubService();
