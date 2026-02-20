/**
 * Audio feedback module for quiz interactions
 * Provides sound effects for correct and incorrect answers
 */
class AudioManager {
    constructor() {
        this.audioContext = null;
    }

    /**
     * Initialize Web Audio API context
     */
    init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    /**
     * Play a sound with specified frequency and duration
     * @param {number} frequency - Frequency in Hz
     * @param {number} duration - Duration in seconds
     */
    playSound(frequency, duration = 0.3) {
        this.init();
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.frequency.value = frequency;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        
        osc.start(now);
        osc.stop(now + duration);
    }

    /**
     * Play sound for correct answer
     */
    playCorrect() {
        this.playSound(800, 0.3);
    }

    /**
     * Play sound for incorrect answer
     */
    playIncorrect() {
        this.playSound(400, 0.3);
    }
}

// Export singleton instance
export const audioManager = new AudioManager();
