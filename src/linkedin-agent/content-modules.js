/**
 * Specialized Content Modules
 * Content generation using strategic formulas
 */

export class ContentModules {
  /**
   * Hook × Credibility × Keywords Formula
   * Creates compelling content that balances engagement, trust, and discoverability
   */
  static hookCredibilityKeywords(hook, credibility, keywords) {
    if (!hook || !credibility || !keywords) {
      throw new Error('All three components (hook, credibility, keywords) are required');
    }

    const content = {
      hook: {
        text: hook,
        strength: this._evaluateHookStrength(hook)
      },
      credibility: {
        markers: credibility,
        strength: this._evaluateCredibility(credibility)
      },
      keywords: {
        list: keywords,
        integration: this._evaluateKeywordIntegration(keywords)
      },
      combined: this._combineHCK(hook, credibility, keywords),
      score: 0
    };

    content.score = (content.hook.strength + content.credibility.strength + content.keywords.integration) / 3;
    
    return content;
  }

  /**
   * Hook-Story-Offer Framework
   * Three-part narrative structure for compelling profile sections
   */
  static hookStoryOffer(hook, story, offer) {
    if (!hook || !story || !offer) {
      throw new Error('All three components (hook, story, offer) are required');
    }

    const narrative = {
      hook: {
        text: hook,
        type: this._classifyHook(hook),
        effectiveness: this._evaluateHookStrength(hook)
      },
      story: {
        text: story,
        structure: this._analyzeStoryStructure(story),
        engagement: this._evaluateStoryEngagement(story)
      },
      offer: {
        text: offer,
        clarity: this._evaluateOfferClarity(offer),
        appeal: this._evaluateOfferAppeal(offer)
      },
      combined: `${hook}\n\n${story}\n\n${offer}`,
      overallScore: 0
    };

    narrative.overallScore = (
      narrative.hook.effectiveness +
      narrative.story.engagement +
      narrative.offer.clarity
    ) / 3;

    return narrative;
  }

  /**
   * Headline Formula: Role + Value + Differentiator
   */
  static createHeadline(role, value, differentiator) {
    if (!role) throw new Error('Role is required');
    
    const components = [role];
    if (value) components.push(`| ${value}`);
    if (differentiator) components.push(`| ${differentiator}`);
    
    const headline = components.join(' ');
    
    return {
      text: headline,
      length: headline.length,
      isOptimal: headline.length >= 20 && headline.length <= 120,
      components: { role, value, differentiator },
      recommendations: this._getHeadlineRecommendations(headline)
    };
  }

  /**
   * About Section Builder using Hook-Story-Offer
   */
  static buildAboutSection(profile) {
    const { passion, background, achievements, offer } = profile;
    
    // Hook: Start with passion or unique angle
    const hook = passion || "Passionate about creating impact through innovative solutions.";
    
    // Story: Background and journey
    const story = this._buildStoryFromBackground(background, achievements);
    
    // Offer: What you provide
    const offerText = offer || "Let's connect to explore how we can collaborate.";
    
    return this.hookStoryOffer(hook, story, offerText);
  }

  /**
   * Experience Bullet Point Generator
   * Creates impact-focused bullet points with metrics
   */
  static generateExperienceBullet(action, context, result, metric) {
    const parts = [];
    
    if (action) parts.push(action);
    if (context) parts.push(context);
    if (result && metric) {
      parts.push(`resulting in ${result} (${metric})`);
    } else if (result) {
      parts.push(`resulting in ${result}`);
    }
    
    const bullet = parts.join(' ');
    
    return {
      text: bullet,
      hasAction: !!action,
      hasContext: !!context,
      hasResult: !!result,
      hasMetric: !!metric,
      completeness: this._evaluateBulletCompleteness(action, context, result, metric),
      recommendations: this._getBulletRecommendations(action, context, result, metric)
    };
  }

  // Private helper methods

