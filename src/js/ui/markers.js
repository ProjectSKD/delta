/**
 * Marker icon creation utilities
 * Note: Leaflet (L) should be loaded globally from CDN
 */

/**
 * Default marker visual configurations
 */
export const MARKER_VISUALS = {
    default: { size: 18, fill: '#0077be', stroke: '#004e7c' },
    hover: { size: 22, fill: '#0099ff', stroke: '#004e7c' },
    correct: { size: 22, fill: '#1e9d46', stroke: '#0e6128' },
    wrong: { size: 22, fill: '#d33a32', stroke: '#8a1f1a' },
    target: { size: 26, fill: '#d33a32', stroke: '#8a1f1a' }
};

/**
 * Create a custom icon factory for different marker types
 * @param {string} type - Type of marker ('lake', 'mountain', 'default')
 * @param {Object} visuals - Visual configuration object
 * @returns {Function} Function that returns L.DivIcon for given state
 */
export function createIconFactory(type = 'default', visuals = MARKER_VISUALS) {
    const iconGenerators = {
        lake: (state) => {
            const visual = visuals[state] || visuals.default;
            const size = visual.size;
            return L.divIcon({
                className: 'lake-icon',
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                html: `
                    <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" 
                              fill="${visual.fill}" 
                              stroke="${visual.stroke}" 
                              stroke-width="1.5" 
                              stroke-linejoin="round"></path>
                        <path d="M12 5.5l2.5 2.5h-5z" fill="#ffffff" opacity="0.6"></path>
                    </svg>
                `
            });
        },
        mountain: (state) => {
            const visual = visuals[state] || visuals.default;
            const size = visual.size;
            return L.divIcon({
                className: 'mountain-icon',
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                html: `
                    <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2 20h20L14 6l-3 4-2-3L2 20z" 
                              fill="${visual.fill}" 
                              stroke="${visual.stroke}" 
                              stroke-width="1.5" 
                              stroke-linejoin="round"></path>
                        <path d="M14 6l2.4 3.5h-1.8l-1.2-1.8-1 1.3h-1.8L14 6z" 
                              fill="#ffffff" 
                              opacity="0.9"></path>
                    </svg>
                `
            });
        },
        park: (state) => {
            const visual = visuals[state] || visuals.default;
            const size = visual.size;
            return L.divIcon({
                className: 'park-icon',
                iconSize: [size, size],
                iconAnchor: [size / 2, size],
                html: `
                    <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="10.5" y="17" width="3" height="5" rx="1" fill="${visual.stroke}"/>
                        <polygon points="12,2 20,12 4,12" fill="${visual.fill}" stroke="${visual.stroke}" stroke-width="1" stroke-linejoin="round"/>
                        <polygon points="12,7 19,16 5,16" fill="${visual.fill}" stroke="${visual.stroke}" stroke-width="1" stroke-linejoin="round"/>
                    </svg>
                `
            });
        },
        sanctuary: (state) => {
            const visual = visuals[state] || visuals.default;
            const sz = visual.size;
            const f = visual.fill, s = visual.stroke;
            return L.divIcon({
                className: 'sanctuary-icon',
                iconSize: [sz, sz],
                iconAnchor: [sz / 2, sz / 2],
                html: `
                    <svg width="${sz}" height="${sz}" viewBox="0 0 24 24" aria-hidden="true">
                        <ellipse cx="12" cy="14" rx="5" ry="6" fill="${f}" stroke="${s}" stroke-width="1.5"/>
                        <circle cx="8"  cy="8"  r="2.2" fill="${f}" stroke="${s}" stroke-width="1"/>
                        <circle cx="12" cy="6"  r="2.2" fill="${f}" stroke="${s}" stroke-width="1"/>
                        <circle cx="16" cy="8"  r="2.2" fill="${f}" stroke="${s}" stroke-width="1"/>
                        <ellipse cx="10.5" cy="12.5" rx="2" ry="2.5" fill="#fff" opacity="0.25"/>
                    </svg>
                `
            });
        },
        default: (state) => {
            const visual = visuals[state] || visuals.default;
            const size = visual.size;
            return L.divIcon({
                className: 'default-icon',
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                html: `
                    <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" 
                                fill="${visual.fill}" 
                                stroke="${visual.stroke}" 
                                stroke-width="2"></circle>
                    </svg>
                `
            });
        }
    };

    const generator = iconGenerators[type] || iconGenerators.default;
    
    return (state) => generator(state);
}
