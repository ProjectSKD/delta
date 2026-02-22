/**
 * Score tracking module for quiz performance
 */
class ScoreTracker {
    constructor() {
        this.correctAnswers = 0;
        this.totalAttempts = 0;
    }

    /**
     * Record a correct answer
     */
    recordCorrect() {
        this.correctAnswers++;
        this.totalAttempts++;
    }

    /**
     * Record an incorrect answer
     */
    recordIncorrect() {
        this.totalAttempts++;
    }

    /**
     * Get current score percentage
     * @returns {number} Score percentage (0-100)
     */
    getPercentage() {
        if (this.totalAttempts === 0) return 0;
        return Math.round((this.correctAnswers / this.totalAttempts) * 100);
    }

    /**
     * Get formatted score string
     * @returns {string} Formatted score (e.g., "Score: 85%")
     */
    getFormatted() {
        return `Score: ${this.getPercentage()}%`;
    }

    /**
     * Reset score tracking
     */
    reset() {
        this.correctAnswers = 0;
        this.totalAttempts = 0;
    }

    /**
     * Get raw statistics
     * @returns {Object} Object with correctAnswers and totalAttempts
     */
    getStats() {
        return {
            correct: this.correctAnswers,
            total: this.totalAttempts,
            percentage: this.getPercentage()
        };
    }
}

export default ScoreTracker;
