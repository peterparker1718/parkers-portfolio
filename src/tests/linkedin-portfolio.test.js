/**
 * Tests for LinkedIn Portfolio
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { LinkedInPortfolio } from '../linkedin-portfolio/linkedin-portfolio.js';

describe('LinkedInPortfolio', () => {
  describe('constructor', () => {
    it('should create LinkedIn portfolio with default config', () => {
      const portfolio = new LinkedInPortfolio();

      assert.ok(portfolio.config);
      assert.ok(portfolio.linkedInAgent);
      assert.ok(portfolio.linkedInData);
      assert.strictEqual(portfolio.config.theme, 'linkedin');
      assert.ok(portfolio.config.linkedInFeatures.profileOptimization);
    });

    it('should create portfolio with custom config', () => {
      const portfolio = new LinkedInPortfolio({
        name: 'Custom Portfolio',
        owner: 'Test User'
      });

      assert.strictEqual(portfolio.config.name, 'Custom Portfolio');
      assert.strictEqual(portfolio.config.owner, 'Test User');
    });
  });

  describe('initialize', () => {
    it('should initialize portfolio and run audit', () => {
      const portfolio = new LinkedInPortfolio();
      const profileData = {
        headline: { text: 'Engineer', keywords: [] },
        about: { text: 'About me' },
        experience: {}
      };

      portfolio.initialize(profileData);

      assert.ok(portfolio.linkedInData.lastAudit);
      assert.ok(portfolio.linkedInData.optimizationScore >= 0);
    });
  });

  describe('runProfileAudit', () => {
    it('should run comprehensive audit', () => {
      const portfolio = new LinkedInPortfolio();
      portfolio.initialize({
        headline: { text: 'Developer', keywords: ['JavaScript'] }
      });

      const audit = portfolio.runProfileAudit();

      assert.ok(audit.audit);
      assert.ok(audit.upgradePlan);
      assert.ok(audit.visualStrategy);
      assert.ok(audit.featuredStrategy);
      assert.ok(audit.networkStrategy);
    });
  });

  describe('generateOptimizedContent', () => {
    it('should generate and validate content', () => {
      const portfolio = new LinkedInPortfolio();

      const result = portfolio.generateOptimizedContent('headline', {
        role: 'Software Engineer',
        value: 'Building apps',
        differentiator: 'AI focus'
      });

      assert.ok(result.content);
      assert.ok(result.validation);
      assert.ok(typeof result.isReady === 'boolean');
    });

    it('should auto-update section when option is set', () => {
      const portfolio = new LinkedInPortfolio();
      portfolio.initialize({});

      const result = portfolio.generateOptimizedContent('headline', {
        role: 'Engineer'
      }, { autoUpdate: true });

      if (result.isReady) {
        const section = portfolio.getSection('headline');
        assert.ok(section);
      }
    });
  });

  describe('applyHCKFormula', () => {
    it('should apply Hook × Credibility × Keywords formula', () => {
      const portfolio = new LinkedInPortfolio();

      const result = portfolio.applyHCKFormula(
        'Building the future',
        ['10+ projects', 'Certified'],
        ['JavaScript', 'Python']
      );

      assert.ok(result.content);
      assert.ok(result.validation);
    });
  });

  describe('applyHSOFramework', () => {
    it('should apply Hook-Story-Offer framework', () => {
      const portfolio = new LinkedInPortfolio();

      const result = portfolio.applyHSOFramework(
        'Passionate about tech',
        'My journey started...',
        'Let\'s connect'
      );

      assert.ok(result.narrative);
      assert.ok(result.validation);
    });
  });

  describe('getCompleteStrategy', () => {
    it('should get comprehensive strategy', () => {
      const portfolio = new LinkedInPortfolio();
      portfolio.initialize({
        headline: { text: 'Dev' },
        network: { connections: 100, endorsements: 5, recommendations: 2 }
      });

      const strategy = portfolio.getCompleteStrategy({
        industry: 'Technology',
        goal: 'job_search'
      });

      assert.ok(typeof strategy.profileScore === 'number');
      assert.ok(strategy.profileGrade);
      assert.ok(Array.isArray(strategy.priorityActions));
      assert.ok(strategy.visualStrategy);
      assert.ok(strategy.featuredRecommendations);
      assert.ok(strategy.networkStrategy);
    });
  });

  describe('getSummary', () => {
    it('should get enhanced summary with LinkedIn features', () => {
      const portfolio = new LinkedInPortfolio();
      portfolio.initialize({ headline: { text: 'Test' } });

      const summary = portfolio.getSummary();

      assert.ok(summary.linkedInFeatures);
      assert.ok(typeof summary.optimizationScore === 'number');
      assert.ok(summary.profileGrade);
    });
  });

  describe('export', () => {
    it('should export portfolio with LinkedIn data', () => {
      const portfolio = new LinkedInPortfolio();
      portfolio.initialize({ headline: { text: 'Test' } });

      const exported = portfolio.export();
      const parsed = JSON.parse(exported);

      assert.ok(parsed.linkedInData);
      assert.ok(parsed.config);
      assert.ok(parsed.data);
    });
  });
});
