/**
 * LinkedIn Profile Agent
 * Main orchestrator for LinkedIn profile optimization using strategic frameworks
 */

import { BrandStrategistFramework } from './brand-strategist-framework.js';
import { ContentModules } from './content-modules.js';
import { ToneValidator } from './tone-validator.js';
import { InterviewMode } from './interview-mode.js';
import { VisualNetworkStrategies } from './visual-network-strategies.js';

export class LinkedInProfileAgent {
  constructor() {
    this.brandStrategist = new BrandStrategistFramework();
    this.contentModules = ContentModules;
    this.toneValidator = new ToneValidator();
    this.interviewMode = new InterviewMode();
    this.visualNetworkStrategies = new VisualNetworkStrategies();
  }

  /**
   * Comprehensive profile audit and upgrade
   * @param {object} profileData - Complete LinkedIn profile data
   * @returns {object} Audit results and upgrade plan
   */
  auditAndUpgrade(profileData) {
    console.log('Starting comprehensive profile audit...');

    // Step 1: Audit profile using Brand Strategist Framework
    const auditResults = this.brandStrategist.auditProfile(profileData);
    
    // Step 2: Generate upgrade recommendations
    const upgradePlan = this.brandStrategist.generateUpgradePlan(auditResults);

    // Step 3: Visual and network analysis
    const visualStrategy = this.visualNetworkStrategies.optimizeBanner(profileData.banner);
    const featuredStrategy = this.visualNetworkStrategies.optimizeFeaturedSection(profileData.featured);
    const networkStrategy = this.visualNetworkStrategies.optimizeNetwork(profileData.network);

    return {
      audit: auditResults,
      upgradePlan,
      visualStrategy,
      featuredStrategy,
      networkStrategy,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate optimized content for a profile section
   * @param {string} section - Section name (headline, about, experience)
   * @param {object} data - Section data
   * @param {object} options - Generation options
   * @returns {object} Generated and validated content
   */
  generateContent(section, data, options = {}) {
    let content;

    switch (section) {
      case 'headline':
        content = this.contentModules.createHeadline(
          data.role,
          data.value,
          data.differentiator
        );
        break;

      case 'about':
        content = this.contentModules.buildAboutSection(data);
        break;

      case 'experience':
        content = this.contentModules.generateExperienceBullet(
          data.action,
          data.context,
          data.result,
          data.metric
        );
        break;

      default:
        throw new Error(`Unknown section: ${section}`);
    }

    // Validate tone and authenticity
    const tone = options.tone || 'professional';
    let contentText = typeof content === 'object' && content.text ? content.text : content;
    
    if (typeof contentText === 'object') {
      contentText = JSON.stringify(contentText);
    }

    const validation = this.toneValidator.validateAuthenticity(contentText, tone);

    return {
      content,
      validation,
      isReady: validation.isAuthentic,
      recommendations: validation.recommendations
    };
  }

  /**
   * Start interactive interview mode for content creation
   * @param {string} section - Section to create content for
   * @returns {object} Interview session info
   */
  startInterviewMode(section) {
    return this.interviewMode.startInterview(section);
  }

  /**
   * Continue interview session
   * @param {string} answer - Answer to current question
   * @returns {object} Next question or completion
   */
  continueInterview(answer) {
    return this.interviewMode.submitAnswer(answer);
  }

  /**
   * Complete interview and generate content
   * @returns {object} Generated content with validation
   */
  finishInterview() {
    const summary = this.interviewMode.getSummary();
    
    if (!summary.isComplete) {
      return {
        error: 'Interview not complete',
        summary
      };
    }

    const content = summary.answers;
    const contentText = JSON.stringify(content);
    const validation = this.toneValidator.validateAuthenticity(contentText);

    this.interviewMode.reset();

    return {
      content,
      validation,
      isReady: validation.isAuthentic
    };
  }

  /**
   * Apply Hook × Credibility × Keywords formula
   * @param {string} hook - Engaging hook
   * @param {string|array} credibility - Credibility markers
   * @param {string|array} keywords - Keywords
   * @returns {object} Generated content with validation
   */
  applyHookCredibilityKeywords(hook, credibility, keywords) {
    const content = this.contentModules.hookCredibilityKeywords(hook, credibility, keywords);
    const validation = this.toneValidator.validateAuthenticity(content.combined);

    return {
      content,
      validation,
      isReady: validation.isAuthentic,
      recommendations: validation.recommendations
    };
  }

  /**
   * Apply Hook-Story-Offer framework
   * @param {string} hook - Opening hook
   * @param {string} story - Main story/background
   * @param {string} offer - Call to action/offer
   * @returns {object} Generated narrative with validation
   */
  applyHookStoryOffer(hook, story, offer) {
    const narrative = this.contentModules.hookStoryOffer(hook, story, offer);
    const validation = this.toneValidator.validateAuthenticity(narrative.combined);

    return {
      narrative,
      validation,
      isReady: validation.isAuthentic,
      recommendations: validation.recommendations
    };
  }

  /**
   * Get featured section recommendations
   * @param {string} industry - User's industry
   * @param {string} goal - User's goal
   * @returns {object} Customized recommendations
   */
  getFeaturedRecommendations(industry, goal) {
    return this.visualNetworkStrategies.generateFeaturedRecommendations(industry, goal);
  }

  /**
   * Get comprehensive profile strategy
   * @param {object} profileData - Complete profile data
   * @param {object} goals - User's goals and preferences
   * @returns {object} Complete strategy with all recommendations
   */
  getCompleteStrategy(profileData, goals = {}) {
    const audit = this.auditAndUpgrade(profileData);
    const featuredRecs = this.visualNetworkStrategies.generateFeaturedRecommendations(
      goals.industry || 'general',
      goals.goal || 'general'
    );

    return {
      profileScore: audit.audit.overallScore,
      profileGrade: audit.audit.overallGrade,
      priorityActions: audit.upgradePlan.slice(0, 5),
      visualStrategy: audit.visualStrategy,
      featuredRecommendations: featuredRecs,
      networkStrategy: audit.networkStrategy,
      summary: this._generateStrategySummary(audit, featuredRecs)
    };
  }

  _generateStrategySummary(audit, featuredRecs) {
    const summary = {
      overallHealth: audit.audit.overallGrade,
      topPriorities: [],
      quickWins: [],
      longTermGoals: []
    };

    // Top priorities (high impact, low score)
    audit.upgradePlan.slice(0, 3).forEach(item => {
      summary.topPriorities.push(item.recommendation);
    });

    // Quick wins (easy improvements)
    if (audit.visualStrategy.score < 0.8) {
      summary.quickWins.push('Update banner image');
    }
    if (audit.featuredStrategy.current.count < 3) {
      summary.quickWins.push('Add featured items');
    }

    // Long-term goals
    if (audit.networkStrategy.current.connections < 500) {
      summary.longTermGoals.push('Grow network to 500+ connections');
    }
    if (audit.networkStrategy.current.recommendations < 5) {
      summary.longTermGoals.push('Collect 5+ recommendations');
    }

    return summary;
  }
}
