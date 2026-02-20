/**
 * Mountains quiz implementation
 */
import { initMap, loadStatesLayer, INDIA_BOUNDS } from '../core/map.js';
import { PointBasedQuiz } from './PointBasedQuiz.js';
import { loadCSVAsGeoJSON } from '../data/csvParser.js';
import { createOverlayContainer } from '../ui/overlays.js';
// Leaflet (L) is loaded globally from CDN

/**
 * Initialize mountains quiz
 * @param {Object} config - Configuration object
 */
export async function initMountainsQuiz(config = {}) {
    const {
        quizTitle = 'Mountains on India Map',
        csvPath = '/data/mountain_india.csv',
        maxBounds = INDIA_BOUNDS,
        center = null,
        zoom = null,
        nameProperty = 'Peak_Name'
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
        color: '#2f5f9a',
        weight: 1.7,
        opacity: 0.9,
        fillOpacity: 0.08,
        fillColor: '#7fb5ff'
    });

    // Load mountains data
    const features = await loadCSVAsGeoJSON(csvPath, {
        nameColumn: nameProperty,
        latColumn: config.latColumn || 'Latitude',
        lngColumn: config.lngColumn || 'Longitude',
        columnMapping: config.columnMapping || {
            Height_m: 'Height(m)',
            State_UT: 'State/UT',
            Significance: 'Significance'
        }
    });

    if (features.length === 0) {
        alert('Invalid or empty mountain data file');
        return;
    }

    // Create quiz instance
    const quiz = new PointBasedQuiz({
        markerType: 'mountain',
        nameProperty: nameProperty,
        maxQuestions: 20,
        visuals: config.visuals || {
            default: { size: 16, fill: '#a35b2f', stroke: '#6f3b1b' },
            hover: { size: 20, fill: '#b66a3a', stroke: '#6f3b1b' },
            correct: { size: 20, fill: '#1e9d46', stroke: '#0e6128' },
            wrong: { size: 20, fill: '#d33a32', stroke: '#8a1f1a' },
            target: { size: 24, fill: '#d33a32', stroke: '#8a1f1a' }
        }
    });

    // Extract peak names
    quiz.items = features.map(f => f.properties[nameProperty] || 'Unknown Peak');

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