  static _evaluateHookStrength(hook) {
    let score = 0.5;
    
    if (hook.length > 10 && hook.length < 100) score += 0.2;
    if (hook.match(/\?|!|fascinating|unique|passionate/i)) score += 0.2;
    if (hook.split(' ').length >= 5) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  static _evaluateCredibility(credibility) {
    if (Array.isArray(credibility)) {
      return Math.min(credibility.length / 3, 1.0);
    }
    
    const markers = credibility.split(',').map(s => s.trim()).filter(s => s.length > 0);
    return Math.min(markers.length / 3, 1.0);
  }

  static _evaluateKeywordIntegration(keywords) {
    const keywordArray = Array.isArray(keywords) ? keywords : keywords.split(',').map(s => s.trim());
    
    if (keywordArray.length === 0) return 0;
    if (keywordArray.length >= 3 && keywordArray.length <= 7) return 1.0;
    if (keywordArray.length < 3) return 0.6;
    return 0.8; // Too many keywords
  }

  static _combineHCK(hook, credibility, keywords) {
    const keywordArray = Array.isArray(keywords) ? keywords : keywords.split(',').map(s => s.trim());
    const credArray = Array.isArray(credibility) ? credibility : credibility.split(',').map(s => s.trim());
    
    let combined = `${hook} `;
    
    if (credArray.length > 0) {
      combined += `With proven experience in ${credArray.join(', ')}, `;
    }
    
    if (keywordArray.length > 0) {
      combined += `specializing in ${keywordArray.slice(0, 3).join(', ')}.`;
    }
    
    return combined;
  }

  static _classifyHook(hook) {
    if (hook.match(/\?$/)) return 'question';
    if (hook.match(/!/)) return 'exclamation';
    if (hook.match(/^(I|We|My)/)) return 'personal';
    if (hook.match(/^(What|How|Why)/)) return 'informative';
    return 'statement';
  }

  static _analyzeStoryStructure(story) {
    const sentences = story.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return {
      sentences: sentences.length,
      hasChallenge: story.toLowerCase().includes('challenge') || story.toLowerCase().includes('problem'),
      hasGrowth: story.toLowerCase().includes('grew') || story.toLowerCase().includes('learned'),
      hasImpact: /\d+%|\$\d+|led to|resulted in/i.test(story)
    };
  }

  static _evaluateStoryEngagement(story) {
    let score = 0.5;
    const structure = this._analyzeStoryStructure(story);
    
    if (structure.sentences >= 3 && structure.sentences <= 6) score += 0.2;
    if (structure.hasChallenge) score += 0.1;
    if (structure.hasGrowth) score += 0.1;
    if (structure.hasImpact) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  static _evaluateOfferClarity(offer) {
    let score = 0.5;
    
    if (offer.match(/connect|collaborate|partner|hire|consult/i)) score += 0.3;
    if (offer.match(/help|assist|support|provide/i)) score += 0.2;
    
    return Math.min(score, 1.0);
  }

  static _evaluateOfferAppeal(offer) {
    let score = 0.5;
    
    if (offer.length > 20 && offer.length < 150) score += 0.2;
    if (offer.match(/value|benefit|results|success/i)) score += 0.2;
    if (!offer.match(/generic|standard|typical/i)) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  static _buildStoryFromBackground(background, achievements) {
    let story = background || "My professional journey has been focused on continuous growth and impact.";
    
    if (achievements && Array.isArray(achievements) && achievements.length > 0) {
      story += " " + achievements.slice(0, 2).join(' ');
    }
    
    return story;
  }

  static _getHeadlineRecommendations(headline) {
    const recs = [];
    
    if (headline.length < 20) {
      recs.push('Headline is too short. Add more detail about your value proposition.');
    }
    if (headline.length > 120) {
      recs.push('Headline is too long. LinkedIn may truncate it in search results.');
    }
    if (!headline.includes('|') && headline.length < 50) {
      recs.push('Consider adding a value proposition or differentiator separated by |');
    }
    
    return recs;
  }

  static _evaluateBulletCompleteness(action, context, result, metric) {
    let score = 0;
    if (action) score += 0.25;
    if (context) score += 0.25;
    if (result) score += 0.25;
    if (metric) score += 0.25;
    return score;
  }

  static _getBulletRecommendations(action, context, result, metric) {
    const recs = [];
    
    if (!action) recs.push('Start with a strong action verb');
    if (!context) recs.push('Add context about what you worked on');
    if (!result) recs.push('Include the outcome or impact');
    if (!metric) recs.push('Add a quantifiable metric (%, $, #) to show impact');
    
    return recs;
  }
}
