/**
 * Tests for Content Modules
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ContentModules } from '../linkedin-agent/content-modules.js';

describe('ContentModules', () => {
  describe('hookCredibilityKeywords', () => {
    it('should generate content with HCK formula', () => {
      const result = ContentModules.hookCredibilityKeywords(
        'Transforming business challenges',
        ['10+ projects', 'AWS Certified'],
        ['JavaScript', 'Python', 'Cloud']
      );

      assert.ok(result.hook);
      assert.ok(result.credibility);
      assert.ok(result.keywords);
      assert.ok(result.combined);
      assert.ok(result.score >= 0 && result.score <= 1);
    });

    it('should throw error if components are missing', () => {
      assert.throws(() => {
        ContentModules.hookCredibilityKeywords('hook', null, ['keywords']);
      }, /All three components/);
    });
  });

  describe('hookStoryOffer', () => {
    it('should generate narrative with HSO framework', () => {
      const result = ContentModules.hookStoryOffer(
        'Passionate about technology',
        'With 5 years experience...',
        'Let\'s connect'
      );

      assert.ok(result.hook);
      assert.ok(result.story);
      assert.ok(result.offer);
      assert.ok(result.combined);
      assert.ok(result.overallScore >= 0 && result.overallScore <= 1);
    });

    it('should throw error if components are missing', () => {
      assert.throws(() => {
        ContentModules.hookStoryOffer('hook', 'story', null);
      }, /All three components/);
    });
  });

  describe('createHeadline', () => {
    it('should create headline with all components', () => {
      const result = ContentModules.createHeadline(
        'Software Engineer',
        'Building scalable apps',
        'AI Specialist'
      );

      assert.ok(result.text.includes('Software Engineer'));
      assert.ok(result.text.includes('Building scalable apps'));
      assert.ok(result.text.includes('AI Specialist'));
      assert.ok(typeof result.length === 'number');
      assert.ok(typeof result.isOptimal === 'boolean');
      assert.ok(Array.isArray(result.recommendations));
    });

    it('should create headline with only role', () => {
      const result = ContentModules.createHeadline('Developer');

      assert.strictEqual(result.text, 'Developer');
      assert.ok(result.recommendations.length > 0); // Should recommend improvements
    });

    it('should throw error if role is missing', () => {
      assert.throws(() => {
        ContentModules.createHeadline(null);
      }, /Role is required/);
    });
  });

  describe('buildAboutSection', () => {
    it('should build about section using HSO framework', () => {
      const result = ContentModules.buildAboutSection({
        passion: 'Love coding',
        background: 'Started as developer',
        achievements: ['Built app with 100K users', 'Led team of 5'],
        offer: 'Open to collaboration'
      });

      assert.ok(result.hook);
      assert.ok(result.story);
      assert.ok(result.offer);
      assert.ok(result.combined);
    });
  });

  describe('generateExperienceBullet', () => {
    it('should generate complete bullet point', () => {
      const result = ContentModules.generateExperienceBullet(
        'Led development of',
        'e-commerce platform',
        'increased sales',
        '40%'
      );

      assert.ok(result.text.includes('Led development of'));
      assert.ok(result.text.includes('e-commerce platform'));
      assert.ok(result.text.includes('increased sales'));
      assert.ok(result.text.includes('40%'));
      assert.strictEqual(result.hasAction, true);
      assert.strictEqual(result.hasContext, true);
      assert.strictEqual(result.hasResult, true);
      assert.strictEqual(result.hasMetric, true);
      assert.strictEqual(result.completeness, 1.0);
    });

    it('should generate partial bullet point', () => {
      const result = ContentModules.generateExperienceBullet(
        'Developed',
        'web application',
        null,
        null
      );

      assert.ok(result.text.includes('Developed'));
      assert.strictEqual(result.hasAction, true);
      assert.strictEqual(result.hasContext, true);
      assert.strictEqual(result.hasResult, false);
      assert.strictEqual(result.hasMetric, false);
      assert.ok(result.completeness < 1.0);
      assert.ok(result.recommendations.length > 0);
    });
  });
});
