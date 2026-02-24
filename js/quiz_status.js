// quiz_status.js — localStorage-based quiz progress tracker
// Statuses: "completed" | "incomplete" | "never_played"

const STORAGE_KEY = 'geo_quiz_status';

function _loadStore() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function _saveStore(store) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) { /* quota exceeded — silently fail */ }
}

/**
 * Get the play status of a specific quiz.
 * @param {string} quizId — the key from QUIZ_CONFIG
 * @returns {"completed"|"incomplete"|"never_played"}
 */
function getQuizStatus(quizId) {
    const store = _loadStore();
    if (!store[quizId]) return 'never_played';
    return store[quizId].status || 'never_played';
}

/**
 * Get the full stored data object for a quiz.
 * @param {string} quizId
 * @returns {object|null}
 */
function getQuizData(quizId) {
    const store = _loadStore();
    return store[quizId] || null;
}

/**
 * Save the result of a quiz attempt.
 * @param {string} quizId
 * @param {"completed"|"incomplete"} status
 * @param {number} score — percentage 0-100
 * @param {number} totalQ — total questions
 * @param {number} correctA — correct answers
 */
function saveQuizResult(quizId, status, score, totalQ, correctA) {
    const store = _loadStore();
    store[quizId] = {
        status: status,
        score: score,
        totalQuestions: totalQ,
        correctAnswers: correctA,
        lastPlayed: new Date().toISOString()
    };
    _saveStore(store);
}

/**
 * Get progress stats for a given category.
 * @param {string} category — e.g. "WORLD", "INDIA"
 * @returns {{ completed: number, total: number }}
 */
function getCategoryProgress(category) {
    if (typeof QUIZ_CONFIG === 'undefined') return { completed: 0, total: 0 };
    const store = _loadStore();
    let completed = 0;
    let total = 0;
    Object.keys(QUIZ_CONFIG).forEach(id => {
        const cfg = QUIZ_CONFIG[id];
        if (cfg.category !== category) return;
        if (cfg.is_placeholder) return;
        total++;
        if (store[id] && store[id].status === 'completed') completed++;
    });
    return { completed, total };
}

/**
 * Try to detect the quiz ID from the current page URL.
 * Matches against external_url patterns in QUIZ_CONFIG.
 * @returns {string|null}
 */
function detectQuizId() {
    if (typeof QUIZ_CONFIG === 'undefined') return null;
    const currentPage = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const currentParams = new URLSearchParams(window.location.search);

    function parseExtUrl(extUrl) {
        const norm = String(extUrl || '').replace(/^quizzes\//, '');
        const [pageRaw, queryRaw = ''] = norm.split('?');
        return {
            page: pageRaw.toLowerCase(),
            params: new URLSearchParams(queryRaw)
        };
    }

    function normalizeForExact(page, params) {
        const sorted = Array.from(params.entries())
            .sort((a, b) => (a[0] + '=' + a[1]).localeCompare(b[0] + '=' + b[1]));
        const query = sorted.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
        return page + (query ? ('?' + query) : '');
    }

    // 1) Exact page + normalized query match
    const currentNormalized = normalizeForExact(currentPage, currentParams);
    for (const [id, cfg] of Object.entries(QUIZ_CONFIG)) {
        if (!cfg.external_url) continue;
        const ext = parseExtUrl(cfg.external_url);
        if (normalizeForExact(ext.page, ext.params) === currentNormalized) return id;
    }

    // 2) Page + ext params subset match (handles query ordering/encoding differences)
    let bestSubset = null;
    let bestSubsetCount = -1;
    for (const [id, cfg] of Object.entries(QUIZ_CONFIG)) {
        if (!cfg.external_url) continue;
        const ext = parseExtUrl(cfg.external_url);
        if (ext.page !== currentPage) continue;

        let isSubset = true;
        let matchCount = 0;
        for (const [k, v] of ext.params.entries()) {
            if (currentParams.get(k) !== v) {
                isSubset = false;
                break;
            }
            matchCount++;
        }
        if (isSubset && matchCount > bestSubsetCount) {
            bestSubset = id;
            bestSubsetCount = matchCount;
        }
    }
    if (bestSubset) return bestSubset;

    // 3) Single page-only match fallback
    const pageOnlyMatches = [];
    for (const [id, cfg] of Object.entries(QUIZ_CONFIG)) {
        if (!cfg.external_url) continue;
        const ext = parseExtUrl(cfg.external_url);
        if (ext.page === currentPage) pageOnlyMatches.push(id);
    }
    if (pageOnlyMatches.length === 1) return pageOnlyMatches[0];

    return null;
}

/**
 * Auto-save quiz status on page unload (marks as incomplete if quiz is in progress).
 * Call this at quiz start to set up the beforeunload handler.
 * @param {string} quizId
 */
function setupAutoSave(quizId) {
    if (!quizId) return;
    window.__detectedQuizId = quizId;
    window.addEventListener('beforeunload', function () {
        const existing = getQuizStatus(quizId);
        if (existing !== 'completed') {
            saveQuizResult(quizId, 'incomplete', 0, 0, 0);
        }
    });
}

/**
 * Helper to save completed status from standalone quiz endQuiz functions.
 * Call: saveStandaloneQuizResult(score, totalQ, correctA)
 */
function saveStandaloneQuizResult(score, totalQ, correctA) {
    const qid = window.__detectedQuizId || window.__quizEngineId;
    if (qid) {
        saveQuizResult(qid, 'completed', score, totalQ, correctA);
    }
}

// Auto-initialize: detect quiz ID and set up tracking on page load
document.addEventListener('DOMContentLoaded', function () {
    if (!window.__quizEngineId) {
        // Standalone quiz — try to auto-detect
        const detected = detectQuizId();
        if (detected) {
            setupAutoSave(detected);
        }
    }
});
