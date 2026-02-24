let audioContext = null;
let currentQuestionName = '';
let wrongQuestionsSet = new Set();

const RETEST_QUERY_PARAM = 'retest';
const RETEST_QUERY_VALUE = 'wrong';

function normalizeQuestionName(value) {
    return String(value || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getRetestContextKey() {
    const params = new URLSearchParams(window.location.search);
    params.delete(RETEST_QUERY_PARAM);
    const query = params.toString();
    const key = window.location.pathname + (query ? ('?' + query) : '');
    return 'geo_retest_wrong:' + key;
}

function loadRetestWrongSetFromSession() {
    try {
        const raw = sessionStorage.getItem(getRetestContextKey());
        if (!raw) return null;
        const arr = JSON.parse(raw);
        if (!Array.isArray(arr)) return null;
        return new Set(arr.map(normalizeQuestionName).filter(Boolean));
    } catch (e) {
        return null;
    }
}

function persistWrongQuestionsForRetest() {
    try {
        sessionStorage.setItem(getRetestContextKey(), JSON.stringify(Array.from(wrongQuestionsSet)));
    } catch (e) { /* ignore */ }
}

function isRetestMode() {
    return new URLSearchParams(window.location.search).get(RETEST_QUERY_PARAM) === RETEST_QUERY_VALUE;
}

let retestWrongSet = loadRetestWrongSetFromSession();

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function playCorrectSound() {
    initAudio();
    const now = audioContext.currentTime;

    // Create a pleasant two-tone chime
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioContext.destination);

    osc1.type = 'sine';
    osc2.type = 'sine';

    // First chord (C5 + E5)
    osc1.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(659.25, now);

    // Slide to second chord (E5 + C6)
    osc1.frequency.setValueAtTime(659.25, now + 0.1);
    osc2.frequency.setValueAtTime(1046.50, now + 0.1);

    // Envelope for a bright attack and smooth release
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
}

function playIncorrectSound() {
    initAudio();
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.value = 400;
    osc.type = 'sine';

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.start(now);
    osc.stop(now + 0.3);

    // Track the current question as a wrong answer at least once.
    if (currentQuestionName) {
        wrongQuestionsSet.add(currentQuestionName);
    }
}

function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];

        if (ch === '"') {
            if (inQuotes && next === '"') {
                cell += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (!inQuotes && ch === ',') {
            row.push(cell);
            cell = '';
            continue;
        }

        if (!inQuotes && (ch === '\n' || ch === '\r')) {
            if (ch === '\r' && next === '\n') i++;
            row.push(cell);
            if (row.some(v => (v || '').trim() !== '')) rows.push(row);
            row = [];
            cell = '';
            continue;
        }

        cell += ch;
    }

    row.push(cell);
    if (row.some(v => (v || '').trim() !== '')) rows.push(row);
    return rows;
}

function triggerRippleAt(latlng, color) {
    if (!map || !latlng) return;
    if (!map.getPane('ripplePane')) {
        map.createPane('ripplePane');
        map.getPane('ripplePane').style.zIndex = 700;
        map.getPane('ripplePane').style.pointerEvents = 'none';
    }
    const rippleColor = color || '#2a7fff';

    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            const ripple = L.circleMarker(latlng, {
                pane: 'ripplePane',
                radius: 10,
                color: rippleColor,
                weight: 4,
                opacity: 1,
                fillColor: '#ffffff',
                fillOpacity: 0.08
            }).addTo(map);

            let frame = 0;
            const maxFrames = 34;
            const iv = setInterval(() => {
                frame++;
                const t = frame / maxFrames;
                ripple.setRadius(10 + (t * 85));
                ripple.setStyle({
                    opacity: 1 - t,
                    weight: Math.max(1, 4 - (t * 2.4)),
                    fillOpacity: Math.max(0, 0.08 * (1 - t))
                });
                if (frame >= maxFrames) {
                    clearInterval(iv);
                    if (map && map.hasLayer(ripple)) map.removeLayer(ripple);
                }
            }, 30);
        }, i * 180);
    }
}

