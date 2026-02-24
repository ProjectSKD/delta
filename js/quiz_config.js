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
        default: { size: 18, fill: "#228b22", stroke: "#006400" },
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
    // 💧 Water drop (lakes)
    drop: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path><path d="M12 5.5l2.5 2.5h-5z" fill="#ffffff" opacity="0.6"></path></svg>',
    // 🏔 Mountain
    mountain: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L2 21h20L12 3z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path><path d="M12 3l-4 7.2h8L12 3z" fill="#ffffff" opacity="0.8"></path></svg>',
    // ⭐ Star (capitals, current affairs)
    star: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
    // 🏛 Monument/Fort
    monument: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 21h10v-2H7v2zm2-2h6v-6H9v6zm-1-8h8V7H8v4zm2-6h4V3h-4v2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"></path></svg>',
    // 🌿 Leaf (nature/parks)
    leaf: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C12 20 17 12 17 8z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5"/><path d="M17 8c-3.13 0-5.6 1.74-7.64 4.14l1.41 1.41C12.52 11.5 14.56 10 17 8z" fill="#ffffff" opacity="0.6"/></svg>',
    // 🗺 Map polygon (districts)
    poly: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" fill="none" stroke="{STROKE}" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>',
    // 🌊 Wave (oceans)
    wave: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12c2-2 4-4 6-2s4 4 6 2 4-4 6-2" fill="none" stroke="{STROKE}" stroke-width="2.5" stroke-linecap="round"/><path d="M2 17c2-2 4-4 6-2s4 4 6 2 4-4 6-2" fill="none" stroke="{STROKE}" stroke-width="2" stroke-linecap="round" opacity="0.5"/></svg>',
    // 🌍 Globe (world countries)
    world: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" fill="none" stroke="{STROKE}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    // 🌋 Volcano
    volcano: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18l-5-12h-2l1 3h-6l1-3h-2L3 21z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 6c0-1 .5-2 2-2s2 1 2 2" fill="none" stroke="#ff4444" stroke-width="1.5" stroke-linecap="round"/><circle cx="11" cy="3" r="1" fill="#ff6b6b"/><circle cx="13.5" cy="2.5" r="0.7" fill="#ff8c42"/></svg>',
    // 🏞 River
    river: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-2 4-1 6 1 8s3 4 1 8c-1 2-2 4-2 4" fill="none" stroke="{STROKE}" stroke-width="2.5" stroke-linecap="round"/><path d="M8 5c-1 3 0 5 1.5 6.5" fill="none" stroke="{STROKE}" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>',
    // ⛲ Waterfall
    waterfall: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v6c0 2 2 4 6 4s6-2 6-4V3" fill="none" stroke="{STROKE}" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="13" x2="9" y2="20" stroke="{STROKE}" stroke-width="2" stroke-linecap="round" stroke-dasharray="1,3"/><line x1="12" y1="13" x2="12" y2="21" stroke="{STROKE}" stroke-width="2" stroke-linecap="round" stroke-dasharray="1,3"/><line x1="15" y1="13" x2="15" y2="19" stroke="{STROKE}" stroke-width="2" stroke-linecap="round" stroke-dasharray="1,3"/></svg>',
    // 🏛 Capitol building (capitals)
    capitol: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 20h20v1H2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1"/><rect x="4" y="12" width="2" height="8" fill="{FILL}" stroke="{STROKE}" stroke-width="0.8"/><rect x="9" y="12" width="2" height="8" fill="{FILL}" stroke="{STROKE}" stroke-width="0.8"/><rect x="14" y="12" width="2" height="8" fill="{FILL}" stroke="{STROKE}" stroke-width="0.8"/><rect x="18" y="12" width="2" height="8" fill="{FILL}" stroke="{STROKE}" stroke-width="0.8"/><path d="M3 12h18l-9-8-9 8z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="12" cy="7" r="1.5" fill="#ffffff" opacity="0.6"/></svg>',
    // ⛏ Mining/Minerals
    pickaxe: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 3L6 11.5l2.5 2.5L17 5.5 14.5 3z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"/><line x1="8" y1="14" x2="3" y2="21" stroke="{STROKE}" stroke-width="2" stroke-linecap="round"/><path d="M17 5.5l3.5-1.5-1.5 3.5-2-2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1"/></svg>',
    // ⚡ Energy
    bolt: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    // 🎪 Festival
    festival: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 10H4L12 2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5" stroke-linejoin="round"/><rect x="4" y="12" width="16" height="8" rx="1" fill="{FILL}" stroke="{STROKE}" stroke-width="1.2"/><line x1="12" y1="2" x2="12" y2="12" stroke="{STROKE}" stroke-width="1.2"/><circle cx="12" cy="1.5" r="1" fill="#ffeb3b"/></svg>',
    // 📰 News pin
    newspin: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="10" r="7" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5"/><path d="M12 17l-3 5h6l-3-5z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.2"/><text x="12" y="13" text-anchor="middle" fill="white" font-size="8" font-weight="bold">!</text></svg>',
    // 📍 Pin (districts)
    pin: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.5"/><circle cx="12" cy="9" r="2.5" fill="#ffffff" opacity="0.8"/></svg>',
    // 🌲 Forest/Tree (parks/wildlife)
    forest: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L6 10h3l-3 5h3l-3 5h12l-3-5h3l-3-5h3L12 2z" fill="{FILL}" stroke="{STROKE}" stroke-width="1.2" stroke-linejoin="round"/><rect x="11" y="20" width="2" height="2" fill="{STROKE}"/></svg>',
    // 🇮🇳 India geo icon
    india: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c-1 1-1.5 3-1 5l-2 1c-1-0.5-2.5 0-2.5 1.5c0 1 1 1.5 2 1.5l-1 2c-1.5-0.5-3 1-2.5 2.5c0.5 1.5 2.5 2 3.5 1.5l1.5 2.5c-0.5 1-1 2.5 0.5 3c1.5 0.5 2.5-0.5 2.5-1.5l0.5-1.5l1 1c0 1.5 1.5 2.5 3 2c1-0.5 1.5-1.5 1-2.5l0.5-1c0.5 0 1.5 0.5 2 0c0.5-1 0-2-1-1.5l-0.5-2.5c0.5-1 1.5-1.5 1.5-3c0-1.5-1.5-2-2.5-1.5l-2-3c0-1 0.5-2.5-1-3c-1-0.5-2 0-2 1l-1.5-1.5c0.5-1 0-3-1.5-3z" fill="{FILL}" stroke="{STROKE}" stroke-width="0.5" stroke-linejoin="round"/></svg>',
    // 🏜️ Rajasthan geo icon  
    rajasthan: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h18c1 0 2 1 2 2v12c0 1-1 2-2 2H2c-1 0-2-1-2-2V6c0-1 1-2 2-2M6 8v8M10 7v10M14 9v8m4-9v7M4 12h16" fill="none" stroke="{STROKE}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"/></svg>',
    // 🌏 Asia geo icon
    asia: '<svg width="{SIZE}" height="{SIZE}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1c-6 0-11 5-11 11s5 11 11 11 11-5 11-11-5-11-11-11zm-1 3l3 4h-3l-2-1v-3h2zm3 3l4 3-2 2-3-1v-4zm-6 2l3 1 2 3-2 1-3-2v-3zm7 1l3 2-1 3-3-2v-3zm-8 3l2 2-1 3-2-1v-4zm9 1l2 2v3l-2-1v-4zm-9 4l2 2-2 2-1-1v-3zm10 0l1 3-2 1-1-2v-2z" fill="{FILL}" stroke="{STROKE}" stroke-width="0.5" stroke-linejoin="round"/></svg>'
};

