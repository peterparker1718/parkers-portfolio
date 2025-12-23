/**
 * Tone and Anti-AI Constraint Validators
 * Ensures content maintains authenticity and human touch
 */

export class ToneValidator {
  constructor() {
    this.toneProfiles = {
      professional: {
        avoid: ['lol', 'omg', 'literally', 'amazing', 'incredible'],
        prefer: ['demonstrated', 'achieved', 'led', 'developed', 'implemented']
      },
      conversational: {
        avoid: ['whom', 'heretofore', 'aforementioned', 'pursuant'],
        prefer: ['help', 'work with', 'team up', 'collaborate']
      },
      authentic: {
        avoid: ['synergy', 'paradigm shift', 'thought leader', 'ninja', 'rockstar', 'guru'],
        prefer: ['experienced', 'skilled', 'passionate', 'dedicated']
      }
    };

    this.aiDetectionPatterns = {
      repetitiveStructure: /^(As a|In my role|My experience|I am passionate).+(Additionally|Furthermore|Moreover).+(In conclusion|Overall|In summary)/i,
      overlyFormal: /(utilize|leverage|facilitate|optimize|strategize|synergize)/gi,
      genericPhrases: /(proven track record|results-oriented|detail-oriented|team player|go-getter|self-starter)/gi,
      excessiveSuperlatives: /(very|extremely|highly|absolutely|completely|totally)/gi,
      perfectPunctuation: /^[A-Z][^.!?]*[.!?](\s+[A-Z][^.!?]*[.!?])*$/
    };
  }