function triggerCelebration(latlng, customColors) {
    if (!map || !latlng) return;
    if (!map.getPane('ripplePane')) {
        map.createPane('ripplePane');
        map.getPane('ripplePane').style.zIndex = 700;
        map.getPane('ripplePane').style.pointerEvents = 'none';
    }
    const colors = customColors || ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        const particle = L.circleMarker(latlng, {
            pane: 'ripplePane',
            radius: 4,
            color: color,
            fillColor: color,
            fillOpacity: 1,
            stroke: false
        }).addTo(map);

        let frame = 0;
        const maxFrames = 30;

        const anim = setInterval(() => {
            frame++;
            const t = frame / maxFrames;

            // Move particle outward
            const currentLatLng = particle.getLatLng();
            const newLat = currentLatLng.lat + (Math.sin(angle) * velocity * 0.0005);
            const newLng = currentLatLng.lng + (Math.cos(angle) * velocity * 0.0005);

            particle.setLatLng([newLat, newLng]);
            particle.setStyle({
                opacity: 1 - t,
                fillOpacity: 1 - t,
                radius: 4 * (1 - t / 2)
            });

            if (frame >= maxFrames) {
                clearInterval(anim);
                if (map && map.hasLayer(particle)) map.removeLayer(particle);
            }
        }, 20);
    }
}

let timerInterval = null;
let startTime = null;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (!startTime) return;
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timerEl = document.getElementById("timer");
    if (timerEl) {
        timerEl.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;
    }
}

function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = null;
}

// ─── Question Formatting & Badge ───

(function () {
    const style = document.createElement('style');
    style.textContent = `
        .q-badge {
            background: rgba(0, 119, 190, 0.12);
            color: #0077be;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.75em;
            font-weight: 800;
            margin-right: 10px;
            vertical-align: middle;
            font-family: 'Courier New', Courier, monospace;
            border: 1px solid rgba(0, 119, 190, 0.2);
        }
        /* Override for custom quiz which uses different teal theme */
        [id="quiz-header"] .q-badge {
            background: rgba(0, 137, 123, 0.1);
            color: #00897b;
            border-color: rgba(0, 137, 123, 0.2);
        }
    `;
    document.head.appendChild(style);
})();

function formatQuestion(name, current, total, isLocate = false) {
    const badge = `<span class="q-badge">${current}/${total}</span>`;
    const label = isLocate ? 'Locate: ' : '';
    return `${badge}${label}<b>${name}</b>`;
}

function setQuestion(name, current, total, isLocate = false) {
    const normalizedName = normalizeQuestionName(name);
    currentQuestionName = normalizedName;

    if (isRetestMode() && retestWrongSet && retestWrongSet.size > 0 && !retestWrongSet.has(normalizedName)) {
        if (typeof totalQuestions === 'number' && Number.isFinite(totalQuestions)) {
            totalQuestions = Math.max(0, totalQuestions - 1);
        }
        setTimeout(() => {
            if (typeof nextQuestion === 'function') nextQuestion();
        }, 0);
        return;
    }

    const el = document.getElementById("question");
    const displayName = String(name || '');
    if (el) {
        el.innerHTML = formatQuestion(displayName, current, total, isLocate);
        if (isLocate) {
            // Add instructions for Locate mode if needed
            const lowerName = displayName.toLowerCase();
            const instructions = isLocate && !lowerName.includes("district")
                ? ` (Click the highlighted item)`
                : (lowerName.includes("district") ? " (click the correct district)" : "");
            el.innerHTML += `<span style="font-size: 0.8em; font-weight: normal; opacity: 0.8;">${instructions}</span>`;
        }
    }
}

// ─── Shared Header Back Button + Persistent Answer Tooltip ───

let mapHookedForAnswerDetails = false;
let heldAnswerTooltip = null;

function getQuizMapInstance() {
    if (typeof map !== 'undefined' && map && typeof map.on === 'function') return map;
    return null;
}

