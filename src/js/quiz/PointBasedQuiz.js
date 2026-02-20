/**
 * Point-based quiz (for markers like lakes, mountains)
 */
import { BaseQuiz } from './BaseQuiz.js';
import { triggerCelebration, triggerRipple } from '../visual/effects.js';
import { createIconFactory, MARKER_VISUALS } from '../ui/markers.js';

export class PointBasedQuiz extends BaseQuiz {
    constructor(config) {
        super(config);
        this.markerType = config.markerType || 'default';
        this.getIcon = createIconFactory(this.markerType, config.visuals || MARKER_VISUALS);
        this.nameProperty = config.nameProperty || 'name';
    }

    /**
     * Setup marker interactions
     * @param {L.Marker} marker - Leaflet marker
     * @param {Object} feature - GeoJSON feature
     */
    setupMarker(marker, feature) {
        const itemName = feature.properties[this.nameProperty] || 'Unknown';
        
        marker.on({
            mouseover: () => {
                if (marker !== this.correctLayerForCurrent) {
                    marker.setIcon(this.getIcon('hover'));
                }
            },
            mouseout: () => {
                if (marker !== this.correctLayerForCurrent) {
                    marker.setIcon(this.getIcon('default'));
                }
            },
            click: (e) => {
                if (itemName === this.currentItem) {
                    this.handleCorrect(marker, feature);
                } else {
                    this.handleIncorrect(marker, feature);
                }
            }
        });
    }

    /**
     * Handle correct answer for point-based quiz
     */
    onCorrectAnswer(layer, feature) {
        layer.setIcon(this.getIcon('correct'));
        triggerCelebration(this.map, layer.getLatLng());
        
        let details = `<b>${this.currentItem}</b>`;
        const props = feature.properties;
        
        // Add additional details based on properties
        if (props.Height_m) details += ` (${props.Height_m} m)`;
        if (props.Comment) details += `<br/>${props.Comment}`;
        if (props.Significance) details += `<br/>${props.Significance}`;
        
        layer.bindTooltip(details, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        }).openTooltip();
        
        setTimeout(() => {
            layer.closeTooltip();
            layer.setIcon(this.getIcon('default'));
        }, 2500);
    }

    /**
     * Handle incorrect when correct is required
     */
    onIncorrectWhenRequired(layer, feature) {
        layer.setIcon(this.getIcon('wrong'));
        setTimeout(() => {
            layer.setIcon(this.getIcon('default'));
        }, 1200);
        
        const itemName = feature.properties[this.nameProperty] || 'Unknown';
        layer.bindTooltip(itemName, {
            permanent: false,
            className: 'wrong-tooltip',
            direction: 'top',
            offset: [0, -10]
        }).openTooltip();
        
        setTimeout(() => layer.closeTooltip(), 1200);
    }

    /**
     * Handle incorrect with attempts left
     */
    onIncorrectWithAttemptsLeft(layer, feature) {
        layer.setIcon(this.getIcon('wrong'));
        setTimeout(() => {
            layer.setIcon(this.getIcon('default'));
        }, 2000);
        
        const itemName = feature.properties[this.nameProperty] || 'Unknown';
        layer.bindTooltip(`Incorrect: ${itemName}`, {
            permanent: false,
            className: 'wrong-tooltip',
            direction: 'top',
            offset: [0, -10]
        }).openTooltip();
        
        setTimeout(() => {
            layer.closeTooltip();
            layer.unbindTooltip();
        }, 1200);
    }

    /**
     * Handle incorrect with no attempts left
     */
    onIncorrectNoAttemptsLeft(layer, feature) {
        // Find correct marker
        let correctMarker = null;
        this.geoLayer.eachLayer((lyr) => {
            const name = lyr.feature?.properties?.[this.nameProperty];
            if (name === this.currentItem) {
                correctMarker = lyr;
            }
        });
        
        if (correctMarker) {
            // Flash the correct marker
            let on = true;
            const interval = setInterval(() => {
                correctMarker.setIcon(this.getIcon(on ? 'wrong' : 'default'));
                on = !on;
            }, 250);
            
            setTimeout(() => {
                clearInterval(interval);
                this.requireCorrectToAdvance = true;
                this.correctLayerForCurrent = correctMarker;
                correctMarker.setIcon(this.getIcon('target'));
                triggerRipple(this.map, correctMarker.getLatLng(), '#d33a32');
                updateQuestion(`Locate: <b>${this.currentItem}</b> (Click the highlighted marker to continue)`);
            }, 3000);
        } else {
            this.nextQuestion();
        }
    }

    /**
     * Reset correct layer styling
     */
    resetCorrectLayer() {
        if (this.correctLayerForCurrent) {
            this.correctLayerForCurrent.setIcon(this.getIcon('default'));
        }
    }
}
