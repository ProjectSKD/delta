/**
 * Base quiz class providing common quiz functionality
 */
import ScoreTracker from '../core/score.js';
import Timer from '../core/timer.js';
import { audioManager } from '../core/audio.js';
import { updateQuestion, updateScore, updateTimer, createRestartButton, updateProgress } from '../ui/overlays.js';

export class BaseQuiz {
    constructor(config) {
        this.config = {
            maxQuestions: 25,
            maxAttempts: 3,
            requireCorrectToAdvance: false,
            ...config
        };
        
        this.scoreTracker = new ScoreTracker();
        this.timer = new Timer();
        this.items = [];
        this.currentItem = null;
        this.totalQuestions = 0;
        this.attemptsLeft = this.config.maxAttempts;
        this.requireCorrectToAdvance = false;
        this.correctLayerForCurrent = null;
        this.map = null;
        this.geoLayer = null;
        this.initialTotalItems = 0;
    }

    /**
     * Initialize the quiz
     * @param {L.Map} map - Leaflet map instance
     * @param {L.LayerGroup} geoLayer - Layer group containing quiz features
     */
    initialize(map, geoLayer) {
        this.map = map;
        this.geoLayer = geoLayer;
        this.timer.start((timeText) => updateTimer(timeText));
        this.nextQuestion();
    }

    /**
     * Handle correct answer
     * @param {L.Layer} layer - The layer that was clicked
     * @param {Object} feature - GeoJSON feature
     */
    handleCorrect(layer, feature) {
        this.scoreTracker.recordCorrect();
        audioManager.playCorrect();
        updateScore(this.scoreTracker.getFormatted());
        this.onCorrectAnswer(layer, feature);
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    /**
     * Handle incorrect answer
     * @param {L.Layer} layer - The layer that was clicked
     * @param {Object} feature - GeoJSON feature
     */
    handleIncorrect(layer, feature) {
        this.scoreTracker.recordIncorrect();
        audioManager.playIncorrect();
        updateScore(this.scoreTracker.getFormatted());
        
        if (this.requireCorrectToAdvance) {
            this.onIncorrectWhenRequired(layer, feature);
            return;
        }

        this.attemptsLeft = Math.max(0, this.attemptsLeft - 1);
        
        if (this.attemptsLeft > 0) {
            this.onIncorrectWithAttemptsLeft(layer, feature);
        } else {
            this.onIncorrectNoAttemptsLeft(layer, feature);
        }
    }

    /**
     * Move to next question
     */
    nextQuestion() {
        this.requireCorrectToAdvance = false;
        this.attemptsLeft = this.config.maxAttempts;
        
        if (this.correctLayerForCurrent) {
            this.resetCorrectLayer();
            this.correctLayerForCurrent = null;
        }

        if (this.config.maxQuestions > 0 && this.totalQuestions >= this.config.maxQuestions) {
            this.endQuiz();
            return;
        }

        if (!this.items || this.items.length === 0) {
            this.endQuiz();
            return;
        }

        if (!this.initialTotalItems) {
            this.initialTotalItems = Math.min(this.config.maxQuestions, this.items.length + this.totalQuestions);
        }

        const idx = Math.floor(Math.random() * this.items.length);
        this.currentItem = this.items.splice(idx, 1)[0];
        this.totalQuestions++;
        
        updateProgress(`${this.totalQuestions}/${this.initialTotalItems}`);
        updateQuestion(`Click on: <b>${this.currentItem}</b>`);
    }

    /**
     * End the quiz
     */
    endQuiz() {
        this.timer.stop();
        const stats = this.scoreTracker.getStats();
        updateQuestion(`Quiz finished! Final score: <b>${stats.percentage}%</b>`);
        
        if (this.geoLayer) {
            this.geoLayer.eachLayer((layer) => {
                layer.off();
            });
        }

        const restartBtn = createRestartButton();
        const questionEl = document.getElementById('question');
        if (questionEl) {
            questionEl.appendChild(restartBtn);
        }
    }

    /**
     * Reset the correct layer styling
     */
    resetCorrectLayer() {
        // Override in subclasses
    }

    /**
     * Hook for correct answer handling (override in subclasses)
     */
    onCorrectAnswer(layer, feature) {
        // Override in subclasses
    }

    /**
     * Hook for incorrect answer when correct is required (override in subclasses)
     */
    onIncorrectWhenRequired(layer, feature) {
        // Override in subclasses
    }

    /**
     * Hook for incorrect answer with attempts left (override in subclasses)
     */
    onIncorrectWithAttemptsLeft(layer, feature) {
        // Override in subclasses
    }

    /**
     * Hook for incorrect answer with no attempts left (override in subclasses)
     */
    onIncorrectNoAttemptsLeft(layer, feature) {
        // Override in subclasses
    }
}
