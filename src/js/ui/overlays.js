/**
 * UI overlay components for quiz interface
 */

/**
 * Create quiz overlay container
 * @param {string} quizTitle - Title of the quiz
 * @returns {HTMLElement} Overlay container element
 */
export function createOverlayContainer(quizTitle) {
    const container = document.createElement('div');
    container.id = 'map-overlays';

    // Quiz title (top-left)
    const title = document.createElement('div');
    title.className = 'overlay top-left';
    
    // Back button
    const backBtn = document.createElement('a');
    backBtn.href = '/';
    backBtn.className = 'back-btn';
    backBtn.title = 'Back to Home';
    backBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>';
    
    // Title text
    const textSpan = document.createElement('span');
    textSpan.textContent = `Quiz: ${quizTitle}`;
    
    title.appendChild(backBtn);
    title.appendChild(textSpan);
    container.appendChild(title);

    // Score and timer (top-right)
    const scoreContainer = document.createElement('div');
    scoreContainer.id = 'score';
    scoreContainer.className = 'overlay top-right';
    
    // Progress indicator
    const progressText = document.createElement('span');
    progressText.id = 'progress-text';
    progressText.style.cssText = 'margin-right: 12px; font-weight: 600; color: #5a7a9a;';
    progressText.textContent = '0/0';
    scoreContainer.appendChild(progressText);

    const scoreText = document.createElement('span');
    scoreText.id = 'score-text';
    scoreText.textContent = 'Score: 0%';
    const timer = document.createElement('span');
    timer.id = 'timer';
    timer.style.cssText = 'margin-left: 12px; font-weight: 400; font-size: 15px;';
    scoreContainer.appendChild(scoreText);
    scoreContainer.appendChild(timer);
    container.appendChild(scoreContainer);

    // Question (center-top)
    const question = document.createElement('div');
    question.id = 'question';
    question.className = 'overlay center-top';
    question.textContent = 'Loading...';
    container.appendChild(question);

    return container;
}

/**
 * Update question display
 * @param {string} text - Question text
 */
export function updateQuestion(text) {
    const questionEl = document.getElementById('question');
    if (questionEl) {
        questionEl.innerHTML = text;
    }
}

/**
 * Update progress display
 * @param {string} progressText - Formatted progress text
 */
export function updateProgress(progressText) {
    const progressEl = document.getElementById('progress-text');
    if (progressEl) {
        progressEl.textContent = progressText;
    }
}

/**
 * Update score display
 * @param {string} scoreText - Formatted score text
 */
export function updateScore(scoreText) {
    const scoreEl = document.getElementById('score-text');
    if (scoreEl) {
        scoreEl.textContent = scoreText;
    }
}

/**
 * Update timer display
 * @param {string} timeText - Formatted time text
 */
export function updateTimer(timeText) {
    const timerEl = document.getElementById('timer');
    if (timerEl) {
        timerEl.textContent = timeText;
    }
}

/**
 * Create restart button
 * @returns {HTMLButtonElement} Restart button element
 */
export function createRestartButton() {
    const button = document.createElement('button');
    button.textContent = 'Restart Quiz';
    button.style.cssText = 'margin-left: 15px; padding: 5px 12px; border-radius: 4px; border: 1px solid #0077be; background: #fff; color: #0077be; cursor: pointer; font-weight: bold;';
    button.onclick = () => location.reload();
    return button;
}
