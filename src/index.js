/**
 * Main entry point for Parker's Portfolio
 * Exports all portfolio components and LinkedIn integration
 */

// Base Portfolio
export { BasePortfolio } from './portfolio/base-portfolio.js';

// LinkedIn Portfolio (Cloned with LinkedIn features)
export { LinkedInPortfolio } from './linkedin-portfolio/linkedin-portfolio.js';

// LinkedIn Agent Components
export { LinkedInProfileAgent } from './linkedin-agent/linkedin-profile-agent.js';
export { BrandStrategistFramework } from './linkedin-agent/brand-strategist-framework.js';
export { ContentModules } from './linkedin-agent/content-modules.js';
export { ToneValidator } from './linkedin-agent/tone-validator.js';
export { InterviewMode } from './linkedin-agent/interview-mode.js';
export { VisualNetworkStrategies } from './linkedin-agent/visual-network-strategies.js';

/**
 * Quick start function to create a LinkedIn-optimized portfolio
 * @param {object} profileData - User's profile data
 * @param {object} config - Configuration options
 * @returns {object} Initialized LinkedIn Portfolio
 */
export async function createLinkedInPortfolio(profileData = {}, config = {}) {
  const { LinkedInPortfolio } = await import('./linkedin-portfolio/linkedin-portfolio.js');
  const portfolio = new LinkedInPortfolio(config);
  portfolio.initialize(profileData);
  return portfolio;
}

/**
 * Quick start function to create a base portfolio
 * @param {object} profileData - User's profile data
 * @param {object} config - Configuration options
 * @returns {object} Initialized Base Portfolio
 */
export async function createBasePortfolio(profileData = {}, config = {}) {
  const { BasePortfolio } = await import('./portfolio/base-portfolio.js');
  const portfolio = new BasePortfolio(config);
  portfolio.initialize(profileData);
  return portfolio;
}

export default {
  BasePortfolio,
  LinkedInPortfolio,
  LinkedInProfileAgent,
  BrandStrategistFramework,
  ContentModules,
  ToneValidator,
  InterviewMode,
  VisualNetworkStrategies,
  createLinkedInPortfolio,
  createBasePortfolio
};
