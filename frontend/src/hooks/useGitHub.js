import { useState, useEffect } from 'react';
import githubService from '../services/githubService';

// Custom hook to fetch GitHub profile
export const useGitHubProfile = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await githubService.getUserProfile(username);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  return { profile, loading, error };
};

// Custom hook to fetch GitHub repositories
export const useGitHubRepos = (username, options = {}) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract options to avoid dependency issues
  const sort = options.sort || 'updated';
  const perPage = options.perPage || 100;
  const type = options.type || 'owner';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await githubService.getUserRepos(username, { sort, perPage, type });
        setRepos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }
  }, [username, sort, perPage, type]);

  return { repos, loading, error };
};

// Custom hook to fetch GitHub stats
export const useGitHubStats = (username) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const repos = await githubService.getUserRepos(username);
        const calculatedStats = githubService.calculateStats(repos);
        setStats(calculatedStats);
        setError(null);
      } catch (err) {
        setError(err.message);
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchStats();
    }
  }, [username]);

  return { stats, loading, error };
};

// Custom hook to fetch featured repositories
export const useFeaturedRepos = (username, count = 6) => {
  const [featuredRepos, setFeaturedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRepos = async () => {
      try {
        setLoading(true);
        const repos = await githubService.getUserRepos(username);
        const featured = githubService.getFeaturedRepos(repos, count);
        setFeaturedRepos(featured);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFeaturedRepos([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchFeaturedRepos();
    }
  }, [username, count]);

  return { featuredRepos, loading, error };
};

// Custom hook to fetch GitHub events
export const useGitHubEvents = (username, perPage = 30) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await githubService.getUserEvents(username, perPage);
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchEvents();
    }
  }, [username, perPage]);

  return { events, loading, error };
};
