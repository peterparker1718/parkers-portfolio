/**
 * Interview Mode for Content Generation
 * Interactive question-based content creation
 */

export class InterviewMode {
  constructor() {
    this.interviewFlows = {
      headline: [
        { id: 'role', question: 'What is your current or target role?', required: true },
        { id: 'specialty', question: 'What is your main area of expertise?', required: true },
        { id: 'value', question: 'What unique value do you provide?', required: false },
        { id: 'differentiator', question: 'What makes you different from others in your field?', required: false }
      ],
      about: [
        { id: 'passion', question: 'What are you most passionate about in your work?', required: true },
        { id: 'background', question: 'What is your professional background? (Brief summary)', required: true },
        { id: 'achievement1', question: 'What is your most significant achievement?', required: true },
        { id: 'achievement2', question: 'What is another key accomplishment?', required: false },
        { id: 'currentFocus', question: 'What are you currently working on or focused on?', required: true },
        { id: 'offer', question: 'What do you want to offer to your network?', required: true }
      ],
      experience: [
        { id: 'role', question: 'What was your role/title?', required: true },
        { id: 'action', question: 'What did you do? (Start with an action verb)', required: true },
        { id: 'context', question: 'What was the context or project?', required: true },
        { id: 'result', question: 'What was the result or impact?', required: true },
        { id: 'metric', question: 'Can you quantify it? (%, $, #)', required: false }
      ]
    };

    this.currentSession = null;
  }

  /**
   * Start a new interview session
   * @param {string} section - Profile section to create content for
   * @returns {object} Session information and first question
   */
  startInterview(section) {
    if (!this.interviewFlows[section]) {
      throw new Error(`No interview flow defined for section: ${section}`);
    }

    this.currentSession = {
      section,
      questions: this.interviewFlows[section],
      currentQuestionIndex: 0,
      answers: {},
      startTime: new Date().toISOString()
    };

    return {
      sessionId: this._generateSessionId(),
      section,
      totalQuestions: this.currentSession.questions.length,
      currentQuestion: this._getCurrentQuestion()
    };
  }

  /**
   * Submit an answer and get the next question
   * @param {string} answer - Answer to current question
   * @returns {object} Next question or completion status
   */
  submitAnswer(answer) {
    if (!this.currentSession) {
      throw new Error('No active interview session');
    }

    const currentQuestion = this._getCurrentQuestion();
    
    if (!answer && currentQuestion.required) {
      return {
        error: 'This question is required',
        question: currentQuestion,
        canSkip: false
      };
    }

    // Store the answer
    this.currentSession.answers[currentQuestion.id] = answer || '';
    this.currentSession.currentQuestionIndex++;

    // Check if interview is complete
    if (this.currentSession.currentQuestionIndex >= this.currentSession.questions.length) {
      return this._completeInterview();
    }

    return {
      progress: this.currentSession.currentQuestionIndex / this.currentSession.questions.length,
      currentQuestion: this._getCurrentQuestion(),
      questionNumber: this.currentSession.currentQuestionIndex + 1,
      totalQuestions: this.currentSession.questions.length
    };
  }

  /**
   * Skip current question (if optional)
   * @returns {object} Next question or error
   */
  skipQuestion() {
    if (!this.currentSession) {
      throw new Error('No active interview session');
    }

    const currentQuestion = this._getCurrentQuestion();
    
    if (currentQuestion.required) {
      return {
        error: 'Cannot skip required question',
        question: currentQuestion,
        canSkip: false
      };
    }

    return this.submitAnswer('');
  }

  /**
   * Go back to previous question
   * @returns {object} Previous question
   */
  goBack() {
    if (!this.currentSession) {
      throw new Error('No active interview session');
    }

    if (this.currentSession.currentQuestionIndex === 0) {
      return {
        error: 'Already at first question',
        question: this._getCurrentQuestion()
      };
    }

    this.currentSession.currentQuestionIndex--;
    
    return {
      currentQuestion: this._getCurrentQuestion(),
      questionNumber: this.currentSession.currentQuestionIndex + 1,
      totalQuestions: this.currentSession.questions.length,
      previousAnswer: this.currentSession.answers[this._getCurrentQuestion().id]
    };
  }

  /**
   * Get interview summary
   * @returns {object} Summary of all answers
   */
  getSummary() {
    if (!this.currentSession) {
      throw new Error('No active interview session');
    }

    return {
      section: this.currentSession.section,
      answers: this.currentSession.answers,
      completedQuestions: Object.keys(this.currentSession.answers).length,
      totalQuestions: this.currentSession.questions.length,
      isComplete: this.currentSession.currentQuestionIndex >= this.currentSession.questions.length
    };
  }

  /**
   * Reset current session
   */
  reset() {
    this.currentSession = null;
  }

  // Private methods

  _getCurrentQuestion() {
    if (!this.currentSession) return null;
    return this.currentSession.questions[this.currentSession.currentQuestionIndex];
  }

  _completeInterview() {
    const content = this._generateContentFromAnswers();
    const summary = this.getSummary();

    return {
      isComplete: true,
      summary,
      generatedContent: content,
      completedAt: new Date().toISOString()
    };
  }

  _generateContentFromAnswers() {
    const { section, answers } = this.currentSession;

    switch (section) {
      case 'headline':
        return this._generateHeadline(answers);
      case 'about':
        return this._generateAbout(answers);
      case 'experience':
        return this._generateExperience(answers);
      default:
        return answers;
    }
  }

  _generateHeadline(answers) {
    const parts = [];
    
    if (answers.role) parts.push(answers.role);
    if (answers.specialty) parts.push(answers.specialty);
    
    let headline = parts.join(' - ');
    
    if (answers.value) {
      headline += ` | ${answers.value}`;
    }
    if (answers.differentiator) {
      headline += ` | ${answers.differentiator}`;
    }

    return {
      text: headline,
      length: headline.length,
      components: answers
    };
  }

  _generateAbout(answers) {
    const sections = [];

    // Hook
    if (answers.passion) {
      sections.push(answers.passion);
    }

    // Story
    const storyParts = [];
    if (answers.background) storyParts.push(answers.background);
    if (answers.achievement1) storyParts.push(answers.achievement1);
    if (answers.achievement2) storyParts.push(answers.achievement2);
    if (storyParts.length > 0) {
      sections.push(storyParts.join(' '));
    }

    // Current focus
    if (answers.currentFocus) {
      sections.push(`Currently, ${answers.currentFocus}`);
    }

    // Offer
    if (answers.offer) {
      sections.push(answers.offer);
    }

    return {
      text: sections.join('\n\n'),
      structure: 'Hook-Story-Offer',
      components: answers
    };
  }

  _generateExperience(answers) {
    const parts = [];
    
    if (answers.action) parts.push(answers.action);
    if (answers.context) parts.push(answers.context);
    
    let result = parts.join(' ');
    
    if (answers.result) {
      if (answers.metric) {
        result += `, resulting in ${answers.result} (${answers.metric})`;
      } else {
        result += `, resulting in ${answers.result}`;
      }
    }

    return {
      text: result,
      role: answers.role,
      hasMetric: !!answers.metric,
      components: answers
    };
  }

  _generateSessionId() {
    return `interview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
