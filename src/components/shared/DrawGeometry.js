import React, { Component } from 'react';

class DrawGeometry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'none'
        }
    }

    draw(draw_type) {
        if (Map.georaster) {
            this.setState({ draw_mode: draw_type });
            if (draw_type === 'rectangle') {
                // Map.start_draw_rectangle();
            } else if (draw_type === 'polygon') {
                // Map.start_draw_polygon();
            } else {
                alert('The draw type specified is not valid');
            }
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
    }

    render() {
        return (
            <div className='draw-geometry content-row'>
                <button 
                    className={`gt-button ${this.state.mode === 'rectangle' ? 'active' : '' }`}
                    onClick={() => this.draw('rectangle')}
                >
                    Draw Rectangle
                </button>
                <button
                    className={`gt-button ${this.state.mode === 'polygon' ? 'active' : '' }`}
                    onClick={() => this.draw('polygon')}
                >
                    Draw Polygon
                </button>
            </div>
        );
    }
}

export default DrawGeometry;