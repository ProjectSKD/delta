// quiz_status_badge.js
// Injects a completion status badge in the top-right corner of quiz pages

function addQuizStatusBadge() {
    // Get current quiz ID from URL parameter or page title
    const params = new URLSearchParams(window.location.search);
    const quizId = params.get('id');
    
    if (!quizId) return; // Not a parameterized quiz, might be a standalone page
    
    // Get quiz status
    const status = typeof getQuizStatus === 'function' ? getQuizStatus(quizId) : null;
    
    if (!status || status === 'never_played') return; // No badge for never-played quizzes
    
    // Get the top-right div
    const topRight = document.querySelector('.top-right');
    if (!topRight) return;
    
    // Create status badge
    const badge = document.createElement('div');
    badge.className = `quiz-status-badge ${status === 'incomplete' ? 'incomplete' : ''}`;
    
    if (status === 'completed') {
        badge.innerHTML = '✓';
        badge.title = 'Quiz Completed';
    } else if (status === 'incomplete') {
        badge.innerHTML = '◐';
        badge.title = 'Quiz Started';
    }
    
    // Add styling if not already present
    if (!document.getElementById('status-badge-styles')) {
        const style = document.createElement('style');
        style.id = 'status-badge-styles';
        style.textContent = `
            .quiz-status-badge {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                font-size: 14px;
                font-weight: 700;
                background: rgba(34, 197, 94, 0.15);
                color: #22c55e;
                border: 1.5px solid #22c55e;
            }
            .quiz-status-badge.incomplete {
                background: rgba(245, 158, 11, 0.15);
                color: #f59e0b;
                border-color: #f59e0b;
            }
        `;
        document.head.appendChild(style);
    }
    
    topRight.appendChild(badge);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addQuizStatusBadge);
} else {
    addQuizStatusBadge();
}
