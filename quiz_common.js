let audioContext = null;

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
        timerEl.textContent = "Time: " + mins + ":" + (secs < 10 ? "0" : "") + secs;
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
    const el = document.getElementById("question");
    if (el) {
        el.innerHTML = formatQuestion(name, current, total, isLocate);
        if (isLocate) {
            // Add instructions for Locate mode if needed
            const instructions = isLocate && !name.toLowerCase().includes("district")
                ? ` (Click the highlighted item)`
                : (name.toLowerCase().includes("district") ? " (click the correct district)" : "");
            el.innerHTML += `<span style="font-size: 0.8em; font-weight: normal; opacity: 0.8;">${instructions}</span>`;
        }
    }
}
