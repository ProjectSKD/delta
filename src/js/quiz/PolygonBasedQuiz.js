/**
 * Polygon-based quiz (for districts, states)
 */
import { BaseQuiz } from './BaseQuiz.js';
import { triggerRipple } from '../visual/effects.js';

export class PolygonBasedQuiz extends BaseQuiz {
    constructor(config) {
        super(config);
        this.nameProperty = config.nameProperty || 'DISTRICT';
        this.defaultStyle = config.defaultStyle || {
            color: '#2e5090',
            weight: 2,
            fillColor: '#87ceeb',
            fillOpacity: 0.6
        };
    }

    /**
     * Setup polygon interactions
     * @param {L.Layer} layer - Leaflet layer (polygon)
     * @param {Object} feature - GeoJSON feature
     */
    setupPolygon(layer, feature) {
        const itemName = feature.properties[this.nameProperty] || 
                       feature.properties.district || 
                       feature.properties.DISTRICT || 
                       'Unknown';
        
        layer.on({
            mouseover: () => {
                layer.setStyle({ weight: 3, fillOpacity: 0.8 });
            },
            mouseout: () => {
                this.geoLayer.resetStyle(layer);
            },
            click: (e) => {
                if (itemName === this.currentItem) {
                    this.handleCorrect(layer, feature);
                } else {
                    this.handleIncorrect(layer, feature);
                }
            }
        });
    }

    /**
     * Handle correct answer for polygon-based quiz
     */
    onCorrectAnswer(layer, feature) {
        layer.setStyle({ fillColor: 'green', weight: 3 });
        setTimeout(() => {
            this.geoLayer.resetStyle(layer);
        }, 2000);
    }

    /**
     * Handle incorrect when correct is required
     */
    onIncorrectWhenRequired(layer, feature) {
        // Do nothing, user must click correct
    }

    /**
     * Handle incorrect with attempts left
     */
    onIncorrectWithAttemptsLeft(layer, feature) {
        layer.setStyle({ fillColor: 'red', weight: 3 });
        setTimeout(() => {
            this.geoLayer.resetStyle(layer);
        }, 2000);
        
        const itemName = feature.properties[this.nameProperty] || 
                        feature.properties.district || 
                        feature.properties.DISTRICT || 
                        'Unknown';
        
        layer.bindTooltip(itemName, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        }).openTooltip();
        
        setTimeout(() => layer.closeTooltip(), 1200);
    }

    /**
     * Handle incorrect with no attempts left
     */
    onIncorrectNoAttemptsLeft(layer, feature) {
        // Find correct layer
        let correctLayer = null;
        this.geoLayer.eachLayer((lyr) => {
            const name = lyr.feature?.properties?.[this.nameProperty] ||
                        lyr.feature?.properties?.district ||
                        lyr.feature?.properties?.DISTRICT;
            if (name === this.currentItem) {
                correctLayer = lyr;
            }
        });
        
        if (correctLayer) {
            // Flash the correct layer
            let on = true;
            const interval = setInterval(() => {
                correctLayer.setStyle({ 
                    fillColor: on ? 'red' : this.defaultStyle.fillColor 
                });
                on = !on;
            }, 250);
            
            setTimeout(() => {
                clearInterval(interval);
                this.requireCorrectToAdvance = true;
                this.correctLayerForCurrent = correctLayer;
                correctLayer.setStyle({ 
                    weight: 4, 
                    color: '#2a7fff',
                    fillColor: this.defaultStyle.fillColor
                });
                updateQuestion(`Click on: <b>${this.currentItem}</b> (click the correct district to continue)`);
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
            this.geoLayer.resetStyle(this.correctLayerForCurrent);
        }
    }
}
