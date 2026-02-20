# File Organization Guide

## Directory Structure

The project is now organized by feature/functionality:

```
delta/
├── index.html                    # Main hub page
├── quizzes/                       # All quiz pages organized by feature
│   ├── india/                     # India-level quizzes
│   │   ├── states.html           # States quiz
│   │   ├── districts.html        # Districts quiz
│   │   ├── rivers.html           # Rivers quiz
│   │   ├── lakes.html            # Lakes quiz
│   │   ├── mountains.html        # Mountains quiz
│   │   ├── national-parks.html   # National Parks quiz
│   │   └── wetlands.html         # Wetlands quiz
│   └── states/                    # State-level quizzes
│       ├── rajasthan/
│       │   ├── districts.html
│       │   ├── lakes.html
│       │   ├── mountains.html
│       │   └── wildlife-sanctuaries.html
│       ├── bihar/
│       │   └── districts.html
│       └── uttar-pradesh/
│           └── districts.html
├── src/                           # Source code (JavaScript modules)
│   ├── js/
│   │   ├── core/                  # Core functionality
│   │   ├── data/                  # Data loading utilities
│   │   ├── quiz/                  # Quiz implementations
│   │   ├── ui/                    # UI components
│   │   └── visual/                # Visual effects
│   └── css/                       # Stylesheets
├── data/                          # Data files (CSV, GeoJSON)
└── legacy/                        # Old HTML files (archived)

```

## Path Conventions

### HTML Files
- Use **absolute paths** (starting with `/`) for:
  - CSS: `/src/css/quiz.css`
  - JavaScript modules: `/src/js/quiz/...`
  - Data files: `/data/...`

### JavaScript Modules
- Use **absolute paths** (starting with `/`) for data files:
  - `/data/india_states.geojson`
  - `/data/lakes_india.csv`
- Use **relative paths** for module imports:
  - `../core/map.js`
  - `./PointBasedQuiz.js`

## Benefits

1. **Clear Organization**: Files grouped by feature/functionality
2. **Scalability**: Easy to add new states or quiz types
3. **Maintainability**: Related files are together
4. **URL Structure**: Clean, semantic URLs (`/quizzes/india/lakes.html`)

## Adding New Quizzes

### India-Level Quiz
1. Create HTML file in `quizzes/india/`
2. Update `index.html` with link to new quiz
3. Use existing quiz implementations from `src/js/quiz/`

### State-Level Quiz
1. Create state folder if needed: `quizzes/states/[state-name]/`
2. Create HTML file in state folder
3. Update `index.html` with link to new quiz
4. Use `initDistrictsQuiz()` or create custom implementation

## Migration Notes

- Old HTML files moved to `legacy/` folder
- All paths updated to work from new locations
- Data paths use absolute paths (`/data/...`) for consistency
- Source paths use relative paths from HTML file location
