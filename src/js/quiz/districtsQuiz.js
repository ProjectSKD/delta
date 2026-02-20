/**
 * Districts quiz implementation
 */
import { initMap, loadStatesLayer } from '../core/map.js';
import { PolygonBasedQuiz } from './PolygonBasedQuiz.js';
import { loadGeoJSON, filterGeoJSONByProperty, extractNames } from '../data/geojsonLoader.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize districts quiz for a specific state
 * @param {string} stateName - Name of the state
 * @param {Object} config - Configuration options (center, zoom, style)
 */
export async function initDistrictsQuiz(stateName, config = {}) {
    const {
        center = [25.1, 85.3],
        zoom = 6,
        quizTitle = `${stateName} Districts`,
        defaultStyle = {
            color: '#2e5090',
            weight: 2,
            fillColor: '#87ceeb',
            fillOpacity: 0.6
        }
    } = config;

    // Create overlay
    const overlay = createOverlayContainer(quizTitle);
    document.body.insertBefore(overlay, document.body.firstChild);

    // Create map
    const map = initMap('map', { center, zoom });

    // Load states background
    await loadStatesLayer(map, '/data/india_states.geojson', {
        color: '#cccccc',
        weight: 1,
        fillColor: '#e8e8e8',
        fillOpacity: 0.4
    });

    // Load districts data
    const allDistricts = await loadGeoJSON('/data/india_districts.geojson');
    
    // Filter by state
    const stateDistricts = filterGeoJSONByProperty(
        allDistricts,
        'st_nm',
        stateName,
        false
    );

    if (!stateDistricts.features || stateDistricts.features.length === 0) {
        alert(`No districts found for ${stateName}`);
        return;
    }

    // Create quiz instance
    const quiz = new PolygonBasedQuiz({
        nameProperty: 'DISTRICT',
        maxQuestions: 20,
        defaultStyle
    });

    // Extract district names
    quiz.items = extractNames(stateDistricts, ['DISTRICT', 'district']);

    // Create district layers
    const geoLayer = L.geoJSON(stateDistricts, {
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
