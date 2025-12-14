# GitHub Integration Guide

## Overview

This portfolio automatically integrates with the GitHub API to showcase your profile, repositories, and contributions. This guide explains how to configure and customize the GitHub integration.

## Features

### 1. Profile Display
- Shows your GitHub avatar and profile information
- Displays follower/following counts
- Shows location, blog, and social links
- Real-time data fetched from GitHub API

### 2. Repository Showcase
- Automatically fetches all your public repositories
- Displays repository metadata (stars, forks, language)
- Shows repository descriptions and last update dates
- Links to live demos if available

### 3. Statistics Dashboard
- Total repository count
- Total stars across all repositories
- Total forks
- Most used programming languages
- Most starred repository

### 4. Featured Projects
- Intelligently selects top projects based on:
  - Number of stars
  - Number of forks
  - Recent activity
- Excludes forked repositories by default
- Configurable number of featured projects

## Configuration

### Step 1: Set Your GitHub Username

Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp .env.example .env
```

Edit `.env` and set your GitHub username:

```bash
REACT_APP_GITHUB_USERNAME=your-github-username
```

### Step 2: (Optional) Add GitHub Token

For higher API rate limits (60 → 5000 requests/hour), add a Personal Access Token:

1. Go to [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Integration")
4. Select scope: `public_repo` (read access to public repositories)
5. Click "Generate token"
6. Copy the token and add to `.env`:

```bash
REACT_APP_GITHUB_TOKEN=your_token_here
```

⚠️ **Security Note**: Never commit your `.env` file to version control. It's already in `.gitignore`.

## Components

### GitHubProfile
Displays user profile information.

**Usage:**
```jsx
import GitHubProfile from '../components/GitHubProfile';

<GitHubProfile username="your-username" />
```

### GitHubRepoCard
Displays a single repository card.

**Usage:**
```jsx
import GitHubRepoCard from '../components/GitHubRepoCard';

<GitHubRepoCard repo={repoObject} />
```

### GitHubStats
Displays statistics and insights.

**Usage:**
```jsx
import GitHubStats from '../components/GitHubStats';

<GitHubStats username="your-username" />
```

## Custom Hooks

### useGitHubProfile
Fetches user profile data.

```jsx
import { useGitHubProfile } from '../hooks/useGitHub';

const { profile, loading, error } = useGitHubProfile('username');
```

### useGitHubRepos
Fetches repositories with options.

```jsx
import { useGitHubRepos } from '../hooks/useGitHub';

const { repos, loading, error } = useGitHubRepos('username', {
  sort: 'updated',  // updated, created, pushed, full_name
  perPage: 100,
  type: 'owner'     // owner, member, public
});
```

### useGitHubStats
Calculates statistics from repositories.

```jsx
import { useGitHubStats } from '../hooks/useGitHub';

const { stats, loading, error } = useGitHubStats('username');
```

### useFeaturedRepos
Gets top featured repositories.

```jsx
import { useFeaturedRepos } from '../hooks/useGitHub';

const { featuredRepos, loading, error } = useFeaturedRepos('username', 6);
```

## API Service

The `githubService.js` provides methods to interact with GitHub API:

```javascript
import githubService from '../services/githubService';

// Get user profile
const profile = await githubService.getUserProfile('username');

// Get repositories
const repos = await githubService.getUserRepos('username', options);

// Get repository details
const repo = await githubService.getRepo('username', 'repo-name');

// Calculate stats
const stats = githubService.calculateStats(repos);

// Get featured repos
const featured = githubService.getFeaturedRepos(repos, 6);
```

## Customization

### Change Featured Project Count

Edit `Home.js`:
```jsx
const { featuredRepos } = useFeaturedRepos(GITHUB_USERNAME, 10); // Show 10 instead of 6
```

### Modify Featured Project Selection

Edit `frontend/src/services/githubService.js`:

```javascript
getFeaturedRepos(repos, count = 6) {
  return repos
    .filter(repo => !repo.fork && repo.stargazers_count > 0) // Add star requirement
    .sort((a, b) => {
      // Customize scoring algorithm
      const scoreA = (a.stargazers_count * 5) + (a.forks_count * 2);
      const scoreB = (b.stargazers_count * 5) + (b.forks_count * 2);
      return scoreB - scoreA;
    })
    .slice(0, count);
}
```

### Add Repository Filtering

Edit `Projects.js` to add custom filters:

```jsx
const filteredRepos = repos.filter(repo => {
  // Custom filter logic
  if (repo.fork) return false; // Exclude forks
  if (repo.archived) return false; // Exclude archived
  if (repo.stargazers_count < 5) return false; // Minimum stars
  return true;
});
```

## Styling

### Language Colors

Edit `GitHubRepoCard.js` to add/modify language colors:

```javascript
const getLanguageColor = (language) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'YourLanguage': '#yourcolor',
    // Add more languages
  };
  return colors[language] || '#8b8b8b';
};
```

### Component Styling

All GitHub components use classes from `App.css`:
- `.github-profile-card` - Profile card styling
- `.github-repo-card` - Repository card styling
- `.github-stats-container` - Stats container styling

Modify these classes in `frontend/src/styles/App.css` to customize appearance.

## Rate Limits

GitHub API rate limits:
- **Without token**: 60 requests/hour per IP
- **With token**: 5,000 requests/hour

### Handling Rate Limits

The service automatically handles errors. To check rate limit status:

```javascript
// Check rate limit
fetch('https://api.github.com/rate_limit')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Troubleshooting

### Issue: "API rate limit exceeded"
**Solution**: Add a GitHub Personal Access Token to `.env`

### Issue: "User not found"
**Solution**: Check that `REACT_APP_GITHUB_USERNAME` is correct in `.env`

### Issue: Profile not loading
**Solution**: 
1. Check browser console for errors
2. Verify internet connection
3. Check GitHub API status: https://www.githubstatus.com/

### Issue: Repositories not showing
**Solution**:
1. Ensure repositories are public
2. Check that user has repositories
3. Verify API token has correct permissions

## Advanced Features

### Add Contribution Graph

You can integrate with services like:
- [GitHub Chart API](https://ghchart.rshah.org/)
- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)

### Add Pinned Repositories

To fetch actual pinned repositories, you'll need to use GitHub's GraphQL API:

```javascript
// GraphQL query for pinned repos
const query = `
  query {
    user(login: "username") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
          }
        }
      }
    }
  }
`;
```

## Best Practices

1. **Cache Data**: Consider caching API responses to reduce requests
2. **Error Handling**: Always handle loading and error states
3. **Fallback Content**: Provide fallback content if API fails
4. **Token Security**: Never expose tokens in client-side code
5. **Rate Limiting**: Implement retry logic with exponential backoff
6. **Accessibility**: Ensure all components are keyboard navigable

## Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Managing Your GitHub Profile](https://docs.github.com/categories/setting-up-and-managing-your-github-profile)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
