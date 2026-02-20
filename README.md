# India Geography Quiz

Interactive map-based geography quizzes for India's states, districts, rivers, lakes, mountains, national parks, wetlands and more.

## Project Structure

```
delta/
├── src/
│   ├── js/
│   │   ├── core/           # Core functionality modules
│   │   │   ├── audio.js    # Audio feedback
│   │   │   ├── timer.js    # Timer functionality
│   │   │   ├── score.js    # Score tracking
│   │   │   └── map.js      # Map initialization
│   │   ├── data/           # Data loading utilities
│   │   │   ├── csvParser.js      # CSV parsing
│   │   │   └── geojsonLoader.js  # GeoJSON loading
│   │   ├── quiz/           # Quiz implementations
│   │   │   ├── BaseQuiz.js        # Base quiz class
│   │   │   ├── PointBasedQuiz.js # Point-based quizzes (lakes, mountains)
│   │   │   ├── PolygonBasedQuiz.js # Polygon-based quizzes (districts)
│   │   │   ├── LineBasedQuiz.js   # Line-based quizzes (rivers)
│   │   │   ├── lakesQuiz.js       # Lakes quiz implementation
│   │   │   ├── riversQuiz.js      # Rivers quiz implementation
│   │   │   ├── mountainsQuiz.js   # Mountains quiz implementation
│   │   │   └── districtsQuiz.js   # Districts quiz implementation
│   │   ├── ui/             # UI components
│   │   │   ├── markers.js  # Marker icon creation
│   │   │   └── overlays.js # Overlay components
│   │   └── visual/         # Visual effects
│   │       └── effects.js  # Ripple and celebration effects
│   └── css/
│       └── quiz.css        # Shared quiz styles
├── data/                   # Data files (CSV, GeoJSON)
├── index.html              # Main hub page
├── legacy/                 # Old inline-script pages kept for reference
└── *_quiz.html             # Quiz pages (now powered by modules in src/js)
```

## Features

- **Modular Architecture**: Code is organized into reusable modules
- **No Code Duplication**: Common functionality is shared across quizzes
- **Standard Practices**: ES6 modules, proper separation of concerns
- **Extensible**: Easy to add new quiz types

## Usage

### Running the Application

Start a local server (required for ES6 modules):

```bash
python3 -m http.server 8000
```

Or using npm:

```bash
npm start
```

Then open `http://localhost:8000` in your browser.

### Creating a New Quiz

1. Create a new quiz implementation file in `src/js/quiz/`
2. Import the appropriate base quiz class (PointBasedQuiz, PolygonBasedQuiz, or LineBasedQuiz)
3. Implement the quiz initialization function
4. Create an HTML file that imports and initializes your quiz

Example:

```javascript
import { PointBasedQuiz } from './PointBasedQuiz.js';
import { initMap, loadStatesLayer } from '../core/map.js';

export async function initMyQuiz() {
    const map = initMap('map');
    // ... setup quiz
}
```

## Quiz Types

- **Point-based**: Lakes, Mountains (use markers)
- **Polygon-based**: Districts, States (use GeoJSON polygons)
- **Line-based**: Rivers (use GeoJSON lines)

## Dependencies

- Leaflet.js (loaded from CDN)
- Modern browser with ES6 module support

## License

MIT