/**
 * Quiz Configuration Structure:
 * category: "WORLD" | "INDIA" | "STATES" | "PLACES_IN_NEWS"
 * subcategory: Only required if category is STATES (e.g., "RAJASTHAN", "BIHAR")
 * external_url: Set this if the quiz uses a completely separate HTML file
 */
const QUIZ_CONFIG = {
    // 🌊 WORLD — Oceans & Seas
    "world_oceans": { category: "WORLD", title: "Oceans & Seas", desc: "Identify 101 oceans, seas, gulfs & straits.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.wave, external_url: "quizzes/oceans_quiz.html" },

    // 🏔️ WORLD — Mountain Peaks
    "world_mountains": { category: "WORLD", title: "World Mountain Peaks", desc: "Locate 29 famous peaks worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain, external_url: "quizzes/world_mountains_quiz.html" },

    // 💧 WORLD — Lakes
    "world_lakes": { category: "WORLD", title: "World Lakes", desc: "Find 39 major lakes across the globe.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop, external_url: "quizzes/world_lakes_quiz.html" },

    // 🌋 WORLD — Active Volcanoes
    "world_volcanoes": { category: "WORLD", title: "World Active Volcanoes", desc: "Locate 29 active volcanoes worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.volcano, external_url: "quizzes/world_volcanoes_quiz.html" },

    // 🏞️ WORLD — Waterfalls
    "world_waterfalls": { category: "WORLD", title: "World Waterfalls", desc: "Locate 30 famous waterfalls worldwide.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.waterfall, external_url: "quizzes/world_waterfalls_quiz.html" },

    // 🏞 WORLD — Rivers (All)
    "world_rivers": { category: "WORLD", title: "World Rivers", desc: "Identify 100 major rivers worldwide.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html" },

    // 🌬 WORLD — Local Winds
    "world_winds": { category: "WORLD", title: "Local Winds", desc: "Identify major global regional winds.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.wave, external_url: "quizzes/world_local_winds_quiz.html" },

    // 🌊 WORLD — Rivers by Continent
    "world_rivers_africa": { category: "WORLD", subcategory: "AFRICA", title: "Rivers of Africa", desc: "13 African rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=Africa" },
    "world_rivers_asia": { category: "WORLD", subcategory: "ASIA", title: "Rivers of Asia", desc: "29 Asian rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=Asia" },
    "world_rivers_europe": { category: "WORLD", subcategory: "EUROPE", title: "Rivers of Europe", desc: "17 European rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=Europe" },
    "world_rivers_north_america": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Rivers of N. America", desc: "19 North American rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=North America" },
    "world_rivers_south_america": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "Rivers of S. America", desc: "16 South American rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=South America" },
    "world_rivers_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Rivers of Oceania", desc: "6 Oceanian rivers.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html?continent=Oceania" },

    // 📰 WORLD — Current Affairs
    "world_current_affairs": { category: "WORLD", title: "Current Affairs — World", desc: "96 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=world" },

    // 🌍 WORLD — All Countries
    "world_all": { category: "WORLD", title: "All Countries", desc: "Identify all 179 nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html" },

    // 🌍 WORLD — By Continent
    "world_africa": { category: "WORLD", subcategory: "AFRICA", title: "Africa — All Countries", desc: "54 African nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?continent=Africa" },
    "world_africa_northern": { category: "WORLD", subcategory: "AFRICA", title: "Northern Africa", desc: "Egypt, Morocco, Tunisia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Northern+Africa" },
    "world_africa_western": { category: "WORLD", subcategory: "AFRICA", title: "Western Africa", desc: "Nigeria, Ghana, Senegal...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Western+Africa" },
    "world_africa_eastern": { category: "WORLD", subcategory: "AFRICA", title: "Eastern Africa", desc: "Kenya, Tanzania, Ethiopia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Eastern+Africa" },
    "world_africa_middle": { category: "WORLD", subcategory: "AFRICA", title: "Middle Africa", desc: "Congo, Cameroon, Chad...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Middle+Africa" },
    "world_africa_southern": { category: "WORLD", subcategory: "AFRICA", title: "Southern Africa", desc: "South Africa, Namibia...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Southern+Africa" },

    "world_asia": { category: "WORLD", subcategory: "ASIA", title: "Asia — All Countries", desc: "48 Asian nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?continent=Asia" },
    "world_asia_southern": { category: "WORLD", subcategory: "ASIA", title: "Southern Asia", desc: "India, Pakistan, Bangladesh...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?subregion=Southern+Asia" },
    "world_asia_eastern": { category: "WORLD", subcategory: "ASIA", title: "Eastern Asia", desc: "China, Japan, South Korea...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?subregion=Eastern+Asia" },
    "world_asia_western": { category: "WORLD", subcategory: "ASIA", title: "Western Asia", desc: "Turkey, Saudi Arabia, Iraq...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?subregion=Western+Asia" },
    "world_asia_southeastern": { category: "WORLD", subcategory: "ASIA", title: "South-Eastern Asia", desc: "Indonesia, Thailand, Vietnam...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?subregion=South-Eastern+Asia" },
    "world_asia_central": { category: "WORLD", subcategory: "ASIA", title: "Central Asia", desc: "Kazakhstan, Uzbekistan...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.asia, external_url: "quizzes/world_countries_quiz.html?subregion=Central+Asia" },

    "world_europe": { category: "WORLD", subcategory: "EUROPE", title: "Europe — All Countries", desc: "All European nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?continent=Europe" },
    "world_europe_western": { category: "WORLD", subcategory: "EUROPE", title: "Western Europe", desc: "France, Germany, Netherlands...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Western+Europe" },
    "world_europe_eastern": { category: "WORLD", subcategory: "EUROPE", title: "Eastern Europe", desc: "Russia, Poland, Ukraine...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Eastern+Europe" },
    "world_europe_northern": { category: "WORLD", subcategory: "EUROPE", title: "Northern Europe", desc: "UK, Sweden, Norway...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Northern+Europe" },
    "world_europe_southern": { category: "WORLD", subcategory: "EUROPE", title: "Southern Europe", desc: "Italy, Spain, Greece...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Southern+Europe" },

    "world_north_america": { category: "WORLD", subcategory: "NORTH AMERICA", title: "North America — All", desc: "All North American nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?continent=North+America" },
    "world_na_northern": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Northern America", desc: "USA, Canada, Greenland...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Northern+America" },
    "world_na_central": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Central America", desc: "Mexico, Guatemala, Panama...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Central+America" },
    "world_na_caribbean": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Caribbean", desc: "Cuba, Jamaica, Haiti...", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?subregion=Caribbean" },

    "world_south_america": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "South America — All", desc: "All South American nations.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?continent=South+America" },

    "world_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Oceania — All", desc: "Australia, New Zealand, Pacific Islands.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html?continent=Oceania" },

    // ⭐ WORLD CAPITALS — All
    "world_capitals_all": { category: "WORLD", title: "All World Capitals", desc: "Find capital cities of 194 nations.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html" },

    // ⭐ WORLD CAPITALS — By Continent
    "world_capitals_africa": { category: "WORLD", subcategory: "AFRICA", title: "Africa Capitals", desc: "Find capitals across Africa.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=Africa" },
    "world_capitals_africa_north": { category: "WORLD", subcategory: "AFRICA", title: "North Africa Capitals", desc: "Cairo, Algiers, Rabat...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=North+Africa" },
    "world_capitals_africa_west": { category: "WORLD", subcategory: "AFRICA", title: "West Africa Capitals", desc: "Accra, Abuja, Dakar...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=West+Africa" },
    "world_capitals_africa_east": { category: "WORLD", subcategory: "AFRICA", title: "East Africa Capitals", desc: "Nairobi, Addis Ababa...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=East+Africa" },
    "world_capitals_africa_central": { category: "WORLD", subcategory: "AFRICA", title: "Central Africa Capitals", desc: "Kinshasa, Yaoundé...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Central+Africa" },
    "world_capitals_africa_southern": { category: "WORLD", subcategory: "AFRICA", title: "Southern Africa Capitals", desc: "Pretoria, Windhoek...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Southern+Africa" },

    "world_capitals_asia": { category: "WORLD", subcategory: "ASIA", title: "Asia Capitals", desc: "Find capitals across Asia.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=Asia" },
    "world_capitals_asia_south": { category: "WORLD", subcategory: "ASIA", title: "South Asia Capitals", desc: "New Delhi, Dhaka, Kathmandu...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=South+Asia" },
    "world_capitals_asia_east": { category: "WORLD", subcategory: "ASIA", title: "East Asia Capitals", desc: "Beijing, Tokyo, Seoul...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=East+Asia" },
    "world_capitals_asia_west": { category: "WORLD", subcategory: "ASIA", title: "Western Asia Capitals", desc: "Riyadh, Ankara, Baghdad...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Western+Asia" },
    "world_capitals_asia_se": { category: "WORLD", subcategory: "ASIA", title: "Southeast Asia Capitals", desc: "Bangkok, Jakarta, Hanoi...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Southeast+Asia" },
    "world_capitals_asia_central": { category: "WORLD", subcategory: "ASIA", title: "Central Asia Capitals", desc: "Astana, Tashkent, Bishkek...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Central+Asia" },

    "world_capitals_europe": { category: "WORLD", subcategory: "EUROPE", title: "Europe Capitals", desc: "Find capitals across Europe.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=Europe" },
    "world_capitals_europe_west": { category: "WORLD", subcategory: "EUROPE", title: "Western Europe Capitals", desc: "Paris, Berlin, London...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Western+Europe" },
    "world_capitals_europe_east": { category: "WORLD", subcategory: "EUROPE", title: "Eastern Europe Capitals", desc: "Moscow, Kyiv, Warsaw...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Eastern+Europe" },
    "world_capitals_europe_north": { category: "WORLD", subcategory: "EUROPE", title: "Northern Europe Capitals", desc: "Stockholm, Oslo, Helsinki...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Northern+Europe" },
    "world_capitals_europe_south": { category: "WORLD", subcategory: "EUROPE", title: "Southern Europe Capitals", desc: "Rome, Athens, Madrid...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Southern+Europe" },
    "world_capitals_europe_se": { category: "WORLD", subcategory: "EUROPE", title: "Southeast Europe Capitals", desc: "Belgrade, Zagreb, Bucharest...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Southeast+Europe" },
    "world_capitals_europe_central": { category: "WORLD", subcategory: "EUROPE", title: "Central Europe Capitals", desc: "Prague, Budapest, Bratislava...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Central+Europe" },

    "world_capitals_na": { category: "WORLD", subcategory: "NORTH AMERICA", title: "N. America Capitals", desc: "Find capitals across the Americas.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=North+America" },
    "world_capitals_na_caribbean": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Caribbean Capitals", desc: "Havana, Kingston, Nassau...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Caribbean" },
    "world_capitals_na_central": { category: "WORLD", subcategory: "NORTH AMERICA", title: "Central America Capitals", desc: "Mexico City, Guatemala City...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?subcontinent=Central+America" },

    "world_capitals_sa": { category: "WORLD", subcategory: "SOUTH AMERICA", title: "S. America Capitals", desc: "Brasília, Buenos Aires, Lima...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=South+America" },

    "world_capitals_oceania": { category: "WORLD", subcategory: "OCEANIA", title: "Oceania Capitals", desc: "Canberra, Wellington, Suva...", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html?continent=Oceania" },

    "world_deserts": { category: "WORLD", subcategory: "PHYSICAL", title: "World Deserts", desc: "Locate major deserts across the globe.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.mountain, external_url: "quizzes/world_deserts_quiz.html" },

    // 🇮🇳 INDIA Main Topics
    "india_states": {
        category: "INDIA", subcategory: "GENERAL",
        title: "States of India", desc: "Identify the political boundaries of Indian states.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.india,
        external_url: "quizzes/india_states.html"
    },
    "india_state_capitals": {
        category: "INDIA", subcategory: "GENERAL",
        title: "State Capitals", desc: "Find the administrative capitals of every Indian state.",
        visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.india,
        external_url: "quizzes/india_state_capitals.html"
    },
    "india_monuments": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Monuments of India", desc: "Locate UNESCO World Heritage sites and historic landmarks.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/india_monuments.html"
    },
    "india_medieval": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Medieval History", desc: "Locate historical battles and events.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/india_medieval_quiz.html"
    },
    "history_modal": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Historical Events", desc: "Locate major milestones in Indian history.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/universal_history_modal_quiz.html?dataset=history_modal.geojson&title=Indian+Historical+Events&region=india"
    },
    "rajasthan_current_affairs": {
        category: "RAJASTHAN", subcategory: "CURRENT_AFFAIRS",
        title: "Latest Developments", desc: "Identify major ongoing events and infrastructure projects.",
        visuals: MARKER_VISUALS.events, icon_svg: SVG_ICONS.development,
        external_url: "quizzes/current_affairs_quiz.html"
    },

    "mountains_india": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Mountain Peaks", desc: "Identify the highest peaks of the Himalayas and beyond.",
        visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain,
        external_url: "quizzes/mountains_quiz.html"
    },
    "lakes_india": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Lakes of India", desc: "Find major lakes across the Indian subcontinent.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop,
        external_url: "quizzes/lakes_quiz.html"
    },
    "india_rivers": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Rivers of India", desc: "Trace the major river systems across India.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.river,
        external_url: "quizzes/rivers_quiz.html"
    },
    "india_rivers_ganga": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Ganga River System", desc: "Identify rivers within the Ganga basin.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.river,
        external_url: "quizzes/rivers_quiz.html?basin=Ganga"
    },
    "india_rivers_brahmaputra": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Brahmaputra River System", desc: "Identify rivers within the Brahmaputra basin.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.river,
        external_url: "quizzes/rivers_quiz.html?basin=Brahamaputra"
    },
    "india_national_parks": {
        category: "INDIA", subcategory: "GENERAL",
        title: "National Parks", desc: "Locate India's protected biodiversity hotspots.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.forest,
        external_url: "quizzes/national_parks_quiz.html"
    },
    "india_wetlands": {
        category: "INDIA", subcategory: "GENERAL",
        title: "Ramsar Wetlands", desc: "Find internationally recognized wetlands.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.forest,
        external_url: "quizzes/wetlands_quiz.html"
    },
    "india_waterfalls": { category: "INDIA", subcategory: "GENERAL", title: "Waterfalls of India", desc: "Locate 20 famous waterfalls across India.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.waterfall, external_url: "quizzes/india_waterfalls_quiz.html" },

    // 📰 INDIA — Current Affairs
    "india_renewable_energy": {
        category: "INDIA", subcategory: "GENERAL", title: "Renewable Energy Projects", desc: "Locate major solar parks and wind farms.",
        visuals: { default: { fill: "#2e7d32", stroke: "#1b5e20" } }, icon_svg: SVG_ICONS.bolt,
        external_url: "quizzes/india_renewable_energy_quiz.html"
    },
    "india_festivals": {
        category: "INDIA", subcategory: "GENERAL", title: "Famous Festivals", desc: "Identify famous festivals across India by their host cities.",
        visuals: { default: { fill: "#e65100", stroke: "#bf360c" } }, icon_svg: SVG_ICONS.festival,
        external_url: "quizzes/india_festivals_quiz.html"
    },
    "india_nuclear_power": {
        category: "INDIA", subcategory: "GENERAL", title: "Nuclear Power Plants", desc: "Identify India's nuclear power stations.",
        visuals: { default: { fill: "#1565c0", stroke: "#0d47a1" } }, icon_svg: SVG_ICONS.bolt,
        external_url: "quizzes/india_nuclear_power_plants_quiz.html"
    },
    "coal_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Coal Mines", desc: "Identify major coalfields like Jharia and Raniganj.",
        visuals: { default: { fill: "#3e2723", stroke: "#3e2723" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Coal"
    },
    "iron_ore": {
        category: "INDIA", subcategory: "MINERALS", title: "Iron Ore Mines", desc: "Locate high-grade hematite deposits like Bailadila.",
        visuals: { default: { fill: "#b71c1c", stroke: "#b71c1c" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Iron%20Ore"
    },
    "copper_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Copper Mines", desc: "Explore the Khetri and Malanjkhand copper belts.",
        visuals: { default: { fill: "#e65100", stroke: "#e65100" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Copper"
    },
    "lead_zinc_silver": {
        category: "INDIA", subcategory: "MINERALS", title: "Zinc, Lead & Silver", desc: "Find the major poly-metallic mines of Rajasthan.",
        visuals: { default: { fill: "#455a64", stroke: "#455a64" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Zinc/Lead/Silver"
    },
    "uranium_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Uranium Mines", desc: "Locate strategic uranium reserves like Jaduguda.",
        visuals: { default: { fill: "#2e7d32", stroke: "#2e7d32" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Uranium"
    },
    "gold_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Gold Mines", desc: "Locate active gold mines in Hutti and beyond.",
        visuals: { default: { fill: "#fbc02d", stroke: "#fbc02d" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Gold"
    },
    "bauxite_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Bauxite Mines", desc: "Explore major bauxite hubs in Koraput and Katni.",
        visuals: { default: { fill: "#c2185b", stroke: "#c2185b" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Bauxite"
    },
    "manganese_mines": {
        category: "INDIA", subcategory: "MINERALS", title: "Manganese Mines", desc: "Identify key manganese producers like Balaghat.",
        visuals: { default: { fill: "#7b1fa2", stroke: "#7b1fa2" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Manganese"
    },
    "other_minerals": {
        category: "INDIA", subcategory: "MINERALS", title: "Other Minerals", desc: "Petroleum, Diamonds, Mica, and Lignite mines.",
        visuals: { default: { fill: "#006064", stroke: "#006064" } }, icon_svg: SVG_ICONS.pickaxe,
        external_url: "quizzes/india_mining_quiz.html?type=Others"
    },
    "india_current_affairs": { category: "INDIA", title: "Current Affairs — India", desc: "47 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=india" },

    "india_cms": { category: "INDIA", title: "Chief Ministers", desc: "Identify states by CM.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin, is_placeholder: true },
    "india_minerals": { category: "INDIA", title: "Mineral Belts", desc: "Locate major mineral deposits.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.pickaxe, is_placeholder: true },
    "india_industry": { category: "INDIA", title: "Industrial Areas", desc: "Major manufacturing hubs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.bolt, is_placeholder: true },
    "india_soil": { category: "INDIA", title: "Soil Types", desc: "Geographical soil distributions.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin, is_placeholder: true },
    "india_dynasty": { category: "INDIA", title: "Historical Dynasties", desc: "Ancient and medieval empires.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },
    "india_folk_music": { category: "INDIA", title: "Folk Music Regions", desc: "Musical heritage by state.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.festival, is_placeholder: true },

    // 🚩 STATES Subcategories

    // -- RAJASTHAN
    "rajasthan_districts": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Districts of Rajasthan", desc: "Identify the 33 districts rest will be added soon.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.rajasthan,
        external_url: "quizzes/rajasthan_districts.html"
    },
    "mountains_rajasthan": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Mountain Peaks", desc: "Explore the ancient Aravalli Range.",
        visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain,
        external_url: "quizzes/rajasthan_mountains.html"
    },
    "lakes_rajasthan": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Lakes", desc: "Locate the historic lakes of Rajasthan.",
        visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.drop,
        external_url: "quizzes/rajasthan_lakes.html"
    },
    "rajasthan_wildlife": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Wildlife Sanctuaries", desc: "Protected ecological zones.",
        visuals: MARKER_VISUALS.nature, icon_svg: SVG_ICONS.forest,
        external_url: "quizzes/wls_rajasthan.html"
    },
    "rajasthan_monuments": { category: "STATES", subcategory: "RAJASTHAN", title: "Forts & Palaces", desc: "Historic Rajput architecture.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },
    "rajasthan_prajamandal": { category: "STATES", subcategory: "RAJASTHAN", title: "Prajamandal Movement", desc: "Historical events and founders.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, external_url: "quizzes/rajasthan_prajamandal.html" },
    "rajasthan_minerals": { category: "STATES", subcategory: "RAJASTHAN", title: "Minerals", desc: "Locate mining regions across Rajasthan.", visuals: { default: { fill: "#bf360c", stroke: "#bf360c" } }, icon_svg: SVG_ICONS.pickaxe, external_url: "quizzes/rajasthan_minerals_quiz.html" },
    "rajasthan_sambhags": { category: "STATES", subcategory: "RAJASTHAN", title: "Sambhags (Divisions)", desc: "Administrative divisions.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin, is_placeholder: true },
    "history_modal_rajasthan": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Rajasthan Historical Events", desc: "Locate major milestones and battles in Rajasthan.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/universal_history_modal_quiz.html?dataset=history_modal_rajasthan.geojson&title=Rajasthan+Historical+Events&region=rajasthan"
    },
    "history_rajasthan_lokdevta": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Lok Devtas", desc: "Explore the sacred sites of Rajasthan's Folk Deities.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/universal_history_modal_quiz.html?dataset=history_rajasthan_lokdevta.geojson&title=Lok+Devtas+of+Rajasthan&region=rajasthan"
    },
    "history_rajasthan_saints": {
        category: "STATES", subcategory: "RAJASTHAN",
        title: "Famous Saints", desc: "Sacred sites of prominent saints of Rajasthan.",
        visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument,
        external_url: "quizzes/universal_history_modal_quiz.html?dataset=history_rajasthan_saints.geojson&title=Famous+Saints+of+Rajasthan&region=rajasthan"
    },

    // -- BIHAR
    "bihar_districts": {
        category: "STATES", subcategory: "BIHAR",
        title: "Districts of Bihar", desc: "Identify the 38 districts.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin,
        external_url: "quizzes/bihar_districts.html"
    },
    "bihar_rivers": { category: "STATES", subcategory: "BIHAR", title: "Rivers", desc: "Ganga system and tributaries.", visuals: MARKER_VISUALS.lakes, icon_svg: SVG_ICONS.river, is_placeholder: true },
    "bihar_buddhist": { category: "STATES", subcategory: "BIHAR", title: "Buddhist Circuit", desc: "Ancient religious sites.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // -- UTTAR PRADESH
    "up_districts": {
        category: "STATES", subcategory: "UTTAR PRADESH",
        title: "Districts of UP", desc: "Identify the 75 districts.",
        visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin,
        external_url: "quizzes/uttar_pradesh_districts.html"
    },
    "up_monuments": { category: "STATES", subcategory: "UTTAR PRADESH", title: "Monuments", desc: "Mughal and ancient architecture.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // -- HARYANA
    "haryana_districts": { category: "STATES", subcategory: "HARYANA", title: "Districts of Haryana", desc: "Identify the districts.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.pin, is_placeholder: true },
    "haryana_indus": { category: "STATES", subcategory: "HARYANA", title: "Indus Valley Sites", desc: "Rakhigarhi and ancient sites.", visuals: MARKER_VISUALS.monuments, icon_svg: SVG_ICONS.monument, is_placeholder: true },

    // 📰 PLACES IN NEWS
    "ca_world": { category: "PLACES_IN_NEWS", title: "Current Affairs — World", desc: "96 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=world" },
    "ca_india": { category: "PLACES_IN_NEWS", title: "Current Affairs — India", desc: "47 location-based current affairs questions.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=india" },

    // ⭐ POPULAR — Most Played Quizzes
    "pop_countries": { category: "POPULAR", title: "All Countries", desc: "The classic — identify 179 nations on the map.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.world, external_url: "quizzes/world_countries_quiz.html" },
    "pop_capitals": { category: "POPULAR", title: "World Capitals", desc: "Find capitals across the globe.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.capitol, external_url: "quizzes/world_capitals_quiz.html" },
    "pop_india_states": { category: "POPULAR", title: "Indian States", desc: "Identify all states and UTs of India.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.india, external_url: "quizzes/india_states.html" },
    "pop_rivers": { category: "POPULAR", title: "World Rivers", desc: "100 major rivers worldwide.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.river, external_url: "quizzes/world_rivers_quiz.html" },
    "pop_mountains": { category: "POPULAR", title: "Mountain Peaks", desc: "29 famous peaks worldwide.", visuals: MARKER_VISUALS.mountains, icon_svg: SVG_ICONS.mountain, external_url: "quizzes/world_mountains_quiz.html" },
    "pop_oceans": { category: "POPULAR", title: "Oceans & Seas", desc: "101 oceans, seas, gulfs & straits.", visuals: MARKER_VISUALS.poly, icon_svg: SVG_ICONS.wave, external_url: "quizzes/oceans_quiz.html" },
    "pop_world_ca": { category: "POPULAR", title: "World Current Affairs", desc: "96 location-based current affairs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=world" },
    "pop_india_ca": { category: "POPULAR", title: "India Current Affairs", desc: "47 location-based current affairs.", visuals: MARKER_VISUALS.capitals, icon_svg: SVG_ICONS.newspin, external_url: "quizzes/current_affairs_quiz.html?scope=india" },
};

const INDIA_DISTRICT_STATES = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

function stateSlug(name) {
    return name.toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
}

INDIA_DISTRICT_STATES.forEach((stateName) => {
    const id = `india_districts_${stateSlug(stateName)}`;
    QUIZ_CONFIG[id] = {
        category: "INDIA",
        subcategory: "DISTRICTS",
        title: `Districts of ${stateName}`,
        desc: `Identify all districts of ${stateName}.`,
        visuals: MARKER_VISUALS.poly,
        icon_svg: SVG_ICONS.pin,
        external_url: `quizzes/india_geojson_districts.html?state=${encodeURIComponent(stateName)}`
    };
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUIZ_CONFIG, MARKER_VISUALS, SVG_ICONS };
}
