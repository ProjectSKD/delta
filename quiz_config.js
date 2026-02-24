// quiz_config.js
// Central Registry for Geography Quizzes

const MARKER_VISUALS = {
    lakes: {
        default: { size: 18, fill: "#0077be", stroke: "#004e7c" },
        hover: { size: 22, fill: "#0099ff", stroke: "#004e7c" },
        correct: { size: 22, fill: "#1e9d46", stroke: "#0e6128" },
        wrong: { size: 22, fill: "#d33a32", stroke: "#8a1f1a" },
        target: { size: 26, fill: "#d33a32", stroke: "#8a1f1a" }
    },
    mountains: {
        default: { size: 18, fill: "#8b4513", stroke: "#5c2e0b" },
        hover: { size: 22, fill: "#a0522d", stroke: "#5c2e0b" },
        correct: { size: 22, fill: "#1e9d46", stroke: "#0e6128" },
        wrong: { size: 22, fill: "#d33a32", stroke: "#8a1f1a" },
        target: { size: 26, fill: "#d33a32", stroke: "#8a1f1a" }
    },
    monuments: {
        default: { size: 18, fill: "#800080", stroke: "#4b0082" },
        hover: { size: 22, fill: "#9932cc", stroke: "#4b0082" },
        correct: { size: 22, fill: "#1e9d46", stroke: "#0e6128" },
        wrong: { size: 22, fill: "#d33a32", stroke: "#8a1f1a" },
        target: { size: 26, fill: "#d33a32", stroke: "#8a1f1a" }
    },
    capitals: {
        default: { size: 18, fill: "#ff8c00", stroke: "#b8860b" },
        hover: { size: 22, fill: "#ffa500", stroke: "#b8860b" },
        correct: { size: 22, fill: "#1e9d46", stroke: "#0e6128" },
        wrong: { size: 22, fill: "#d33a32", stroke: "#8a1f1a" },
        target: { size: 26, fill: "#d33a32", stroke: "#8a1f1a" }
    },
    nature: {
        default: { size: 18, fill: "#228b22", stroke: "#006400" }, // Forest Green
        hover: { size: 22, fill: "#32cd32", stroke: "#006400" },
        correct: { size: 22, fill: "#1e9d46", stroke: "#0e6128" },
        wrong: { size: 22, fill: "#d33a32", stroke: "#8a1f1a" },
        target: { size: 26, fill: "#d33a32", stroke: "#8a1f1a" }
    },
    poly: {
        default: { size: 18, fill: "#607d8b", stroke: "#455a64" }
    }
};

const SVG_ICONS = {
    drop: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path><path d="M12 5.5l2.5 2.5h-5z" fill="#ffffff" opacity="0.6"></path></svg>',
    mountain: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L2 21h20L12 3z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path><path d="M12 3l-4 7.2h8L12 3z" fill="#ffffff" opacity="0.8"></path></svg>',
    star: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
    monument: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 21h10v-2H7v2zm2-2h6v-6H9v6zm-1-8h8V7H8v4zm2-6h4V3h-4v2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
    leaf: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C12 20 17 12 17 8z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5"/><path d="M17 8c-3.13 0-5.6 1.74-7.64 4.14l1.41 1.41C12.52 11.5 14.56 10 17 8z" fill="#ffffff" opacity="0.6"/></svg>',
    poly: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" fill="none" stroke="{STROKE}" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>',
    world: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" fill="none" stroke="{STROKE}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
};

/**
 * Quiz Configuration Structure:
 * category: "WORLD" | "INDIA" | "STATES" | "TOPICS_IN_NEW"
 * subcategory: Only required if category is STATES (e.g., "RAJASTHAN", "BIHAR")
 * external_url: Set this if the quiz uses a completely separate HTML file (like polygon districts or linestring rivers)
 */
