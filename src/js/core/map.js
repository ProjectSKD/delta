/**
 * Map initialization and configuration module
 * Note: Leaflet (L) should be loaded globally from CDN
 */

/**
 * Default India bounds for map constraints
 */
export const INDIA_BOUNDS = [
    [6, 67],
    [38, 98]
];

/**
 * Default map center and zoom for India
 */
export const INDIA_CENTER = [20, 78];
export const INDIA_ZOOM = 5;

/**
 * Initialize a Leaflet map with India-specific settings
 * @param {string} containerId - ID of the map container element
 * @param {Object} options - Additional map options
 * @returns {L.Map} Leaflet map instance
 */
export function initMap(containerId, options = {}) {
    const {
        center = INDIA_CENTER,
        zoom = INDIA_ZOOM,
        maxBounds = INDIA_BOUNDS,
        maxBoundsViscosity = 1.0,
        tileLayer = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
    } = options;

    const map = L.map(containerId, {
        maxBounds,
        maxBoundsViscosity,
        ...options
    }).setView(center, zoom);

    // Add base tile layer
    L.tileLayer(tileLayer, {
        attribution: '© Esri',
        maxZoom: 9,
        minZoom: 4,
        bounds: maxBounds,
        noWrap: true
    }).addTo(map);

    // Create ripple pane for visual effects
    map.createPane('ripplePane');
    map.getPane('ripplePane').style.zIndex = 700;
    map.getPane('ripplePane').style.pointerEvents = 'none';

    return map;
}

/**
 * Load and add India states as background layer
 * @param {L.Map} map - Leaflet map instance
 * @param {string} geojsonPath - Path to states GeoJSON file
 * @param {Object} style - Style options for the states layer
 * @returns {Promise<L.GeoJSON>} Promise that resolves to the GeoJSON layer
 */
export function loadStatesLayer(map, geojsonPath = '/data/india_states.geojson', style = {}) {
    const defaultStyle = {
        color: '#004e7c',
        weight: 1.5,
        opacity: 0.8,
        fillOpacity: 0.05,
        fillColor: '#0077be',
        ...style
    };

    return fetch(geojsonPath)
        .then(response => response.json())
        .then(statesData => {
            return L.geoJSON(statesData, {
                interactive: false,
                style: defaultStyle
            }).addTo(map);
        });
}