function ensureHeaderBackButton() {
    const overlays = document.getElementById('map-overlays');
    if (overlays) {
        const headingTarget = overlays.querySelector('.overlay.top-left')
            || (function () {
                const titleNode = overlays.querySelector('#quiz-title');
                if (!titleNode) return null;
                return titleNode.classList.contains('overlay') ? titleNode : (titleNode.closest('.overlay') || titleNode);
            })();
        const absoluteHeadingLayout = !!(headingTarget && window.getComputedStyle(headingTarget).position === 'absolute');

        let button = overlays.querySelector('.back-btn');
        if (!button) {
            button = document.createElement('a');
            button.href = '../index.html';
            button.className = 'back-btn header-back-btn';
            button.setAttribute('aria-label', 'Back to home');
            button.setAttribute('title', 'Back');
            button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';

            if (headingTarget && headingTarget.parentNode === overlays) {
                overlays.insertBefore(button, headingTarget);
            } else {
                overlays.insertBefore(button, overlays.firstChild);
            }
        }
        button.classList.add('header-back-btn');
        if (absoluteHeadingLayout) button.classList.add('header-back-btn-absolute');
        else button.classList.remove('header-back-btn-absolute');
        return;
    }

    // Custom quiz header fallback
    const qhRow = document.querySelector('#quiz-header .qh-row');
    if (!qhRow || qhRow.querySelector('.back-btn')) return;
    const slot = document.createElement('div');
    slot.className = 'qh-inner qh-back-slot';
    slot.innerHTML = '<a href="../index.html" class="back-btn header-back-btn" aria-label="Back to home" title="Back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></a>';
    qhRow.insertBefore(slot, qhRow.firstChild);
}

