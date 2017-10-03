let React = require('react');

let gio = require('@geotiff/gio');
let Map = require('../Map');

class MedianTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            layer: null,
            draw_mode: 'none',
        };
        this.draw_rectangle = this.draw_rectangle.bind(this);
        this.draw_polygon = this.draw_polygon.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        Map.subscribe(this);
    }

    componentWillUnmount() {
        Map.unsubscribe(this);
    }

    draw_rectangle() {
        this.props.lose_focus();
        if (Map.tiff) {
            this.setState({ draw_mode: 'rectangle' });
            Map.start_draw_rectangle();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
    }

    draw_polygon() {
        this.props.lose_focus();
        if (Map.tiff) {
            this.setState({ draw_mode: 'polygon' });
            Map.start_draw_polygon();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
    }

    listen(event_type, message) {
        if (event_type === 'rectangle' || event_type === 'polygon') {
            if (this.state.layer) {
                Map.remove_layer(this.state.layer);
            }
            let layer = message.layer;
            Map.add_layer(layer);

            let value;
            if (event_type === 'rectangle') {
                let latlngs = layer.getBounds();
                let coors = [latlngs.getWest(), latlngs.getSouth(), latlngs.getEast(), latlngs.getNorth()];
                value = gio.median(Map.image, coors).toFixed(2);
                Map.stop_draw_rectangle();
            } else {
                let geojson = layer.toGeoJSON();
                let coors = geojson.geometry.coordinates;
                value = gio.median(Map.image, coors).toFixed(2);
                Map.stop_draw_polygon();
            }

            let draw_mode = 'none';
            this.setState({ value, layer, draw_mode });
        }
    }

    close() {
        if (this.state.layer) {
            Map.remove_layer(this.state.layer);
            Map.unsubscribe(this);
            this.setState({ layer: null });
        }
        this.props.on_remove();
    }

    render() {
        return (
            <div id='mean-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.close}>clear</i>
                        <h3 className='tool-title'>Get the Median Pixel Value of an Area</h3>
                    </header>
                    <div className='content'>
                        <p>Select a geometry type and draw a geometry to get the median of the pixels within that area.</p>
                        <div className='content-row'>
                            <button 
                                className={`gt-button ${this.state.draw_mode === 'rectangle' ? 'active' : '' }`}
                                onClick={this.draw_rectangle}
                            >
                                Draw Rectangle
                            </button>
                            <button
                                className={`gt-button ${this.state.draw_mode === 'polygon' ? 'active' : '' }`}
                                onClick={this.draw_polygon}
                            >
                                Draw Polygon
                            </button>
                        </div>
                    </div>
                </section>
                {
                    this.state.value !== null
                    ? 
                        <section className='results'>
                            <h3>Median: { this.state.value }</h3>
                        </section>
                    : ''
                }
            </div>
        )
    }
}

module.exports = MedianTool;