/**
 * Rivers quiz implementation
 */
import { initMap, loadStatesLayer } from '../core/map.js';
import { LineBasedQuiz } from './LineBasedQuiz.js';
import { loadGeoJSON, extractNames } from '../data/geojsonLoader.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize rivers quiz
 */
export async function initRiversQuiz() {
    // Create overlay
    const overlay = createOverlayContainer('Rivers on India Map');
    document.body.insertBefore(overlay, document.body.firstChild);

    // Create map
    const map = initMap('map');

    // Load states background
    await loadStatesLayer(map, '/data/india_states.geojson', {
        color: '#cccccc',
        weight: 1,
        fillColor: '#e8e8e8',
        fillOpacity: 0.4
    });

    // Load rivers data
    const geojson = await loadGeoJSON('/data/Rivers_compressed.geojson');
    
    if (!geojson || !geojson.features) {
        alert('Invalid GeoJSON file');
        return;
    }

    // Create quiz instance
    const quiz = new LineBasedQuiz({
        nameProperty: 'rivname',
        maxQuestions: 20,
        defaultStyle: {
            color: '#00008B',
            weight: 1.5,
            opacity: 0.8
        }
    });

    // Extract river names
    quiz.items = extractNames(geojson, ['rivname', 'name']);

    // Create river layers
    const geoLayer = L.geoJSON(geojson, {
        style: quiz.defaultStyle,
        onEachFeature: (feature, layer) => {
            quiz.setupLine(layer, feature);
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
