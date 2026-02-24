#!/usr/bin/env python3
"""
Update all quiz files to match the indian_states.html structure:
1. Add back button with quiz title card
2. Remove baselayers from non-world quizzes
3. Update map responsiveness
4. Show correct answers with permanent tooltips
"""

import os
import re
from pathlib import Path

quiz_dir = Path(__file__).parent.parent / 'quizzes'

# Define which quizzes should keep their baselayers
WORLD_QUIZZES = [
    'world_lakes_quiz.html',
    'world_mountains_quiz.html', 
    'world_volcanoes_quiz.html',
    'world_waterfalls_quiz.html',
    'world_rivers_quiz.html',
    'world_countries_quiz.html',
    'world_capitals_quiz.html',
    'oceans_quiz.html'
]

# Files that should be skipped (already updated or special cases)
SKIP_FILES = [
    'india_states.html',
    'quiz.html',
    'custom_quiz.html',
    'plot_river.html',
    'topographic_leaflet.html',
    'rivers_quiz_without_symbol.html',
    'current_affairs_quiz.html'
]

# Files with special naming
FILE_MAPPING = {
    'lakes_quiz.html': 'India Lakes',
    'mountains_quiz.html': 'Mountain Peaks',
    'rivers_quiz.html': 'Rivers of India',
    'national_parks_quiz.html': 'National Parks',
    'wetlands_quiz.html': 'Ramsar Wetlands',
    'india_waterfalls_quiz.html': 'Waterfalls of India',
    'india_monuments.html': 'Monuments of India',
    'india_renewable_energy_quiz.html': 'Renewable Energy Projects',
    'india_festivals_quiz.html': 'Famous Festivals',
    'india_nuclear_power_plants_quiz.html': 'Nuclear Power Plants',
    'india_mining_quiz.html': 'Mining Operations',
    'rajasthan_districts.html': 'Districts of Rajasthan',
    'rajasthan_mountains.html': 'Mountain Peaks of Rajasthan',
    'rajasthan_lakes.html': 'Lakes of Rajasthan',
    'rajasthan_minerals_quiz.html': 'Minerals of Rajasthan',
    'wls_rajasthan.html': 'Wildlife Sanctuaries',
    'wildlife_century_rajasthan_quiz.html': 'Wildlife Century Rajasthan',
    'bihar_districts.html': 'Districts of Bihar',
    'uttar_pradesh_districts.html': 'Districts of Uttar Pradesh'
}

def get_title_from_filename(filename):
    """Extract title from filename"""
    if filename in FILE_MAPPING:
        return FILE_MAPPING[filename]
    
    # Convert filename to title case
    name = filename.replace('.html', '').replace('_', ' ').replace('-', ' ')
    words = name.split()
    title = ' '.join(word.capitalize() for word in words)
    return title

def should_keep_baselayer(filename):
    """Check if this file is a world quiz and should keep baselayer"""
    return filename in WORLD_QUIZZES

def remove_baselayer(content):
    """Remove tilelayer/baselayer from quiz content"""
    # Remove tilelayer calls
    content = re.sub(
        r'\s*L\.tileLayer\([^)]+\)\.[^;]+;?\s*',
        '',
        content,
        flags=re.DOTALL
    )
    return content

def update_question_display(content):
    """Make sure correct answers are shown with permanent tooltips"""
    # This would require parsing the click handler - complex
    # Instead, we'll document this as a manual step
    return content

def process_quiz_file(filepath):
    """Process a single quiz file"""
    filename = filepath.name
    
    if filename in SKIP_FILES:
        print(f"⊘ Skipping {filename}")
        return
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"✗ Error reading {filename}: {e}")
        return
    
    # Remove baselayer if not a world quiz
    if not should_keep_baselayer(filename):
        content = remove_baselayer(content)
    
    # Save updated content
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Updated {filename}")
    except Exception as e:
        print(f"✗ Error writing {filename}: {e}")

def main():
    """Main function"""
    print("Updating quiz files...")
    print(f"Quiz directory: {quiz_dir}\n")
    
    if not quiz_dir.exists():
        print(f"Error: {quiz_dir} does not exist")
        return
    
    # Find all HTML files in quizzes directory
    html_files = sorted(quiz_dir.glob('*.html'))
    
    for filepath in html_files:
        process_quiz_file(filepath)
    
    print("\nNote: Manual updates needed for:")
    print("- Back button and title card layout")
    print("- Correct answer permanent tooltips")
    print("- Mobile responsive styling")

if __name__ == '__main__':
    main()
