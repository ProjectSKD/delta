/**
 * Visual effects module for map interactions
 * Provides ripple and celebration animations
 * Note: Leaflet (L) should be loaded globally from CDN
 */

/**
 * Create a ripple effect at a specific location
 * @param {L.Map} map - Leaflet map instance
 * @param {L.LatLng} latlng - Location for the ripple
 * @param {string} color - Color of the ripple
 * @param {number} count - Number of ripples to create
 */
export function triggerRipple(map, latlng, color = '#2a7fff', count = 4) {
    if (!map || !latlng) return;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const ripple = L.circleMarker(latlng, {
                pane: 'ripplePane',
                radius: 10,
                color: color,
                weight: 4,
                opacity: 1,
                fillColor: '#ffffff',
                fillOpacity: 0.08
            }).addTo(map);

            let frame = 0;
            const maxFrames = 34;
            const interval = setInterval(() => {
                frame++;
                const t = frame / maxFrames;
                ripple.setRadius(10 + (t * 85));
                ripple.setStyle({
                    opacity: 1 - t,
                    weight: Math.max(1, 4 - (t * 2.4)),
                    fillOpacity: Math.max(0, 0.08 * (1 - t))
                });
                if (frame >= maxFrames) {
                    clearInterval(interval);
                    if (map && map.hasLayer(ripple)) {
                        map.removeLayer(ripple);
                    }
                }
            }, 30);
        }, i * 180);
    }
}

/**
 * Create a celebration particle effect at a specific location
 * @param {L.Map} map - Leaflet map instance
 * @param {L.LatLng} latlng - Location for the celebration
 * @param {Array<string>} colors - Array of colors for particles
 * @param {number} particleCount - Number of particles to create
 */
export function triggerCelebration(map, latlng, colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'], particleCount = 20) {
    if (!map || !latlng) return;

    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        const particle = L.circleMarker(latlng, {
            pane: 'ripplePane',
            radius: 4,
            color: color,
            fillColor: color,
            fillOpacity: 1,
            stroke: false
        }).addTo(map);

        let frame = 0;
        const maxFrames = 30;
        const anim = setInterval(() => {
            frame++;
            const t = frame / maxFrames;

            // Move particle outward
            const currentLatLng = particle.getLatLng();
            const newLat = currentLatLng.lat + (Math.sin(angle) * velocity * 0.0005);
            const newLng = currentLatLng.lng + (Math.cos(angle) * velocity * 0.0005);

            particle.setLatLng([newLat, newLng]);
            particle.setStyle({
                opacity: 1 - t,
                fillOpacity: 1 - t,
                radius: 4 * (1 - t / 2)
            });

            if (frame >= maxFrames) {
                clearInterval(anim);
                if (map && map.hasLayer(particle)) {
                    map.removeLayer(particle);
                }
            }
        }, 20);
    }
}
