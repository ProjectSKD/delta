#!/usr/bin/env python3
"""
Batch update all quiz HTML files:
1. Replace inline <style> with shared CSS <link>
2. Update <script src> paths to ../js/
3. Update fetch() data paths to ../data/csv/ and ../data/geojson/
4. Replace old back button with header-integrated version
5. Update back button href to ../index.html
6. Add quiz_status.js integration
"""

import os
import re
import glob

QUIZZES_DIR = '/Volumes/Mac-C/GITHUB/delta/quizzes'

# Files to process
html_files = glob.glob(os.path.join(QUIZZES_DIR, '*.html'))

# CSV files that exist in data/csv/
CSV_FILES = [
    'India_water_falls.csv', 'current_affairs_india.csv', 'current_affairs_world.csv',
    'india_festivals.csv', 'india_minerals.csv', 'india_monuments.csv',
    'india_nuclear_power_plants.csv', 'india_renewable_energy_projects.csv',
    'india_state_capitals.csv', 'india_unesco.csv', 'lakes_india.csv',
    'lakes_rajasthan.csv', 'mountain_india.csv', 'mountain_rajasthan.csv',
    'national_parks_india.csv', 'rajasthan_minerals.csv', 'rajasthan_monuments.csv',
    'ramsar_wetlands_india.csv', 'wildlife_sanctuaries_rajasthan.csv',
    'world_active_volcanos.csv', 'world_capitals.csv', 'world_lakes.csv',
    'world_mountain_peaks.csv', 'world_waterfalls.csv'
]

# GeoJSON files that exist in data/geojson/
GEOJSON_FILES = [
    'Rivers_compressed.geojson', 'india_districts.geojson', 'india_states.geojson',
    'india_with_districts.geojson', 'lakes_data.geojson', 'national_parks.geojson',
    'oceans.geojson', 'world_countries.geojson', 'world_rivers.geojson'
]

def update_file(filepath):
    filename = os.path.basename(filepath)
    print(f"Processing: {filename}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Add shared CSS link after leaflet CSS (if not already present)
    if 'quiz-shared.css' not in content:
        # Add after leaflet CSS link
        content = content.replace(
            '<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />',
            '<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />\n    <link rel="stylesheet" href="../css/quiz-shared.css" />'
        )

    # 2. Update script src paths
    content = content.replace('src="quiz_common.js"', 'src="../js/quiz_common.js"')
    content = content.replace('src="quiz_config.js"', 'src="../js/quiz_config.js"')
    content = content.replace('src="quiz_engine.js"', 'src="../js/quiz_engine.js"')

    # 3. Update CSV fetch paths
    for csv_file in CSV_FILES:
        # Match various patterns: fetch("file.csv"), fetch('file.csv'), fetch("./file.csv")
        content = content.replace(f'"{csv_file}"', f'"../data/csv/{csv_file}"')
        content = content.replace(f"'{csv_file}'", f"'../data/csv/{csv_file}'")

    # 4. Update GeoJSON fetch paths
    for geojson_file in GEOJSON_FILES:
        content = content.replace(f'"{geojson_file}"', f'"../data/geojson/{geojson_file}"')
        content = content.replace(f"'{geojson_file}'", f"'../data/geojson/{geojson_file}'")

    # 5. Replace old back button with new header-integrated version
    # Remove old floating back button
    old_back_patterns = [
        '<a href="index.html" class="back-btn">← Back</a>',
        '<a href="index.html" class="back-btn">← Back to Menu</a>',
        '<a href="index.html" class="back-btn">&#8592; Back</a>',
    ]
    for pattern in old_back_patterns:
        content = content.replace(pattern, '')

    # 6. Update back button href
    content = content.replace('href="index.html"', 'href="../index.html"')

    # 7. Add back button inside the header if not already there
    # Find the score overlay div and add the back button after it
    if 'back-btn' not in content and '<div id="score"' in content:
        content = content.replace(
            '</div>\n        <div id="question"',
            '</div>\n        <a href="../index.html" class="back-btn"><svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back</a>\n        <div id="question"'
        )
    elif 'back-btn' not in content:
        # Fallback: add before </body>
        content = content.replace(
            '</body>',
            '    <a href="../index.html" class="back-btn" style="position:fixed;bottom:20px;left:20px;z-index:1000;"><svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back</a>\n</body>'
        )

    # 8. Remove all the duplicated CSS blocks that are now in quiz-shared.css
    # We'll remove the big inline <style> blocks for common quiz styling
    # Be careful: only remove if we added the shared CSS link
    if 'quiz-shared.css' in content:
        # Remove common CSS patterns that are now in shared CSS
        # Remove back-btn CSS block
        content = re.sub(
            r'\n\s*\.back-btn\s*\{[^}]*\}\s*\n\s*\.back-btn:hover\s*\{[^}]*\}',
            '', content
        )

    # 9. Add quiz_status.js script
    if 'quiz_status.js' not in content:
        content = content.replace(
            'src="../js/quiz_common.js"',
            'src="../js/quiz_common.js">\n    </script>\n    <script src="../js/quiz_status.js"'
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated")
    else:
        print(f"  - No changes needed")

# Process all files
for filepath in sorted(html_files):
    update_file(filepath)

print(f"\nDone! Processed {len(html_files)} files.")
