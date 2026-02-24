// quiz_engine.js
// Centralized Gamification Engine for all Quizzes
let allData = [];
let quizItems = [];
let currentItem = "";
let totalQuestions = 0;
let correctAnswers = 0;
let geoLayer;
let maxQuestions = 0;
let attemptsLeft = 3;
let attemptsCount = 0;
let requireCorrectToAdvance = false;
let correctMarkerForCurrent = null;
let map = null;
let currentConfig = null;

function loadQuizConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');

    if (!quizId || !QUIZ_CONFIG[quizId]) {
        alert("Invalid or missing Quiz ID. Please return to the main menu.");
        return null;
    }
    return QUIZ_CONFIG[quizId];
}

function initializeEngine() {
    currentConfig = loadQuizConfig();
    if (!currentConfig) return;

    // Set up quiz status tracking
    const _quizId = new URLSearchParams(window.location.search).get('id');
    if (_quizId && typeof setupAutoSave === 'function') setupAutoSave(_quizId);
    window.__quizEngineId = _quizId;

    // Set UI Title
    document.getElementById("quiz-title").textContent = currentConfig.title;
    document.getElementById("question").innerHTML = "Loading data...";

    // Initialize Map
    map = L.map('map', {
        maxBounds: currentConfig.bounds,
        maxBoundsViscosity: 1.0
    }).setView(currentConfig.center, currentConfig.zoom);

    map.createPane('ripplePane');
    map.getPane('ripplePane').style.zIndex = 700;
    map.getPane('ripplePane').style.pointerEvents = 'none';

    // Base Layer (WORLD section only)
    if (currentConfig.category === 'WORLD') {
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 9,
            minZoom: 4,
            bounds: currentConfig.bounds,
            noWrap: true
        }).addTo(map);
    }

    // Load GeoJSON Boundaries (States or Districts)
    if (currentConfig.geojson_file) {
        fetch(currentConfig.geojson_file)
            .then(response => response.json())
            .then(geoData => {
                L.geoJSON(geoData, {
                    interactive: false,
                    style: {
                        color: "#004e7c",
                        weight: 1.5,
                        opacity: 0.8,
                        fillOpacity: 0.05,
                        fillColor: "#0077be"
                    }
                }).addTo(map);
            }).catch(e => console.warn("Could not load geojson:", e));
    }

    // Load CSV Data
    fetch(currentConfig.csv_file)
        .then(response => response.text())
        .then(csvText => {
            allData = toFeaturesFromCSV(csvText, currentConfig.csv_mapping);
            if (allData.length > 0) {
                setupQuizData();
            } else {
                alert(`No valid data found in ${currentConfig.csv_file}. Check your CSV mappings.`);
            }
        })
        .catch(error => {
            alert('Error loading ' + currentConfig.csv_file + ': ' + error.message);
        });
}

function toFeaturesFromCSV(csvText, mapping) {
    const rows = parseCSV(csvText);
    if (!rows.length) return [];

    const header = rows[0].map(h => (h || '').replace(/^\uFEFF/, '').trim());

    // Find column indexes based on the provided mapping configuration
    const idx = {
        name: header.indexOf(mapping.name),
        lat: header.indexOf(mapping.lat),
        lng: header.indexOf(mapping.lng),
        comment: mapping.comment ? header.indexOf(mapping.comment) : -1,
        extra: mapping.extra_tooltip_field ? header.indexOf(mapping.extra_tooltip_field) : -1
    };

    if (idx.name === -1 || idx.lat === -1 || idx.lng === -1) {
        console.error("CSV Mapping Failed. Missing required columns. Headers found:", header);
        return [];
    }

    return rows.slice(1).map(cols => {
        const name = (cols[idx.name] || '').trim();
        const lat = parseFloat((cols[idx.lat] || '').trim());
        const lng = parseFloat((cols[idx.lng] || '').trim());
        const comment = idx.comment !== -1 ? (cols[idx.comment] || '').trim() : '';
        const extra = idx.extra !== -1 ? (cols[idx.extra] || '').trim() : '';

        if (!name || !Number.isFinite(lat) || !Number.isFinite(lng)) return null;

        return {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [lng, lat] },
            properties: {
                NAME: name,
                COMMENT: comment,
                EXTRA: extra
            }
        };
    }).filter(Boolean);
}

function getDynamicIcon(state) {
    const visual = currentConfig.visuals[state] || currentConfig.visuals.default;
    const size = visual.size;
    let svgHtml = currentConfig.icon_svg
        .replace(/\{SIZE\}/g, size)
        .replace(/\{FILL\}/g, visual.fill)
        .replace(/\{STROKE\}/g, visual.stroke);

    return L.divIcon({
        className: 'quiz-icon',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        html: svgHtml
    });
}

function setMarkerState(marker, state) {
    marker.setIcon(getDynamicIcon(state));
}

function resetMarkerStyle(marker) {
    setMarkerState(marker, 'default');
}

