/**
 * Lakes quiz implementation
 */
import { initMap, loadStatesLayer, INDIA_BOUNDS } from '../core/map.js';
import { PointBasedQuiz } from './PointBasedQuiz.js';
import { loadCSVAsGeoJSON } from '../data/csvParser.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize lakes quiz
 * @param {Object} config - Configuration options
 */
export async function initLakesQuiz(config = {}) {
    const {
        quizTitle = 'Lakes of India',
        csvPath = '/data/lakes_india.csv',
        maxBounds = INDIA_BOUNDS,
        center = null,
        zoom = null,
        nameProperty = 'LAKE_NAME',
        latColumn = 'LATITUDE',
        lngColumn = 'LONGITUDE',
        columnMapping = {
            State_UT: 'STATE/UT',
            Comment: 'COMMENT'
        },
        visuals = null,
        markerType = 'lake'
    } = config;

    // Create overlay
    const overlay = createOverlayContainer(quizTitle);
    document.body.insertBefore(overlay, document.body.firstChild);

    // Create map
    const mapOpts = {
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0
    };
    if (center) mapOpts.center = center;
    if (zoom) mapOpts.zoom = zoom;

    const map = initMap('map', mapOpts);

    // Load states background
    await loadStatesLayer(map, '/data/india_states.geojson', {
        color: '#004e7c',
        weight: 1.5,
        opacity: 0.8,
        fillOpacity: 0.05,
        fillColor: '#0077be'
    });

    // Load lakes data
    const features = await loadCSVAsGeoJSON(csvPath, {
        nameColumn: nameProperty,
        latColumn: latColumn,
        lngColumn: lngColumn,
        columnMapping: columnMapping
    });

    if (features.length === 0) {
        alert('Invalid or empty lakes data file');
        return;
    }

    // Create quiz instance
    const quizOpts = {
        markerType: markerType,
        nameProperty: nameProperty,
        maxQuestions: 25
    };
    if (visuals) quizOpts.visuals = visuals;

    const quiz = new PointBasedQuiz(quizOpts);

    // Extract item names
    quiz.items = features.map(f => f.properties[nameProperty] || 'Unknown Lake');

    // Create markers
    const geoLayer = L.featureGroup();
    features.forEach(feature => {
        const coords = feature.geometry.coordinates;
        const marker = L.marker([coords[1], coords[0]], {
            icon: quiz.getIcon('default'),
            keyboard: false
        });
        marker.feature = feature;
        quiz.setupMarker(marker, feature);
        geoLayer.addLayer(marker);
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
