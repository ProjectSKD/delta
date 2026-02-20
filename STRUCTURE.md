# Project Structure Documentation

## Overview

The project has been refactored from a simple HTML repository structure to a modular, feature-based architecture following standard coding practices.

## Folder Organization

### `/src` - Source Code
All application source code is organized here by functionality.

#### `/src/js/core` - Core Functionality
Reusable core modules used across the application:
- **audio.js**: Audio feedback manager (correct/incorrect sounds)
- **timer.js**: Timer functionality for tracking quiz duration
- **score.js**: Score tracking and calculation
- **map.js**: Map initialization and configuration utilities

#### `/src/js/data` - Data Loading
Data parsing and loading utilities:
- **csvParser.js**: CSV parsing and conversion to GeoJSON
- **geojsonLoader.js**: GeoJSON loading and filtering utilities

#### `/src/js/quiz` - Quiz Logic
Quiz engine and implementations:
- **BaseQuiz.js**: Base class with common quiz functionality
- **PointBasedQuiz.js**: Quiz for point features (lakes, mountains)
- **PolygonBasedQuiz.js**: Quiz for polygon features (districts, states)
- **LineBasedQuiz.js**: Quiz for line features (rivers)
- **lakesQuiz.js**: Lakes quiz implementation
- **riversQuiz.js**: Rivers quiz implementation
- **mountainsQuiz.js**: Mountains quiz implementation
- **districtsQuiz.js**: Districts quiz implementation (reusable for any state)
- **index.js**: Central export point

#### `/src/js/ui` - UI Components
User interface components:
- **markers.js**: Custom marker icon creation
- **overlays.js**: Quiz overlay components (score, timer, question)

#### `/src/js/visual` - Visual Effects
Visual feedback effects:
- **effects.js**: Ripple and celebration animations

#### `/src/css` - Stylesheets
- **quiz.css**: Shared styles for all quiz pages

### `/data` - Data Files
All data files (CSV, GeoJSON) are stored here:
- `*.csv` - CSV data files
- `*.geojson` - GeoJSON data files

## Key Design Principles

### 1. **Separation of Concerns**
- Core functionality is separated from UI and quiz logic
- Data loading is isolated from business logic
- Visual effects are modular and reusable

### 2. **DRY (Don't Repeat Yourself)**
- Common functionality (timer, score, audio) is shared
- Quiz base classes eliminate code duplication
- Reusable components for similar quiz types

### 3. **Extensibility**
- Easy to add new quiz types by extending base classes
- New data sources can be added via data loaders
- Visual effects can be extended without modifying quiz logic

### 4. **Standard Practices**
- ES6 modules for code organization
- Proper error handling
- Consistent naming conventions
- JSDoc comments for documentation

## Usage Examples

### Creating a New Point-Based Quiz

```javascript
import { PointBasedQuiz } from './PointBasedQuiz.js';
import { initMap, loadStatesLayer } from '../core/map.js';
import { loadCSVAsGeoJSON } from '../data/csvParser.js';

export async function initMyQuiz() {
    const map = initMap('map');
    await loadStatesLayer(map);
    
    const features = await loadCSVAsGeoJSON('data/my_data.csv', {
        nameColumn: 'NAME',
        latColumn: 'LAT',
        lngColumn: 'LNG'
    });
    
    const quiz = new PointBasedQuiz({
        markerType: 'default',
        nameProperty: 'NAME',
        maxQuestions: 20
    });
    
    quiz.items = features.map(f => f.properties.NAME);
    // ... setup markers and initialize
}
```

### Creating a New District Quiz

```javascript
import { initDistrictsQuiz } from './districtsQuiz.js';

// For any state
initDistrictsQuiz('Uttar Pradesh', {
    center: [26.8, 80.9],
    zoom: 6
});
```

## Benefits

1. **Maintainability**: Code is organized and easy to find
2. **Reusability**: Components can be used across multiple quizzes
3. **Testability**: Modules can be tested independently
4. **Scalability**: Easy to add new features without breaking existing code
5. **Readability**: Clear structure makes code easier to understand

## Migration Notes

- Old HTML files remain for reference
- New HTML files use `*_new.html` naming convention
- Data files have been moved to `/data` folder
- All functionality is preserved, just better organized
