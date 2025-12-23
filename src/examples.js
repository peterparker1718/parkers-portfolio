/**
 * Example Usage of LinkedIn Portfolio System
 * Demonstrates all key features and frameworks
 */

import { LinkedInPortfolio } from './linkedin-portfolio/linkedin-portfolio.js';
import { LinkedInProfileAgent } from './linkedin-agent/linkedin-profile-agent.js';

// Example: Create and initialize a LinkedIn Portfolio
function example1_CreatePortfolio() {
  console.log('\n=== Example 1: Create LinkedIn Portfolio ===\n');

  const portfolio = new LinkedInPortfolio({
    name: "Parker's Professional Portfolio",
    owner: "Parker",
    profileUrl: "https://linkedin.com/in/parker"
  });

  const profileData = {
    headline: {
      text: "Software Engineer",
      keywords: ["JavaScript", "Node.js"],
      hasValueProposition: false,
      isUnique: false
    },
    about: {
      text: "I am a software engineer with experience in web development.",
      hasStory: false,
      hasCredibilityMarkers: false,
      isEngaging: false,
      keywordDensity: 0.03
    },
    experience: {
      hasMetrics: false,
      usesActionVerbs: true,
      isRelevant: true,
      isSpecific: false
    },
    network: {
      connections: 150,
      endorsements: 8,
      recommendations: 2
    },
    featured: [],
    banner: {
      exists: false
    }
  };

  portfolio.initialize(profileData);
  console.log('Portfolio initialized:', portfolio.getSummary());
  
  return portfolio;
}

// Example: Run profile audit and get recommendations
function example2_ProfileAudit() {
  console.log('\n=== Example 2: Profile Audit with Brand Strategist Framework ===\n');

  const portfolio = example1_CreatePortfolio();
  const auditResults = portfolio.runProfileAudit();

  console.log('Overall Score:', auditResults.audit.overallScore);
  console.log('Overall Grade:', auditResults.audit.overallGrade);
  console.log('\nTop 3 Priority Improvements:');
  auditResults.upgradePlan.slice(0, 3).forEach((item, idx) => {
    console.log(`${idx + 1}. [${item.component}] ${item.recommendation} (Priority: ${item.priority.toFixed(2)})`);
  });

  return auditResults;
}

// Example: Generate optimized headline using formula
function example3_GenerateHeadline() {
  console.log('\n=== Example 3: Generate Headline using Content Modules ===\n');

  const agent = new LinkedInProfileAgent();

  const headlineResult = agent.generateContent('headline', {
    role: 'Full-Stack Developer',
    value: 'Building scalable web applications',
    differentiator: 'Specialized in AI integration'
  });

  console.log('Generated Headline:', headlineResult.content.text);
  console.log('Length:', headlineResult.content.length);
  console.log('Is Optimal:', headlineResult.content.isOptimal);
  console.log('Is Authentic:', headlineResult.validation.isAuthentic);

  return headlineResult;
}

// Example: Use Hook-Story-Offer framework for About section
function example4_HookStoryOffer() {
  console.log('\n=== Example 4: Hook-Story-Offer Framework ===\n');

  const portfolio = new LinkedInPortfolio();

  const result = portfolio.applyHSOFramework(
    "Passionate about creating technology that makes a difference.",
    "With over 5 years in software development, I've led teams in building applications used by 100K+ users. My journey started with a fascination for solving complex problems, which led me to specialize in full-stack development and AI integration. I've successfully delivered 15+ projects, increasing client efficiency by an average of 40%.",
    "Looking to collaborate on innovative projects that push the boundaries of technology. Let's connect and explore how we can create impact together."
  );

  console.log('Generated Narrative:\n');
  console.log(result.narrative.combined);
  console.log('\nOverall Score:', result.narrative.overallScore);
  console.log('Is Authentic:', result.validation.isAuthentic);

  return result;
}