function applyGoldStandardOverlayStyles() {
    if (!document.getElementById('gold-standard-quiz-ui')) {
        const style = document.createElement('style');
        style.id = 'gold-standard-quiz-ui';
        style.textContent = `
            #map-overlays {
                height: auto !important;
                min-height: 70px !important;
                display: flex !important;
                flex-wrap: wrap !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 15px 20px !important;
                box-sizing: border-box !important;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.4) !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
            }
            .overlay {
                position: relative !important;
                top: auto !important;
                left: auto !important;
                right: auto !important;
                transform: none !important;
                margin: 5px !important;
                box-sizing: border-box !important;
                background: rgba(255, 255, 255, 0.65) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                border: 1px solid rgba(255, 255, 255, 0.8) !important;
                border-top: 1px solid rgba(255, 255, 255, 1) !important;
                border-left: 1px solid rgba(255, 255, 255, 1) !important;
                border-radius: 12px !important;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.02) !important;
                color: #1a4d6e !important;
                font-weight: 700 !important;
                padding: 10px 18px !important;
                transition: all 0.3s ease !important;
            }
            .overlay:hover {
                background: rgba(255, 255, 255, 0.8) !important;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08), 0 12px 20px rgba(0, 0, 0, 0.04) !important;
                transform: translateY(-2px) !important;
            }
            .top-left {
                order: 1 !important;
                border-left: 4px solid #0077be !important;
            }
            .top-right {
                order: 2 !important;
                display: flex !important;
                align-items: center !important;
                gap: 15px !important;
            }
            #timer {
                background: rgba(0, 119, 190, 0.1) !important;
                padding: 4px 10px !important;
                border-radius: 6px !important;
                color: #0077be !important;
                font-weight: 700 !important;
            }
            .center-top {
                order: 3 !important;
                width: 100% !important;
                margin-top: 10px !important;
                font-size: 20px !important;
                text-align: center !important;
                background: rgba(255, 255, 255, 0.75) !important;
                color: #005a91 !important;
            }
            .center-top b {
                color: #d33a32 !important;
                font-weight: 800 !important;
                padding: 0 4px !important;
            }
            @media (min-width: 800px) {
                #map-overlays {
                    flex-wrap: nowrap !important;
                    padding: 12px 25px !important;
                }
                .top-left {
                    order: 1 !important;
                    flex: 1 !important;
                    text-align: left !important;
                    max-width: fit-content !important;
                }
                .center-top {
                    order: 2 !important;
                    flex: 2 !important;
                    width: auto !important;
                    margin-top: 0 !important;
                    font-size: 24px !important;
                    padding: 12px 30px !important;
                }
                .top-right {
                    order: 3 !important;
                    flex: 1 !important;
                    justify-content: flex-end !important;
                }
                #map {
                    height: calc(100vh - 85px) !important;
                }
            }
            @media (max-width: 600px) {
                #map-overlays {
                    min-height: 62px !important;
                    padding: 10px 10px !important;
                }
                .overlay {
                    padding: 7px 10px !important;
                    font-size: 13px !important;
                    margin: 3px 1px !important;
                }
                .top-left,
                .top-right {
                    flex: 0 1 auto !important;
                    margin: 2px 0 !important;
                }
                .center-top {
                    font-size: 15px !important;
                    margin-top: 6px !important;
                    padding: 8px 12px !important;
                }
                #score { font-size: 14px !important; }
                #timer {
                    margin-left: 8px !important;
                    padding: 3px 8px !important;
                    font-size: 13px !important;
                }
                #map {
                    height: calc(100vh - 132px) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function isWorldSectionQuizPage() {
    const fileName = (window.location.pathname.split('/').pop() || '').toLowerCase();
    const params = new URLSearchParams(window.location.search);

    if (fileName.startsWith('world_') || fileName === 'oceans_quiz.html') return true;
    if (params.get('scope') === 'world') return true;
    if (params.get('continent') || params.get('subregion') || params.get('subcontinent')) return true;

    const quizId = params.get('id');
    if (quizId && typeof QUIZ_CONFIG !== 'undefined' && QUIZ_CONFIG[quizId]) {
        return QUIZ_CONFIG[quizId].category === 'WORLD';
    }

    return false;
}

function enforceBaseLayerPolicy() {
    const mapInstance = getQuizMapInstance();
    if (!mapInstance || isWorldSectionQuizPage()) return;
    if (typeof L === 'undefined' || typeof L.TileLayer === 'undefined') return;

    mapInstance.eachLayer((layer) => {
        if (layer instanceof L.TileLayer && mapInstance.hasLayer(layer)) {
            mapInstance.removeLayer(layer);
        }
    });
}

function normalizeTooltipText(html) {
    return normalizeQuestionName(html);
}

function shouldCaptureTooltipAsAnswer(tooltip) {
    if (!tooltip) return false;
    const options = tooltip.options || {};
    const className = String(options.className || '');
    if (className.includes('wrong-tooltip')) return false;
    if (className.includes('no-answer-hold')) return false;
    if (options.permanent) return false;

    const content = typeof tooltip.getContent === 'function' ? tooltip.getContent() : tooltip._content;
    const plain = normalizeTooltipText(content);
    if (!plain) return false;
    if (/^(incorrect:|wrong:|✗)/i.test(plain)) return false;
    return true;
}

function clearHeldAnswerTooltip() {
    const mapInstance = getQuizMapInstance();
    if (!mapInstance || !heldAnswerTooltip) return;
    if (mapInstance.hasLayer(heldAnswerTooltip)) mapInstance.removeLayer(heldAnswerTooltip);
    heldAnswerTooltip = null;
}

function getTooltipLatLng(evt, tooltip) {
    if (tooltip && typeof tooltip.getLatLng === 'function') {
        const tipLatLng = tooltip.getLatLng();
        if (tipLatLng && Number.isFinite(tipLatLng.lat) && Number.isFinite(tipLatLng.lng)) return tipLatLng;
    }

    if (evt && evt.latlng && Number.isFinite(evt.latlng.lat) && Number.isFinite(evt.latlng.lng)) {
        return evt.latlng;
    }

    const source = evt && evt.sourceTarget ? evt.sourceTarget : null;
    if (source && typeof source.getLatLng === 'function') {
        const srcLatLng = source.getLatLng();
        if (srcLatLng && Number.isFinite(srcLatLng.lat) && Number.isFinite(srcLatLng.lng)) return srcLatLng;
    }

    return null;
}

function showAnswerDetailsAtLocation(contentHtml, latlng) {
    const mapInstance = getQuizMapInstance();
    if (!mapInstance || !latlng) return;
    if (typeof L === 'undefined' || typeof L.tooltip !== 'function') return;

    clearHeldAnswerTooltip();
    heldAnswerTooltip = L.tooltip({
        permanent: true,
        direction: 'top',
        offset: [0, -10],
        className: 'answer-hold-tooltip correct-tooltip'
    })
        .setLatLng(latlng)
        .setContent(contentHtml)
        .addTo(mapInstance);
}

function buildRetestUrl(enable) {
    const url = new URL(window.location.href);
    if (enable) url.searchParams.set(RETEST_QUERY_PARAM, RETEST_QUERY_VALUE);
    else url.searchParams.delete(RETEST_QUERY_PARAM);
    return url.toString();
}

function ensureRetestWrongButton() {
    const questionEl = document.getElementById('question');
    if (!questionEl) return;

    const restartBtn = Array.from(questionEl.querySelectorAll('button'))
        .find((btn) => /restart quiz/i.test((btn.textContent || '').trim()));
    if (!restartBtn) return;

    if (isRetestMode() && !restartBtn.dataset.retestPatched) {
        restartBtn.dataset.retestPatched = '1';
        restartBtn.onclick = function () {
            window.location.href = buildRetestUrl(false);
        };
    }

    if (questionEl.querySelector('.retest-wrong-btn')) return;

    const retestBtn = document.createElement('button');
    retestBtn.className = 'retest-wrong-btn';
    retestBtn.textContent = 'Retest Wrong Answers';
    retestBtn.style.cssText = 'margin-left:10px; padding:5px 12px; border-radius:4px; border:1px solid #16a34a; background:#fff; color:#166534; cursor:pointer; font-weight:bold;';
    retestBtn.disabled = wrongQuestionsSet.size === 0;
    retestBtn.title = retestBtn.disabled ? 'No wrong answers to retest.' : 'Retry only questions answered wrong.';
    retestBtn.onclick = function () {
        if (wrongQuestionsSet.size === 0) return;
        persistWrongQuestionsForRetest();
        window.location.href = buildRetestUrl(true);
    };
    questionEl.appendChild(retestBtn);
}

function hookMapTooltipEventsForDetails() {
    if (mapHookedForAnswerDetails) return;
    const mapInstance = getQuizMapInstance();
    if (!mapInstance) return;

    mapInstance.on('click', () => {
        clearHeldAnswerTooltip();
    });

    mapInstance.on('tooltipopen', (evt) => {
        const tip = evt && evt.tooltip ? evt.tooltip : null;
        if (!shouldCaptureTooltipAsAnswer(tip)) return;
        const content = typeof tip.getContent === 'function' ? tip.getContent() : '';
        const latlng = getTooltipLatLng(evt, tip);
        if (!latlng) return;
        showAnswerDetailsAtLocation(content, latlng);

        // Hide the temporary source tooltip to avoid a double/ghosted tooltip effect.
        const src = evt && evt.sourceTarget ? evt.sourceTarget : null;
        if (src && typeof src.closeTooltip === 'function') {
            setTimeout(() => {
                try { src.closeTooltip(); } catch (e) { /* ignore */ }
            }, 0);
        }
    });

    mapHookedForAnswerDetails = true;
}

window.addEventListener('DOMContentLoaded', () => {
    applyGoldStandardOverlayStyles();
    ensureHeaderBackButton();

    const questionEl = document.getElementById('question');
    if (questionEl) {
        ensureRetestWrongButton();
        const buttonObserver = new MutationObserver(() => ensureRetestWrongButton());
        buttonObserver.observe(questionEl, { childList: true, subtree: true });
    }

    // Map instances are often created after DOMContentLoaded in quiz pages.
    const hookPoll = setInterval(() => {
        const mapInstance = getQuizMapInstance();
        if (mapInstance) {
            hookMapTooltipEventsForDetails();
            enforceBaseLayerPolicy();
            clearInterval(hookPoll);
        }
    }, 200);
    setTimeout(() => clearInterval(hookPoll), 15000);

    // In non-world quizzes, keep removing any tile baselayer added after init.
    const baselayerPoll = setInterval(() => {
        enforceBaseLayerPolicy();
    }, 500);
    setTimeout(() => clearInterval(baselayerPoll), 20000);

    // Retest mode can cap total question count to wrong-answer list size.
    const retestPoll = setInterval(() => {
        if (isRetestMode() && retestWrongSet && retestWrongSet.size > 0 && typeof maxQuestions === 'number' && maxQuestions > 0) {
            maxQuestions = Math.min(maxQuestions, retestWrongSet.size);
        }
    }, 200);
    setTimeout(() => clearInterval(retestPoll), 15000);
});
