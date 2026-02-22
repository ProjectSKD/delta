/**
 * GeoJSON loading utilities
 */

/**
 * Load GeoJSON file
 * @param {string} url - URL to GeoJSON file
 * @returns {Promise<Object>} Promise resolving to GeoJSON data
 */
export async function loadGeoJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Filter GeoJSON features by property value
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {string} property - Property name to filter by
 * @param {string|number} value - Value to match
 * @param {boolean} caseSensitive - Whether comparison should be case-sensitive
 * @returns {Object} Filtered GeoJSON FeatureCollection
 */
export function filterGeoJSONByProperty(geojson, property, value, caseSensitive = false) {
    if (!geojson || !geojson.features) {
        return { type: 'FeatureCollection', features: [] };
    }

    const compareValue = caseSensitive ? value : String(value).toLowerCase();
    
    const filteredFeatures = geojson.features.filter(feature => {
        if (!feature.properties) return false;
        const propValue = feature.properties[property];
        if (propValue === undefined || propValue === null) return false;
        
        const compareProp = caseSensitive ? propValue : String(propValue).toLowerCase();
        return compareProp === compareValue;
    });

    return {
        type: 'FeatureCollection',
        features: filteredFeatures
    };
}

/**
 * Extract names from GeoJSON features
 * @param {Object} geojson - GeoJSON FeatureCollection
 * @param {string|Array<string>} nameProperty - Property name(s) to extract (tries each in order)
 * @returns {Array<string>} Array of names
 */
export function extractNames(geojson, nameProperty) {
    if (!geojson || !geojson.features) return [];
    
    const props = Array.isArray(nameProperty) ? nameProperty : [nameProperty];
    
    return geojson.features
        .map(feature => {
            if (!feature.properties) return null;
            for (const prop of props) {
                const value = feature.properties[prop];
                if (value) return String(value).trim();
            }
            return null;
        })
        .filter(Boolean);
}