const QUIZ_CONFIG = {
    // 🌊 WORLD — Oceans & Seas
    "world_oceans": { category: "WORLD", title: "Oceans & Seas", desc: "Identify 101 oceans, seas, gulfs & straits.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "oceans_quiz.html" },

    // 🏔️ WORLD — Mountain Peaks
    "world_mountains": { category: "WORLD", title: "World Mountain Peaks", desc: "Locate 29 famous peaks worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountains, external_url: "world_mountains_quiz.html" },

    // 💧 WORLD — Lakes
    "world_lakes": { category: "WORLD", title: "World Lakes", desc: "Find 39 major lakes across the globe.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.lakes, external_url: "world_lakes_quiz.html" },

    // 🌋 WORLD — Active Volcanoes
    "world_volcanoes": { category: "WORLD", title: "World Active Volcanoes", desc: "Locate 29 active volcanoes worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountains, external_url: "world_volcanoes_quiz.html" },

    // 🏞️ WORLD — Waterfalls
    "world_waterfalls": { category: "WORLD", title: "World Waterfalls", desc: "Locate 30 famous waterfalls worldwide.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.lakes, external_url: "world_waterfalls_quiz.html" },

    // � WORLD — Rivers (All)
    "world_rivers": { category: "WORLD", title: "World Rivers", desc: "Identify 100 major rivers worldwide.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html" },

    // 🌊 WORLD — Rivers by Continent
    "world_rivers_africa": { category: "WORLD", subcategory: "AFRICA", title: "Rivers of Africa", desc: "13 African rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=Africa" },
    "world_rivers_asia": { category: "WORLD", subcategory: "ASIA", title: "Rivers of Asia", desc: "29 Asian rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=Asia" },
    "world_rivers_europe": { category: "WORLD", subcategory: "EUROPE", title: "Rivers of Europe", desc: "17 European rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=Europe" },
    "world_rivers_north_america": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Rivers of N. America", desc: "19 North American rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=North America" },
    "world_rivers_south_america": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "Rivers of S. America", desc: "16 South American rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=South America" },
    "world_rivers_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Rivers of Oceania", desc: "6 Oceanian rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html?continent=Oceania" },

    // 📰 WORLD — Current Affairs
    "world_current_affairs": { category: "WORLD", title: "Current Affairs — World", desc: "96 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=world" },

    // 🌍 WORLD — All Countries
    "world_all": { category: "WORLD", title: "All Countries", desc: "Identify all 179 nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html" },

    // 🌍 WORLD — By Continent
    "world_africa": { category: "WORLD", subcategory: "AFRICA", title: "Africa — All Countries", desc: "54 African nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=Africa" },
    "world_africa_northern": { category: "WORLD", subcategory: "AFRICA", title: "Northern Africa", desc: "Egypt, Morocco, Tunisia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Northern+Africa" },
    "world_africa_western": { category: "WORLD", subcategory: "AFRICA", title: "Western Africa", desc: "Nigeria, Ghana, Senegal...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Western+Africa" },
    "world_africa_eastern": { category: "WORLD", subcategory: "AFRICA", title: "Eastern Africa", desc: "Kenya, Tanzania, Ethiopia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Eastern+Africa" },
    "world_africa_middle": { category: "WORLD", subcategory: "AFRICA", title: "Middle Africa", desc: "Congo, Cameroon, Chad...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Middle+Africa" },
    "world_africa_southern": { category: "WORLD", subcategory: "AFRICA", title: "Southern Africa", desc: "South Africa, Namibia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Southern+Africa" },

    "world_asia": { category: "WORLD", subcategory: "ASIA", title: "Asia — All Countries", desc: "48 Asian nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=Asia" },
    "world_asia_southern": { category: "WORLD", subcategory: "ASIA", title: "Southern Asia", desc: "India, Pakistan, Bangladesh...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Southern+Asia" },
    "world_asia_eastern": { category: "WORLD", subcategory: "ASIA", title: "Eastern Asia", desc: "China, Japan, South Korea...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Eastern+Asia" },
    "world_asia_western": { category: "WORLD", subcategory: "ASIA", title: "Western Asia", desc: "Turkey, Saudi Arabia, Iraq...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Western+Asia" },
    "world_asia_southeastern": { category: "WORLD", subcategory: "ASIA", title: "South-Eastern Asia", desc: "Indonesia, Thailand, Vietnam...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=South-Eastern+Asia" },
    "world_asia_central": { category: "WORLD", subcategory: "ASIA", title: "Central Asia", desc: "Kazakhstan, Uzbekistan...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Central+Asia" },

    "world_europe": { category: "WORLD", subcategory: "EUROPE", title: "Europe — All Countries", desc: "All European nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=Europe" },
    "world_europe_western": { category: "WORLD", subcategory: "EUROPE", title: "Western Europe", desc: "France, Germany, Netherlands...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Western+Europe" },
    "world_europe_eastern": { category: "WORLD", subcategory: "EUROPE", title: "Eastern Europe", desc: "Russia, Poland, Ukraine...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Eastern+Europe" },
    "world_europe_northern": { category: "WORLD", subcategory: "EUROPE", title: "Northern Europe", desc: "UK, Sweden, Norway...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Northern+Europe" },
    "world_europe_southern": { category: "WORLD", subcategory: "EUROPE", title: "Southern Europe", desc: "Italy, Spain, Greece...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Southern+Europe" },

    "world_north_america": { category: "WORLD", subcategory: "NORTH AMERICA", title: "North America — All", desc: "All North American nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=North+America" },
    "world_na_northern": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Northern America", desc: "USA, Canada, Greenland...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Northern+America" },
    "world_na_central": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Central America", desc: "Mexico, Guatemala, Panama...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Central+America" },
    "world_na_caribbean": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Caribbean", desc: "Cuba, Jamaica, Haiti...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?subregion=Caribbean" },

    "world_south_america": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "South America — All", desc: "All South American nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=South+America" },

    "world_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Oceania — All", desc: "Australia, New Zealand, Pacific Islands.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html?continent=Oceania" },

    // ⭐ WORLD CAPITALS — All
    "world_capitals_all": { category: "WORLD", title: "All World Capitals", desc: "Find capital cities of 194 nations.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html" },

    // ⭐ WORLD CAPITALS — By Continent
    "world_capitals_africa": { category: "WORLD", subcategory: "AFRICA", title: "Africa Capitals", desc: "Find capitals across Africa.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=Africa" },
    "world_capitals_africa_north": { category: "WORLD", subcategory: "AFRICA", title: "North Africa Capitals", desc: "Cairo, Algiers, Rabat...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=North+Africa" },
    "world_capitals_africa_west": { category: "WORLD", subcategory: "AFRICA", title: "West Africa Capitals", desc: "Accra, Abuja, Dakar...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=West+Africa" },
    "world_capitals_africa_east": { category: "WORLD", subcategory: "AFRICA", title: "East Africa Capitals", desc: "Nairobi, Addis Ababa...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=East+Africa" },
    "world_capitals_africa_central": { category: "WORLD", subcategory: "AFRICA", title: "Central Africa Capitals", desc: "Kinshasa, Yaoundé...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Central+Africa" },
    "world_capitals_africa_southern": { category: "WORLD", subcategory: "AFRICA", title: "Southern Africa Capitals", desc: "Pretoria, Windhoek...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Southern+Africa" },

    "world_capitals_asia": { category: "WORLD", subcategory: "ASIA", title: "Asia Capitals", desc: "Find capitals across Asia.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=Asia" },
    "world_capitals_asia_south": { category: "WORLD", subcategory: "ASIA", title: "South Asia Capitals", desc: "New Delhi, Dhaka, Kathmandu...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=South+Asia" },
    "world_capitals_asia_east": { category: "WORLD", subcategory: "ASIA", title: "East Asia Capitals", desc: "Beijing, Tokyo, Seoul...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=East+Asia" },
    "world_capitals_asia_west": { category: "WORLD", subcategory: "ASIA", title: "Western Asia Capitals", desc: "Riyadh, Ankara, Baghdad...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Western+Asia" },
    "world_capitals_asia_se": { category: "WORLD", subcategory: "ASIA", title: "Southeast Asia Capitals", desc: "Bangkok, Jakarta, Hanoi...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Southeast+Asia" },
    "world_capitals_asia_central": { category: "WORLD", subcategory: "ASIA", title: "Central Asia Capitals", desc: "Astana, Tashkent, Bishkek...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Central+Asia" },

    "world_capitals_europe": { category: "WORLD", subcategory: "EUROPE", title: "Europe Capitals", desc: "Find capitals across Europe.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=Europe" },
    "world_capitals_europe_west": { category: "WORLD", subcategory: "EUROPE", title: "Western Europe Capitals", desc: "Paris, Berlin, London...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Western+Europe" },
    "world_capitals_europe_east": { category: "WORLD", subcategory: "EUROPE", title: "Eastern Europe Capitals", desc: "Moscow, Kyiv, Warsaw...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Eastern+Europe" },
    "world_capitals_europe_north": { category: "WORLD", subcategory: "EUROPE", title: "Northern Europe Capitals", desc: "Stockholm, Oslo, Helsinki...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Northern+Europe" },
    "world_capitals_europe_south": { category: "WORLD", subcategory: "EUROPE", title: "Southern Europe Capitals", desc: "Rome, Athens, Madrid...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Southern+Europe" },
    "world_capitals_europe_se": { category: "WORLD", subcategory: "EUROPE", title: "Southeast Europe Capitals", desc: "Belgrade, Zagreb, Bucharest...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Southeast+Europe" },
    "world_capitals_europe_central": { category: "WORLD", subcategory: "EUROPE", title: "Central Europe Capitals", desc: "Prague, Budapest, Bratislava...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Central+Europe" },

    "world_capitals_na": { category: "WORLD", subcategory: "NORTH AMERICA", title: "N. America Capitals", desc: "Find capitals across the Americas.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=North+America" },
    "world_capitals_na_caribbean": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Caribbean Capitals", desc: "Havana, Kingston, Nassau...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Caribbean" },
    "world_capitals_na_central": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Central America Capitals", desc: "Mexico City, Guatemala City...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?subcontinent=Central+America" },

    "world_capitals_sa": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "S. America Capitals", desc: "Brasília, Buenos Aires, Lima...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=South+America" },

    "world_capitals_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Oceania Capitals", desc: "Canberra, Wellington, Suva...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html?continent=Oceania" },

    // 🇮🇳 INDIA Main Topics
    "india_states": {
        category: "INDIA", subcategory: "GENERAL",
        title: "States of India", desc: "Identify the political boundaries of Indian states.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly,
        external_url: "india_states.html"
    },
    "india_districts": {
        category: "INDIA", subcategory: "GENERAL",
        title: "All Districts of India", desc: "Identify all district poly boundaries.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly,
        external_url: "india_geojson_districts.html"
    },
    "india_state_capitals": {
        category: "INDIA", subcategory: "GENERAL",
        title: "State Capitals", desc: "Find the administrative capitals of every Indian state.",
        visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star,
        external_url: "india_state_capitals.html"
    },
    "india_monuments": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Monuments of India", desc: "Locate UNESCO World Heritage sites and historic landmarks.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "india_monuments.html"
    },
    "mountains_india": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Mountain Peaks", desc: "Identify the highest peaks of the Himalayas and beyond.",
        visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain,
        external_url: "mountains_quiz.html"
    },
    "lakes_india": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Lakes of India", desc: "Find major lakes across the Indian subcontinent.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop,
        external_url: "lakes_quiz.html"
    },
    "india_rivers": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Rivers of India", desc: "Trace the major river systems across India.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop,
        external_url: "rivers_quiz.html"
    },
    "india_national_parks": {
        category: "INDIA", subcategory: "GENERAL",
        title: "National Parks", desc: "Locate India's protected biodiversity hotspots.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.leaf,
        external_url: "national_parks_quiz.html"
    },
    "india_wetlands": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Ramsar Wetlands", desc: "Find internationally recognized wetlands.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.leaf,
        external_url: "wetlands_quiz.html"
    },

    // 🏞️ INDIA — Waterfalls
    "india_waterfalls": { category: "INDIA", subcategory: "GENERAL", title: "Waterfalls of India", desc: "Locate 20 famous waterfalls across India.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.lakes, external_url: "india_waterfalls_quiz.html" },

    // 📰 INDIA — Current Affairs
    "india_renewable_energy": {
        category: "INDIA", subcategory: "GENERAL", title: "Renewable Energy Projects", desc: "Locate major solar parks and wind farms.",
        visuals: { default: { fill: "#2e7d32", stroke: "#1b5e20" } }, icon_svg: SVG_ICONS.leaf,
        external_url: "india_renewable_energy_quiz.html"
    },
    "india_festivals": {
        category: "INDIA", subcategory: "GENERAL", title: "Famous Festivals", desc: "Identify famous festivals across India by their host cities.",
        visuals: { default: { fill: "#e65100", stroke: "#bf360c" } }, icon_svg: SVG_ICONS.star,
        external_url: "india_festivals_quiz.html"
    },
    "india_nuclear_power": {
        category: "INDIA", subcategory: "GENERAL", title: "Nuclear Power Plants", desc: "Identify India's nuclear power stations.",
        visuals: { default: { fill: "#1565c0", stroke: "#0d47a1" } }, icon_svg: SVG_ICONS.star,
        external_url: "india_nuclear_power_plants_quiz.html"
    },
    "coal_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Coal Mines", desc: "Identify major coalfields like Jharia and Raniganj.",
        visuals: { default: { fill: "#3e2723", stroke: "#3e2723" } }, icon_svg: SVG_ICONS.mountain,
        external_url: "india_mining_quiz.html?type=Coal"
    },
    "iron_ore": {
        category: "INDIA", subcategory: "MINERALS", title: "Iron Ore Mines", desc: "Locate high-grade hematite deposits like Bailadila.",
        visuals: { default: { fill: "#b71c1c", stroke: "#b71c1c" } }, icon_svg: SVG_ICONS.mountain,
        external_url: "india_mining_quiz.html?type=Iron%20Ore"
    },
    "copper_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Copper Mines", desc: "Explore the Khetri and Malanjkhand copper belts.",
        visuals: { default: { fill: "#e65100", stroke: "#e65100" } }, icon_svg: SVG_ICONS.mountain,
        external_url: "india_mining_quiz.html?type=Copper"
    },
    "lead_zinc_silver": {
        category: "INDIA", subcategory: "MINERALS", title: "Zinc, Lead & Silver", desc: "Find the major poly-metallic mines of Rajasthan.",
        visuals: { default: { fill: "#455a64", stroke: "#455a64" } }, icon_svg: SVG_ICONS.mountain,
        external_url: "india_mining_quiz.html?type=Zinc/Lead/Silver"
    },
    "uranium_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Uranium Mines", desc: "Locate strategic uranium reserves like Jaduguda.",
        visuals: { default: { fill: "#2e7d32", stroke: "#2e7d32" } }, icon_svg: SVG_ICONS.drop,
        external_url: "india_mining_quiz.html?type=Uranium"
    },
    "gold_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Gold Mines", desc: "Locate active gold mines in Hutti and beyond.",
        visuals: { default: { fill: "#fbc02d", stroke: "#fbc02d" } }, icon_svg: SVG_ICONS.star,
        external_url: "india_mining_quiz.html?type=Gold"
    },
    "bauxite_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Bauxite Mines", desc: "Explore major bauxite hubs in Koraput and Katni.",
        visuals: { default: { fill: "#c2185b", stroke: "#c2185b" } }, icon_svg: SVG_ICONS.poly,
        external_url: "india_mining_quiz.html?type=Bauxite"
    },
    "manganese_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Manganese Mines", desc: "Identify key manganese producers like Balaghat.",
        visuals: { default: { fill: "#7b1fa2", stroke: "#7b1fa2" } }, icon_svg: SVG_ICONS.poly,
        external_url: "india_mining_quiz.html?type=Manganese"
    },
    "other_minerals": {
        category: "INDIA", subcategory: "MINERALS", title: "Other Minerals", desc: "Petroleum, Diamonds, Mica, and Lignite mines.",
        visuals: { default: { fill: "#006064", stroke: "#006064" } }, icon_svg: SVG_ICONS.poly,
        external_url: "india_mining_quiz.html?type=Others"
    },
    "india_current_affairs": { category: "INDIA", title: "Current Affairs — India", desc: "47 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=india" },

    "india_cms": { category: "INDIA", title: "Chief Ministers", desc: "Identify states by CM.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, is_placeholder: true },
    "india_minerals": { category: "INDIA", title: "Mineral Belts", desc: "Locate major mineral deposits.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain, is_placeholder: true },
    "india_industry": { category: "INDIA", title: "Industrial Areas", desc: "Major manufacturing hubs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, is_placeholder: true },
    "india_soil": { category: "INDIA", title: "Soil Types", desc: "Geographical soil distributions.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, is_placeholder: true },
    "india_dynasty": { category: "INDIA", title: "Historical Dynasties", desc: "Ancient and medieval empires.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },
    "india_folk_music": { category: "INDIA", title: "Folk Music Regions", desc: "Musical heritage by state.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, is_placeholder: true },

    // 🚩 STATES Subcategories

    // -- RAJASTHAN
    "rajasthan_districts": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Districts of Rajasthan", desc: "Identify the 33 districts rest will be added soon.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly,
        external_url: "rajasthan_districts.html"
    },
    "mountains_rajasthan": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Mountain Peaks", desc: "Explore the ancient Aravalli Range.",
        visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain,
        external_url: "rajasthan_mountains.html"
    },
    "lakes_rajasthan": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Lakes", desc: "Locate the historic lakes of Rajasthan.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop,
        external_url: "rajasthan_lakes.html"
    },
    "rajasthan_wildlife": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Wildlife Sanctuaries", desc: "Protected ecological zones.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.leaf,
        external_url: "wls_rajasthan.html"
    },
    "rajasthan_monuments": { category: "STATES", subcategory: "RAJASTHAN", title: "Forts & Palaces", desc: "Historic Rajput architecture.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },
    "rajasthan_minerals": { category: "STATES", subcategory: "RAJASTHAN", title: "Minerals", desc: "Locate mining regions across Rajasthan.", visuals: { default: { fill: "#bf360c", stroke: "#bf360c" } }, icon_svg: SVG_ICONS.mountain, external_url: "rajasthan_minerals_quiz.html" },
    "rajasthan_sambhags": { category: "STATES", subcategory: "RAJASTHAN", title: "Sambhags (Divisions)", desc: "Administrative divisions.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, is_placeholder: true },

    // -- BIHAR
    "bihar_districts": {
        category: "STATES", subcategory: "BIHAR",
        title: "Districts of Bihar", desc: "Identify the 38 districts.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly,
        external_url: "bihar_districts.html"
    },
    "bihar_rivers": { category: "STATES", subcategory: "BIHAR", title: "Rivers", desc: "Ganga system and tributaries.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop, is_placeholder: true },
    "bihar_buddhist": { category: "STATES", subcategory: "BIHAR", title: "Buddhist Circuit", desc: "Ancient religious sites.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // -- UTTAR PRADESH
    "up_districts": {
        category: "STATES", subcategory: "UTTAR PRADESH",
        title: "Districts of UP", desc: "Identify the 75 districts.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly,
        external_url: "uttar_pradesh_districts.html"
    },
    "up_monuments": { category: "STATES", subcategory: "UTTAR PRADESH", title: "Monuments", desc: "Mughal and ancient architecture.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // -- HARYANA
    "haryana_districts": { category: "STATES", subcategory: "HARYANA", title: "Districts of Haryana", desc: "Identify the districts.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, is_placeholder: true },
    "haryana_indus": { category: "STATES", subcategory: "HARYANA", title: "Indus Valley Sites", desc: "Rakhigarhi and ancient sites.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // 📰 PLACES IN NEWS
    "ca_world": { category: "PLACES_IN_NEWS", title: "Current Affairs — World", desc: "96 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=world" },
    "ca_india": { category: "PLACES_IN_NEWS", title: "Current Affairs — India", desc: "47 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=india" },

    // ⭐ POPULAR — Most Played Quizzes
    "pop_countries": { category: "POPULAR", title: "All Countries", desc: "The classic — identify 179 nations on the map.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_countries_quiz.html" },
    "pop_capitals": { category: "POPULAR", title: "World Capitals", desc: "Find capitals across the globe.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "world_capitals_quiz.html" },
    "pop_india_states": { category: "POPULAR", title: "Indian States", desc: "Identify all states and UTs of India.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.poly, external_url: "india_states.html" },
    "pop_rivers": { category: "POPULAR", title: "World Rivers", desc: "100 major rivers worldwide.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_rivers_quiz.html" },
    "pop_mountains": { category: "POPULAR", title: "Mountain Peaks", desc: "29 famous peaks worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain, external_url: "world_mountains_quiz.html" },
    "pop_oceans": { category: "POPULAR", title: "Oceans & Seas", desc: "101 oceans, seas, gulfs & straits.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "world_oceans_quiz.html" },
    "pop_world_ca": { category: "POPULAR", title: "World Current Affairs", desc: "96 location-based current affairs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=world" },
    "pop_india_ca": { category: "POPULAR", title: "India Current Affairs", desc: "47 location-based current affairs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.star, external_url: "current_affairs_quiz.html?scope=india" },
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUIZ_CONFIG, MARKER_VISUALS, SVG_ICONS };
}
