/**
 * Tests for Tone Validator
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ToneValidator } from '../linkedin-agent/tone-validator.js';

describe('ToneValidator', () => {
  describe('validateTone', () => {
    it('should validate professional tone', () => {
      const validator = new ToneValidator();
      const content = 'Developed and implemented a scalable solution.';

      const result = validator.validateTone(content, 'professional');

      assert.ok(result.tone === 'professional');
      assert.ok(Array.isArray(result.issues));
      assert.ok(Array.isArray(result.suggestions));
      assert.ok(typeof result.score === 'number');
    });

    it('should detect unprofessional words', () => {
      const validator = new ToneValidator();
      const content = 'OMG this is literally amazing!';

      const result = validator.validateTone(content, 'professional');

      assert.strictEqual(result.isValid, false);
      assert.ok(result.issues.length > 0);
    });

    it('should throw error for unknown tone', () => {
      const validator = new ToneValidator();

      assert.throws(() => {
        validator.validateTone('content', 'unknown');
      }, /Unknown tone profile/);
    });
  });

  describe('detectAIPatterns', () => {
    it('should detect overly formal language', () => {
      const validator = new ToneValidator();
      const content = 'I will utilize and leverage my skills to facilitate and optimize synergistic outcomes.';

      const result = validator.detectAIPatterns(content);

      assert.ok(Array.isArray(result.flags));
      assert.ok(Array.isArray(result.humanizationSuggestions));
      assert.ok(typeof result.authenticityScore === 'number');
      assert.ok(typeof result.isLikelyAI === 'boolean');
    });

    it('should detect generic phrases', () => {
      const validator = new ToneValidator();
      const content = 'I am a results-oriented team player with a proven track record.';

      const result = validator.detectAIPatterns(content);

      assert.ok(result.flags.some(f => f.includes('Generic phrases')));
    });

    it('should not flag natural content', () => {
      const validator = new ToneValidator();
      const content = 'I love building web applications. My recent project helped users save time.';

      const result = validator.detectAIPatterns(content);

      assert.strictEqual(result.isLikelyAI, false);
      assert.ok(result.authenticityScore > 0.5);
    });
  });

  describe('applyAuthenticityConstraints', () => {
    it('should check for personal touch', () => {
      const validator = new ToneValidator();
      const content = 'The project was completed successfully.';

      const result = validator.applyAuthenticityConstraints(content);

      assert.ok(result.results.failed.some(f => f.includes('personal voice')));
    });

    it('should pass with personal voice', () => {
      const validator = new ToneValidator();
      const content = 'I completed the project successfully and learned a lot.';

      const result = validator.applyAuthenticityConstraints(content);

      assert.ok(result.results.passed.some(p => p.includes('Personal voice')));
    });

    it('should check sentence variety', () => {
      const validator = new ToneValidator();
      const content = 'I work. I code. I test. I deploy.';

      const result = validator.applyAuthenticityConstraints(content);

      assert.ok(result.results.warnings.length > 0 || result.results.passed.length > 0);
    });
  });

  describe('validateAuthenticity', () => {
    it('should perform comprehensive authenticity check', () => {
      const validator = new ToneValidator();
      const content = 'I am passionate about developing web applications. My experience includes building scalable systems.';

      const result = validator.validateAuthenticity(content, 'professional');

      assert.ok(typeof result.isAuthentic === 'boolean');
      assert.ok(typeof result.overallScore === 'number');
      assert.ok(result.toneValidation);
      assert.ok(result.aiDetection);
      assert.ok(result.constraints);
      assert.ok(Array.isArray(result.recommendations));
    });

    it('should flag inauthentic AI content', () => {
      const validator = new ToneValidator();
      const content = 'As a results-oriented professional, I will leverage my expertise to facilitate synergistic outcomes. Furthermore, I will optimize and strategize to deliver value. Moreover, my proven track record demonstrates excellence.';

      const result = validator.validateAuthenticity(content, 'professional');

      // This content should have AI detection flags
      assert.ok(result.aiDetection.flags.length > 0);
      assert.ok(result.aiDetection.authenticityScore < 1.0);
    });

    it('should accept authentic content', () => {
      const validator = new ToneValidator();
      const content = 'I build web applications that help people work more efficiently. In my last role, I created a tool that saved our team 10 hours per week.';

      const result = validator.validateAuthenticity(content, 'conversational');

      assert.ok(result.overallScore > 0.6);
    });
  });
});
