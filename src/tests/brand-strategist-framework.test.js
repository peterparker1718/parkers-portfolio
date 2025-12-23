/**
 * Tests for Brand Strategist Framework
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BrandStrategistFramework } from '../linkedin-agent/brand-strategist-framework.js';

describe('BrandStrategistFramework', () => {
  describe('auditComponent', () => {
    it('should audit headline component', () => {
      const framework = new BrandStrategistFramework();
      const headlineData = {
        text: 'Software Engineer | Building scalable solutions',
        keywords: ['JavaScript', 'Node.js', 'React'],
        hasValueProposition: true,
        isUnique: true
      };

      const result = framework.auditComponent('headline', headlineData);

      assert.ok(result.score >= 0 && result.score <= 1);
      assert.ok(result.weightedScore >= 0);
      assert.strictEqual(result.component, 'headline');
      assert.ok(result.grade);
      assert.ok(Array.isArray(result.recommendations));
    });

    it('should throw error for unknown component', () => {
      const framework = new BrandStrategistFramework();
      
      assert.throws(() => {
        framework.auditComponent('unknown', {});
      }, /Unknown component/);
    });
  });

  describe('auditProfile', () => {
    it('should audit complete profile', () => {
      const framework = new BrandStrategistFramework();
      const profileData = {
        headline: {
          text: 'Software Engineer',
          keywords: ['JavaScript'],
          hasValueProposition: false,
          isUnique: false
        },
        about: {
          hasStory: true,
          hasCredibilityMarkers: true,
          isEngaging: true,
          keywordDensity: 0.05
        },
        experience: {
          hasMetrics: true,
          usesActionVerbs: true,
          isRelevant: true,
          isSpecific: true
        }
      };

      const result = framework.auditProfile(profileData);

      assert.ok(result.overallScore >= 0 && result.overallScore <= 1);
      assert.ok(result.overallGrade);
      assert.ok(result.componentResults);
      assert.ok(result.timestamp);
      assert.ok(result.summary);
      assert.ok(Array.isArray(result.summary.strengths));
      assert.ok(Array.isArray(result.summary.weaknesses));
    });
  });

  describe('generateUpgradePlan', () => {
    it('should generate prioritized upgrade plan', () => {
      const framework = new BrandStrategistFramework();
      const profileData = {
        headline: {
          text: 'Dev',
          keywords: [],
          hasValueProposition: false,
          isUnique: false
        }
      };

      const auditResults = framework.auditProfile(profileData);
      const upgradePlan = framework.generateUpgradePlan(auditResults);

      assert.ok(Array.isArray(upgradePlan));
      assert.ok(upgradePlan.length > 0);
      
      upgradePlan.forEach(item => {
        assert.ok(item.component);
        assert.ok(item.recommendation);
        assert.ok(typeof item.priority === 'number');
        assert.ok(typeof item.currentScore === 'number');
      });

      // Verify priorities are in descending order
      for (let i = 1; i < upgradePlan.length; i++) {
        assert.ok(upgradePlan[i - 1].priority >= upgradePlan[i].priority);
      }
    });
  });

  describe('_getGrade', () => {
    it('should return correct grades for scores', () => {
      const framework = new BrandStrategistFramework();

      assert.strictEqual(framework._getGrade(0.95), 'A+');
      assert.strictEqual(framework._getGrade(0.85), 'A');
      assert.strictEqual(framework._getGrade(0.75), 'B');
      assert.strictEqual(framework._getGrade(0.65), 'C');
      assert.strictEqual(framework._getGrade(0.55), 'D');
      assert.strictEqual(framework._getGrade(0.45), 'F');
    });
  });
});
