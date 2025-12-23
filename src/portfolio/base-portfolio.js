/**
 * Base Portfolio Structure
 * Core portfolio architecture that can be extended
 */

export class BasePortfolio {
  constructor(config = {}) {
    this.config = {
      name: config.name || 'Portfolio',
      owner: config.owner || 'Professional',
      theme: config.theme || 'default',
      sections: config.sections || ['about', 'experience', 'skills', 'projects', 'contact'],
      ...config
    };

    this.data = {
      profile: {},
      sections: {},
      metadata: {
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
    };
  }

  /**
   * Initialize portfolio with data
   * @param {object} profileData - Profile information
   */
  initialize(profileData) {
    this.data.profile = profileData;
    this.data.metadata.lastUpdated = new Date().toISOString();
    
    // Initialize sections
    this.config.sections.forEach(section => {
      this.data.sections[section] = profileData[section] || {};
    });

    return this.data;
  }

  /**
   * Update a portfolio section
   * @param {string} section - Section name
   * @param {object} content - Section content
   */
  updateSection(section, content) {
    if (!this.config.sections.includes(section)) {
      throw new Error(`Section ${section} is not configured`);
    }

    this.data.sections[section] = content;
    this.data.metadata.lastUpdated = new Date().toISOString();

    return this.data.sections[section];
  }

  /**
   * Get portfolio section
   * @param {string} section - Section name
   * @returns {object} Section content
   */
  getSection(section) {
    return this.data.sections[section] || null;
  }

  /**
   * Get complete portfolio data
   * @returns {object} Complete portfolio
   */
  getData() {
    return {
      config: this.config,
      data: this.data
    };
  }

  /**
   * Export portfolio as JSON
   * @returns {string} JSON string
   */
  export() {
    return JSON.stringify(this.getData(), null, 2);
  }

  /**
   * Add custom section
   * @param {string} sectionName - Name of new section
   * @param {object} content - Section content
   */
  addCustomSection(sectionName, content = {}) {
    if (this.config.sections.includes(sectionName)) {
      throw new Error(`Section ${sectionName} already exists`);
    }

    this.config.sections.push(sectionName);
    this.data.sections[sectionName] = content;

    return this.data.sections[sectionName];
  }

  /**
   * Get portfolio summary
   * @returns {object} Portfolio summary
   */
  getSummary() {
    return {
      name: this.config.name,
      owner: this.config.owner,
      sections: this.config.sections,
      lastUpdated: this.data.metadata.lastUpdated,
      completeness: this._calculateCompleteness()
    };
  }

  _calculateCompleteness() {
    const totalSections = this.config.sections.length;
    const filledSections = Object.values(this.data.sections).filter(
      section => section && Object.keys(section).length > 0
    ).length;

    return {
      percentage: (filledSections / totalSections) * 100,
      filled: filledSections,
      total: totalSections
    };
  }
}
