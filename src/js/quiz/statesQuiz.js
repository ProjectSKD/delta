/**
 * States quiz implementation
 */
import { initMap } from '../core/map.js';
import { PolygonBasedQuiz } from './PolygonBasedQuiz.js';
import { loadGeoJSON, extractNames } from '../data/geojsonLoader.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize states quiz
 */
export async function initStatesQuiz(config = {}) {
    const {
        center = [22, 80],
        zoom = 5,
        quizTitle = `States of India`,
        defaultStyle = {
            color: '#004e7c',
            weight: 1.2,
            fillColor: '#0077be',
            fillOpacity: 0.35
        }
    } = config;

    // Create overlay
    const overlay = createOverlayContainer(quizTitle);
    document.body.insertBefore(overlay, document.body.firstChild);

    // Create map
    const map = initMap('map', { center, zoom });

    // Load states data
    const statesData = await loadGeoJSON('/data/india_states.geojson');
    
    if (!statesData.features || statesData.features.length === 0) {
        alert(`No states data found`);
        return;
    }

    // Create quiz instance
    const quiz = new PolygonBasedQuiz({
        nameProperty: 'ST_NM',
        maxQuestions: 30,
        defaultStyle
    });

    // Extract state names
    quiz.items = extractNames(statesData, ['ST_NM']);

    // Create state layers
    const geoLayer = L.geoJSON(statesData, {
        style: defaultStyle,
        onEachFeature: (feature, layer) => {
            quiz.setupPolygon(layer, feature);
        }
    });

    geoLayer.addTo(map);
    try {
        map.fitBounds(geoLayer.getBounds());
    } catch (err) {
        console.error('Error fitting bounds:', err);
    }

    quiz.geoLayer = geoLayer;
    quiz.initialize(map, geoLayer);
}
