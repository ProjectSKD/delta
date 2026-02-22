/**
 * Line-based quiz (for rivers)
 */
import { BaseQuiz } from './BaseQuiz.js';
import { triggerRipple } from '../visual/effects.js';

export class LineBasedQuiz extends BaseQuiz {
    constructor(config) {
        super(config);
        this.nameProperty = config.nameProperty || 'rivname';
        this.defaultStyle = config.defaultStyle || {
            color: '#00008B',
            weight: 1.5,
            opacity: 0.8
        };
    }

    /**
     * Setup line interactions
     * @param {L.Layer} layer - Leaflet layer (polyline)
     * @param {Object} feature - GeoJSON feature
     */
    setupLine(layer, feature) {
        const itemName = feature.properties[this.nameProperty] || 
                        feature.properties.name || 
                        'Unknown River';
        
        layer.on({
            mouseover: () => {
                layer.setStyle({ weight: 5, color: '#003399' });
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
     * Handle correct answer for line-based quiz
     */
    onCorrectAnswer(layer, feature) {
        layer.setStyle({ color: 'green', weight: 5 });
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
        layer.setStyle({ color: 'red', weight: 5 });
        setTimeout(() => {
            this.geoLayer.resetStyle(layer);
        }, 2000);
        
        const itemName = feature.properties[this.nameProperty] || 
                        feature.properties.name || 
                        'Unknown';
        
        layer.bindTooltip(itemName, {
            permanent: false,
            className: 'wrong-tooltip',
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
                        lyr.feature?.properties?.name;
            if (name === this.currentItem) {
                correctLayer = lyr;
            }
        });
        
        if (correctLayer) {
            // Flash the correct layer
            let on = true;
            const interval = setInterval(() => {
                correctLayer.setStyle({ 
                    color: on ? 'red' : '#0066cc' 
                });
                on = !on;
            }, 250);
            
            setTimeout(() => {
                clearInterval(interval);
                this.requireCorrectToAdvance = true;
                this.correctLayerForCurrent = correctLayer;
                correctLayer.setStyle({ 
                    weight: 6, 
                    color: '#2a7fff' 
                });
                updateQuestion(`Click on: <b>${this.currentItem}</b> (click the correct river to continue)`);
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
