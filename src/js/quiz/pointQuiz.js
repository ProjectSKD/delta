/**
 * Generic point-based quiz initialization
 */
import { initMap, loadStatesLayer, INDIA_BOUNDS } from '../core/map.js';
import { PointBasedQuiz } from './PointBasedQuiz.js';
import { loadCSVAsGeoJSON } from '../data/csvParser.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize a point-based quiz (e.g., Wetlands, Sanctuaries)
 * @param {Object} config - Configuration options
 */
export async function initPointQuiz(config = {}) {
    const {
        quizTitle = 'Points of India',
        csvPath = null,
        maxBounds = INDIA_BOUNDS,
        center = null,
        zoom = null,
        nameProperty = 'NAME',
        latColumn = 'LATITUDE',
        lngColumn = 'LONGITUDE',
        columnMapping = {},
        visuals = null,
        markerType = 'default',
        maxQuestions = 25,
        stateFillColor = '#1a6eb5',
        stateBorderColor = '#0d4472'
    } = config;

    if (!csvPath) {
        console.error("csvPath is required");
        return;
    }

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
        color: stateBorderColor,
        weight: 1.5,
        opacity: 0.7,
        fillOpacity: 0.04,
        fillColor: stateFillColor
    });

    // Load points data
    const features = await loadCSVAsGeoJSON(csvPath, {
        nameColumn: nameProperty,
        latColumn: latColumn,
        lngColumn: lngColumn,
        columnMapping: columnMapping
    });

    if (features.length === 0) {
        alert('Invalid or empty data file');
        return;
    }

    // Create quiz instance
    const quizOpts = {
        markerType: markerType,
        nameProperty: nameProperty,
        maxQuestions: maxQuestions
    };
    if (visuals) quizOpts.visuals = visuals;

    const quiz = new PointBasedQuiz(quizOpts);

    // Extract item names
    quiz.items = features.map(f => f.properties[nameProperty] || 'Unknown');

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
