/**
 * CSV parsing utilities for converting CSV data to GeoJSON features
 */

/**
 * Parse CSV text into rows, handling quoted fields
 * @param {string} text - CSV text content
 * @returns {Array<Array<string>>} Array of rows, each row is an array of cells
 */
export function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];

        if (ch === '"') {
            if (inQuotes && next === '"') {
                cell += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (!inQuotes && ch === ',') {
            row.push(cell);
            cell = '';
            continue;
        }

        if (!inQuotes && (ch === '\n' || ch === '\r')) {
            if (ch === '\r' && next === '\n') i++;
            row.push(cell);
            if (row.some(v => (v || '').trim() !== '')) rows.push(row);
            row = [];
            cell = '';
            continue;
        }

        cell += ch;
    }

    row.push(cell);
    if (row.some(v => (v || '').trim() !== '')) rows.push(row);
    return rows;
}

/**
 * Convert CSV text to GeoJSON features
 * @param {string} csvText - CSV text content
 * @param {Object} columnMapping - Mapping of column names to property keys
 * @param {string} nameColumn - Column name for the feature name
 * @param {string} latColumn - Column name for latitude
 * @param {string} lngColumn - Column name for longitude
 * @returns {Array<Object>} Array of GeoJSON features
 */
export function csvToGeoJSON(csvText, columnMapping, nameColumn, latColumn, lngColumn) {
    const rows = parseCSV(csvText);
    if (!rows.length) return [];

    const header = rows[0].map(h => (h || '').replace(/^\uFEFF/, '').trim());
    const idx = {
        name: header.indexOf(nameColumn),
        lat: header.indexOf(latColumn),
        lng: header.indexOf(lngColumn),
        ...Object.fromEntries(
            Object.entries(columnMapping).map(([key, colName]) => [key, header.indexOf(colName)])
        )
    };

    if (idx.name === -1 || idx.lat === -1 || idx.lng === -1) {
        return [];
    }

    return rows.slice(1).map(cols => {
        const name = (cols[idx.name] || '').trim();
        const lat = parseFloat((cols[idx.lat] || '').trim());
        const lng = parseFloat((cols[idx.lng] || '').trim());

        if (!name || !Number.isFinite(lat) || !Number.isFinite(lng)) {
            return null;
        }

        const properties = { [nameColumn]: name };
        
        // Add additional properties from column mapping
        Object.entries(columnMapping).forEach(([key, colName]) => {
            const colIdx = header.indexOf(colName);
            if (colIdx !== -1) {
                const value = (cols[colIdx] || '').trim();
                if (value) {
                    // Try to parse as number if it looks like one
                    const numValue = parseFloat(value);
                    properties[key] = Number.isFinite(numValue) ? numValue : value;
                }
            }
        });

        return {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [lng, lat] },
            properties
        };
    }).filter(Boolean);
}

/**
 * Load CSV file and convert to GeoJSON features
 * @param {string} url - URL to CSV file
 * @param {Object} options - Configuration options
 * @returns {Promise<Array<Object>>} Promise resolving to array of GeoJSON features
 */
export async function loadCSVAsGeoJSON(url, options) {
    const response = await fetch(url);
    const csvText = await response.text();
    return csvToGeoJSON(
        csvText,
        options.columnMapping || {},
        options.nameColumn,
        options.latColumn,
        options.lngColumn
    );
}
