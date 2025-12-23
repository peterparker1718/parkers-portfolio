/**
 * Brand Strategist Audit Framework
 * Strategic framework for auditing and upgrading LinkedIn profile components
 */

export class BrandStrategistFramework {
  constructor() {
    this.auditCategories = {
      headline: {
        weight: 0.25,
        criteria: ['clarity', 'keywords', 'value_proposition', 'uniqueness']
      },
      about: {
        weight: 0.20,
        criteria: ['storytelling', 'credibility', 'engagement', 'keywords']
      },
      experience: {
        weight: 0.20,
        criteria: ['impact_metrics', 'action_verbs', 'relevance', 'specificity']
      },
      skills: {
        weight: 0.15,
        criteria: ['relevance', 'endorsements', 'priority_order', 'completeness']
      },
      recommendations: {
        weight: 0.10,
        criteria: ['quantity', 'quality', 'recency', 'diversity']
      },
      featured: {
        weight: 0.10,
        criteria: ['visual_appeal', 'relevance', 'variety', 'recency']
      }
    };
  }

  /**
   * Audit a profile component
   * @param {string} component - Component name
   * @param {object} data - Component data
   * @returns {object} Audit results with score and recommendations
   */
  auditComponent(component, data) {
    if (!this.auditCategories[component]) {
      throw new Error(`Unknown component: ${component}`);
    }

    const category = this.auditCategories[component];
    const scores = {};
    const recommendations = [];

    category.criteria.forEach(criterion => {
      const result = this._evaluateCriterion(component, criterion, data);
      scores[criterion] = result.score;
      if (result.recommendation) {
        recommendations.push(result.recommendation);
      }
    });

    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / category.criteria.length;
    const weightedScore = avgScore * category.weight;

    return {
      component,
      score: avgScore,
      weightedScore,
      criteriaScores: scores,
      recommendations,
      grade: this._getGrade(avgScore)
    };
  }

  /**
   * Audit entire profile
   * @param {object} profileData - Complete profile data
   * @returns {object} Comprehensive audit results
   */
  auditProfile(profileData) {
    const results = {};
    let totalWeightedScore = 0;

    Object.keys(this.auditCategories).forEach(component => {
      const componentData = profileData[component] || {};
      const audit = this.auditComponent(component, componentData);
      results[component] = audit;
      totalWeightedScore += audit.weightedScore;
    });

    return {
      componentResults: results,
      overallScore: totalWeightedScore,
      overallGrade: this._getGrade(totalWeightedScore),
      timestamp: new Date().toISOString(),
      summary: this._generateSummary(results)
    };
  }

  /**
   * Generate upgrade recommendations
   * @param {object} auditResults - Results from auditProfile
   * @returns {array} Prioritized list of recommendations
   */
  generateUpgradePlan(auditResults) {
    const allRecommendations = [];

    Object.entries(auditResults.componentResults).forEach(([component, result]) => {
      result.recommendations.forEach(rec => {
        allRecommendations.push({
          component,
          recommendation: rec,
          priority: this._calculatePriority(result.score, this.auditCategories[component].weight),
          currentScore: result.score
        });
      });
    });

    return allRecommendations.sort((a, b) => b.priority - a.priority);
  }

  _evaluateCriterion(component, criterion, data) {
    // Base evaluation logic
    let score = 0;
    let recommendation = null;

    switch (component) {
      case 'headline':
        if (criterion === 'clarity') {
          score = data.text && data.text.length > 20 && data.text.length < 120 ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Headline should be 20-120 characters for optimal clarity';
        } else if (criterion === 'keywords') {
          const keywordCount = data.keywords ? data.keywords.length : 0;
          score = Math.min(keywordCount / 3, 1.0);
          if (score < 1.0) recommendation = 'Include 3-5 relevant keywords in your headline';
        } else if (criterion === 'value_proposition') {
          score = data.hasValueProposition ? 1.0 : 0.3;
          if (score < 1.0) recommendation = 'Clearly state the value you provide to employers/clients';
        } else if (criterion === 'uniqueness') {
          score = data.isUnique ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Make your headline stand out from competitors';
        }
        break;

      case 'about':
        if (criterion === 'storytelling') {
          score = data.hasStory ? 1.0 : 0.4;
          if (score < 1.0) recommendation = 'Use the Hook-Story-Offer framework to tell your professional story';
        } else if (criterion === 'credibility') {
          score = data.hasCredibilityMarkers ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Include specific achievements, metrics, or recognitions';
        } else if (criterion === 'engagement') {
          score = data.isEngaging ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Use conversational tone and break up text into readable sections';
        } else if (criterion === 'keywords') {
          const keywordDensity = data.keywordDensity || 0;
          score = keywordDensity > 0.02 && keywordDensity < 0.08 ? 1.0 : 0.6;
          if (score < 1.0) recommendation = 'Optimize keyword density to 2-8% for searchability';
        }
        break;

      case 'experience':
        if (criterion === 'impact_metrics') {
          score = data.hasMetrics ? 1.0 : 0.4;
          if (score < 1.0) recommendation = 'Add quantifiable achievements (%, $, #) to each role';
        } else if (criterion === 'action_verbs') {
          score = data.usesActionVerbs ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Start bullet points with strong action verbs';
        } else if (criterion === 'relevance') {
          score = data.isRelevant ? 1.0 : 0.6;
          if (score < 1.0) recommendation = 'Focus on experiences relevant to your target role';
        } else if (criterion === 'specificity') {
          score = data.isSpecific ? 1.0 : 0.5;
          if (score < 1.0) recommendation = 'Be specific about tools, technologies, and outcomes';
        }
        break;

      default:
        score = 0.7; // Default moderate score
    }

    return { score, recommendation };
  }

  _getGrade(score) {
    if (score >= 0.9) return 'A+';
    if (score >= 0.8) return 'A';
    if (score >= 0.7) return 'B';
    if (score >= 0.6) return 'C';
    if (score >= 0.5) return 'D';
    return 'F';
  }

  _calculatePriority(currentScore, componentWeight) {
    // Higher priority for low scores in high-weight components
    const improvementPotential = 1.0 - currentScore;
    return improvementPotential * componentWeight * 100;
  }

  _generateSummary(results) {
    const strengths = [];
    const weaknesses = [];

    Object.entries(results).forEach(([component, result]) => {
      if (result.score >= 0.8) {
        strengths.push(component);
      } else if (result.score < 0.6) {
        weaknesses.push(component);
      }
    });

    return {
      strengths,
      weaknesses,
      topPriority: weaknesses.length > 0 ? weaknesses[0] : null
    };
  }
}