function setupQuizData() {
    quizItems = allData.map(f => f.properties.NAME || 'Unknown');
    maxQuestions = currentConfig.maxQuestions || quizItems.length;
    geoLayer = L.featureGroup();

    allData.forEach(feature => {
        const coords = feature.geometry.coordinates;
        const itemName = feature.properties.NAME || 'Unknown';
        let commentText = feature.properties.COMMENT;

        if (feature.properties.EXTRA) {
            commentText = commentText ? `<b>${currentConfig.csv_mapping.extra_tooltip_field}:</b> ${feature.properties.EXTRA}<br/>${commentText}` : `<b>${currentConfig.csv_mapping.extra_tooltip_field}:</b> ${feature.properties.EXTRA}`;
        }

        const marker = L.marker([coords[1], coords[0]], {
            icon: getDynamicIcon('default'),
            keyboard: false
        });

        marker.on({
            mouseover: function () {
                if (marker === correctMarkerForCurrent) return;
                setMarkerState(marker, 'hover');
            },
            mouseout: function () {
                if (marker === correctMarkerForCurrent) return;
                resetMarkerStyle(marker);
            },
            click: function (e) {
                attemptsCount++;

                if (itemName === currentItem) {
                    // Correct Guess
                    correctAnswers++;
                    playCorrectSound();
                    updateScore();
                    setMarkerState(marker, 'correct');
                    triggerCelebration(marker.getLatLng());

                    let details = "<b>" + itemName + "</b>";
                    if (commentText) details += "<br/>" + commentText;
                    marker.bindTooltip(details, {
                        permanent: false,
                        direction: 'top',
                        offset: [0, -10]
                    }).openTooltip();

                    setTimeout(() => {
                        marker.closeTooltip();
                        resetMarkerStyle(marker);
                        nextQuestion();
                    }, 2500);
                    return;
                }

                // Incorrect Guess
                playIncorrectSound();
                updateScore();

                if (requireCorrectToAdvance) {
                    setMarkerState(marker, 'wrong');
                    setTimeout(() => resetMarkerStyle(marker), 1200);
                    marker.bindTooltip(itemName, {
                        permanent: false,
                        className: 'wrong-tooltip',
                        direction: 'top',
                        offset: [0, -10]
                    }).openTooltip(e && e.latlng ? e.latlng : undefined);
                    setTimeout(() => marker.closeTooltip(), 1200);
                    return;
                }

                attemptsLeft = Math.max(0, attemptsLeft - 1);
                if (attemptsLeft > 0) {
                    setMarkerState(marker, 'wrong');
                    setTimeout(() => resetMarkerStyle(marker), 2000);
                } else {
                    // Out of attempts - reveal correct answer
                    let correctMarker = null;
                    geoLayer.eachLayer(function (lyr) {
                        const nm = lyr.feature && lyr.feature.properties && lyr.feature.properties.NAME;
                        if (nm === currentItem) correctMarker = lyr;
                    });

                    if (correctMarker) {
                        let on = true;
                        const iv = setInterval(() => {
                            setMarkerState(correctMarker, on ? 'wrong' : 'default');
                            on = !on;
                        }, 250);
                        setTimeout(() => {
                            clearInterval(iv);
                            requireCorrectToAdvance = true;
                            correctMarkerForCurrent = correctMarker;
                            setMarkerState(correctMarker, 'target');
                            triggerRippleAt(correctMarker.getLatLng(), currentConfig.visuals.target.fill);
                            setQuestion(currentItem, totalQuestions, maxQuestions, true);
                        }, 2000);
                    } else {
                        nextQuestion();
                    }
                }

                let tooltipContent = "Incorrect: " + itemName;
                marker.bindTooltip(tooltipContent, {
                    permanent: false,
                    className: 'wrong-tooltip',
                    direction: 'top',
                    offset: [0, -10]
                }).openTooltip(e && e.latlng ? e.latlng : undefined);
                setTimeout(() => {
                    marker.closeTooltip();
                    marker.unbindTooltip();
                }, 1200);
            }
        });

        marker.feature = feature;
        geoLayer.addLayer(marker);
    });

    geoLayer.addTo(map);
    try { map.fitBounds(geoLayer.getBounds()); } catch (err) { }

    startTimer();
    nextQuestion();
}

function nextQuestion() {
    requireCorrectToAdvance = false;
    if (correctMarkerForCurrent) {
        resetMarkerStyle(correctMarkerForCurrent);
        correctMarkerForCurrent = null;
    }

    if (maxQuestions > 0 && totalQuestions >= maxQuestions) {
        endQuiz();
        return;
    }

    if (!quizItems || quizItems.length === 0) {
        endQuiz();
        return;
    }

    const idx = Math.floor(Math.random() * quizItems.length);
    currentItem = quizItems.splice(idx, 1)[0];
    attemptsLeft = 3;
    totalQuestions++;

    setQuestion(currentItem, totalQuestions, maxQuestions);
}

function updateScore() {
    let percentage = attemptsCount === 0 ? 0 : Math.round((correctAnswers / attemptsCount) * 100);
    document.getElementById("score-text").innerHTML =
        percentage + "%";
}

function endQuiz() {
    stopTimer();
    const percent = attemptsCount === 0 ? 0 : Math.round((correctAnswers / attemptsCount) * 100);
    document.getElementById("question").innerHTML =
        "Quiz finished! Final score: <b>" + percent + "%</b>";

    // Save completed status
    if (window.__quizEngineId && typeof saveQuizResult === 'function') {
        saveQuizResult(window.__quizEngineId, 'completed', percent, totalQuestions, correctAnswers);
    }

    if (geoLayer) {
        geoLayer.eachLayer(function (layer) {
            layer.off();
        });
    }

    const restart = document.createElement('button');
    restart.textContent = 'Restart Quiz';
    restart.style.cssText = 'margin-left:15px; padding: 5px 12px; border-radius: 4px; border: 1px solid #0077be; background: #fff; color: #0077be; cursor: pointer; font-weight: bold;';
    restart.onclick = function () { location.reload(); };
    const q = document.getElementById('question');
    if (q) q.appendChild(restart);
}

// Start engine on DOM load
window.addEventListener('DOMContentLoaded', initializeEngine);
