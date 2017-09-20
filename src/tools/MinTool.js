let React = require('react');

let gio = require('@geotiff/gio');
let Map = require('../Map');

class MinTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            layer: null,
            in_draw_mode: false
        };
        this.draw_rectangle = this.draw_rectangle.bind(this);
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
            this.setState({ in_draw_mode: true });
            Map.start_draw_rectangle();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
        
    }

    listen(event_type, message) {
        if (this.state.layer) Map.remove_layer(this.state.layer);
        if (event_type === 'rectangle') {
            let layer = message.layer;
            let latlngs = layer.getBounds();
            Map.add_layer(layer);
            let coors = [latlngs.getWest(), latlngs.getSouth(), latlngs.getEast(), latlngs.getNorth()];
            let value = gio.min(Map.image, coors).toString();
            let in_draw_mode = false;
            this.setState({ value, layer, in_draw_mode });
            Map.stop_draw_rectangle();
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
            <div id='min-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.close}>clear</i>
                        <h3 className='tool-title'>Get the Min Pixel Value of an Area</h3>
                    </header>
                    <div className='content'>
                        <p>Select a geometry type and draw a geometry to get the min pixel value within that area.</p>
                        <button 
                            className={`gt-button ${this.state.in_draw_mode ? 'active' : '' }`}
                            onClick={this.draw_rectangle}
                        >
                            Rectangle
                        </button>
                    </div>
                </section>
                {
                    this.state.value
                    ? 
                        <section className='results'>
                            <h3>Min: { this.state.value }</h3>
                        </section>
                    : ''
                }
            </div>
        )
    }
}

module.exports = MinTool;