  /**
   * Validate tone against specified profile
   * @param {string} content - Content to validate
   * @param {string} targetTone - Target tone profile
   * @returns {object} Validation results
   */
  validateTone(content, targetTone = 'professional') {
    const profile = this.toneProfiles[targetTone];
    if (!profile) {
      throw new Error(`Unknown tone profile: ${targetTone}`);
    }

    const issues = [];
    const suggestions = [];

    // Check for words to avoid
    profile.avoid.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(content)) {
        issues.push(`Avoid using "${word}" for ${targetTone} tone`);
      }
    });

    // Check if preferred words are present
    const hasPreferred = profile.prefer.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(content);
    });

    if (!hasPreferred) {
      suggestions.push(`Consider using words like: ${profile.prefer.slice(0, 3).join(', ')}`);
    }

    return {
      isValid: issues.length === 0,
      tone: targetTone,
      issues,
      suggestions,
      score: this._calculateToneScore(issues, suggestions)
    };
  }

  /**
   * Detect AI-generated content patterns
   * @param {string} content - Content to analyze
   * @returns {object} Detection results with flags and recommendations
   */
  detectAIPatterns(content) {
    const flags = [];
    const humanizationSuggestions = [];

    // Check for repetitive structure
    if (this.aiDetectionPatterns.repetitiveStructure.test(content)) {
      flags.push('Repetitive structure detected');
      humanizationSuggestions.push('Vary your sentence structure and flow');
    }

    // Check for overly formal language
    const formalMatches = content.match(this.aiDetectionPatterns.overlyFormal);
    if (formalMatches && formalMatches.length > 3) {
      flags.push(`Overly formal language detected (${formalMatches.length} instances)`);
      humanizationSuggestions.push('Use simpler, more conversational alternatives');
    }

    // Check for generic phrases
    const genericMatches = content.match(this.aiDetectionPatterns.genericPhrases);
    if (genericMatches && genericMatches.length > 0) {
      flags.push(`Generic phrases detected: ${genericMatches.slice(0, 3).join(', ')}`);
      humanizationSuggestions.push('Replace generic phrases with specific examples');
    }

    // Check for excessive superlatives
    const superlativeMatches = content.match(this.aiDetectionPatterns.excessiveSuperlatives);
    if (superlativeMatches && superlativeMatches.length > 5) {
      flags.push(`Excessive use of superlatives (${superlativeMatches.length} instances)`);
      humanizationSuggestions.push('Remove unnecessary intensifiers for more authentic tone');
    }

    const authenticityScore = 1.0 - (flags.length * 0.2);

    return {
      isLikelyAI: flags.length >= 3,
      authenticityScore: Math.max(authenticityScore, 0),
      flags,
      humanizationSuggestions,
      confidence: this._calculateConfidence(flags)
    };
  }

  /**
   * Apply authenticity constraints
   * @param {string} content - Content to check
   * @returns {object} Constraint validation results
   */
  applyAuthenticityConstraints(content) {
    const constraints = {
      maxWordLength: 15, // Avoid unnecessarily long words
      minParagraphVariety: 3, // Different sentence lengths
      maxConsecutiveFormalWords: 2,
      requiredPersonalTouch: true
    };

    const results = {
      passed: [],
      failed: [],
      warnings: []
    };

    // Check word length
    const words = content.split(/\s+/);
    const longWords = words.filter(w => w.length > constraints.maxWordLength);
    if (longWords.length > words.length * 0.1) {
      results.failed.push('Too many overly long words detected');
    } else {
      results.passed.push('Word length is appropriate');
    }

    // Check sentence variety
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const lengths = sentences.map(s => s.split(/\s+/).length);
    const uniqueLengths = new Set(lengths);
    
    if (uniqueLengths.size < constraints.minParagraphVariety && sentences.length >= 3) {
      results.warnings.push('Consider varying sentence lengths for better flow');
    } else {
      results.passed.push('Good sentence variety');
    }

    // Check for personal touch
    const personalIndicators = /\b(I|my|me|we|our)\b/gi;
    const hasPersonalTouch = personalIndicators.test(content);
    
    if (constraints.requiredPersonalTouch && !hasPersonalTouch) {
      results.failed.push('Content lacks personal voice');
    } else if (hasPersonalTouch) {
      results.passed.push('Personal voice is present');
    }

    return {
      allPassed: results.failed.length === 0,
      results,
      score: results.passed.length / (results.passed.length + results.failed.length + results.warnings.length)
    };
  }

  /**
   * Comprehensive authenticity check
   * @param {string} content - Content to validate
   * @param {string} tone - Target tone
   * @returns {object} Complete authenticity assessment
   */
  validateAuthenticity(content, tone = 'professional') {
    const toneValidation = this.validateTone(content, tone);
    const aiDetection = this.detectAIPatterns(content);
    const constraints = this.applyAuthenticityConstraints(content);

    const overallScore = (
      toneValidation.score * 0.3 +
      aiDetection.authenticityScore * 0.4 +
      constraints.score * 0.3
    );

    return {
      isAuthentic: overallScore >= 0.7 && !aiDetection.isLikelyAI,
      overallScore,
      toneValidation,
      aiDetection,
      constraints,
      recommendations: this._compileRecommendations(toneValidation, aiDetection, constraints)
    };
  }

  _calculateToneScore(issues, suggestions) {
    const issueWeight = 0.7;
    const suggestionWeight = 0.3;
    
    const issueScore = Math.max(0, 1 - (issues.length * 0.2));
    const suggestionScore = suggestions.length === 0 ? 1.0 : 0.7;
    
    return (issueScore * issueWeight) + (suggestionScore * suggestionWeight);
  }

  _calculateConfidence(flags) {
    if (flags.length === 0) return 0.1;
    if (flags.length === 1) return 0.3;
    if (flags.length === 2) return 0.6;
    if (flags.length >= 3) return 0.9;
    return 0.5;
  }

  _compileRecommendations(toneValidation, aiDetection, constraints) {
    const recommendations = [];

    if (!toneValidation.isValid) {
      recommendations.push(...toneValidation.issues);
    }

    if (aiDetection.isLikelyAI) {
      recommendations.push(...aiDetection.humanizationSuggestions);
    }

    if (!constraints.allPassed) {
      constraints.results.failed.forEach(fail => {
        recommendations.push(fail);
      });
    }

    return recommendations;
  }
}