// Example: Use Hook × Credibility × Keywords formula
function example5_HookCredibilityKeywords() {
  console.log('\n=== Example 5: Hook × Credibility × Keywords Formula ===\n');

  const portfolio = new LinkedInPortfolio();

  const result = portfolio.applyHCKFormula(
    "Transforming business challenges into elegant software solutions",
    ["10+ enterprise projects", "AWS Certified", "Led teams of 5-8 developers"],
    ["JavaScript", "Python", "Cloud Architecture", "Agile", "CI/CD"]
  );

  console.log('Generated Content:\n');
  console.log(result.content.combined);
  console.log('\nContent Score:', result.content.score.toFixed(2));
  console.log('Is Authentic:', result.validation.isAuthentic);

  return result;
}

// Example: Interview mode for content generation
function example6_InterviewMode() {
  console.log('\n=== Example 6: Interview Mode ===\n');

  const portfolio = new LinkedInPortfolio();

  // Start interview for headline
  const session = portfolio.startContentInterview('headline');
  console.log('Interview started:', session.section);
  console.log('Total questions:', session.totalQuestions);
  console.log('\nQuestion 1:', session.currentQuestion.question);

  // Simulate answering questions
  let response = portfolio.continueContentInterview('Senior Software Engineer');
  console.log('Question 2:', response.currentQuestion.question);

  response = portfolio.continueContentInterview('Full-stack development and cloud architecture');
  console.log('Question 3:', response.currentQuestion ? response.currentQuestion.question : 'Moving to next...');

  return session;
}

// Example: Get complete strategy with all recommendations
function example7_CompleteStrategy() {
  console.log('\n=== Example 7: Complete LinkedIn Strategy ===\n');

  const portfolio = example1_CreatePortfolio();

  const strategy = portfolio.getCompleteStrategy({
    industry: 'Technology',
    goal: 'job_search'
  });

  console.log('Profile Grade:', strategy.profileGrade);
  console.log('Profile Score:', strategy.profileScore);
  console.log('\nTop Priority Actions:');
  strategy.priorityActions.slice(0, 5).forEach((action, idx) => {
    console.log(`${idx + 1}. [${action.component}] ${action.recommendation}`);
  });

  console.log('\nNetwork Strategy Grade:', strategy.networkStrategy.grade);
  console.log('Network Recommendations:');
  strategy.networkStrategy.recommendations.forEach(rec => {
    console.log(`  - ${rec}`);
  });

  console.log('\nFeatured Content Recommendations:');
  strategy.featuredRecommendations.suggestedItems.slice(0, 3).forEach(item => {
    console.log(`  - ${item.type}: ${item.reason} (Priority: ${item.priority})`);
  });

  return strategy;
}

// Example: Visual and Network strategies
function example8_VisualNetworkStrategies() {
  console.log('\n=== Example 8: Visual and Network Strategies ===\n');

  const portfolio = new LinkedInPortfolio();

  // Banner strategy
  const bannerStrategy = portfolio.getBannerStrategy({
    exists: true,
    width: 1584,
    height: 396,
    isHighQuality: true,
    hasBranding: false
  });

  console.log('Banner Score:', bannerStrategy.score);
  console.log('Banner Grade:', bannerStrategy.grade);
  console.log('Recommendations:', bannerStrategy.recommendations);

  // Network strategy
  const networkStrategy = portfolio.getNetworkStrategy({
    connections: 250,
    endorsements: 15,
    recommendations: 3
  });

  console.log('\nNetwork Score:', networkStrategy.score);
  console.log('Network Grade:', networkStrategy.grade);
  console.log('Top Priorities:', networkStrategy.priorities);

  return { bannerStrategy, networkStrategy };
}

// Run all examples
export function runAllExamples() {
  console.log('\n' + '='.repeat(60));
  console.log('LinkedIn Portfolio System - Complete Examples');
  console.log('='.repeat(60));

  try {
    example1_CreatePortfolio();
    example2_ProfileAudit();
    example3_GenerateHeadline();
    example4_HookStoryOffer();
    example5_HookCredibilityKeywords();
    example6_InterviewMode();
    example7_CompleteStrategy();
    example8_VisualNetworkStrategies();

    console.log('\n' + '='.repeat(60));
    console.log('All examples completed successfully!');
    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Export individual examples
export {
  example1_CreatePortfolio,
  example2_ProfileAudit,
  example3_GenerateHeadline,
  example4_HookStoryOffer,
  example5_HookCredibilityKeywords,
  example6_InterviewMode,
  example7_CompleteStrategy,
  example8_VisualNetworkStrategies
};
