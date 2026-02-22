/**
 * Timer module for tracking quiz duration
 */
class Timer {
    constructor() {
        this.startTime = null;
        this.timerInterval = null;
        this.onUpdate = null;
    }

    /**
     * Start the timer
     * @param {Function} onUpdate - Callback function called every second with formatted time string
     */
    start(onUpdate) {
        this.startTime = Date.now();
        this.onUpdate = onUpdate;
        this.timerInterval = setInterval(() => this.update(), 1000);
    }

    /**
     * Update timer display
     */
    update() {
        if (!this.startTime || !this.onUpdate) return;
        
        const now = Date.now();
        const elapsed = Math.floor((now - this.startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const formatted = `Time: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        this.onUpdate(formatted);
    }

    /**
     * Stop the timer
     */
    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.startTime = null;
        this.onUpdate = null;
    }

    /**
     * Get elapsed time in seconds
     * @returns {number} Elapsed time in seconds
     */
    getElapsed() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}

export default Timer;
