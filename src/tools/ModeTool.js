let React = require('react');

let gio = require('@geotiff/gio');
let Map = require('../Map');

class ModeTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            layer: null
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
        if (Map.tiff) {
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
            this.setState({ 
                value: gio.mode(Map.image, coors).toString(),
                layer
            });
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
            <div id='mean-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.close}>clear</i>
                        <h3 className='tool-title'>Get the Mode Pixel Value of an Area</h3>
                    </header>
                    <div className='content'>
                        <p>Select a geometry type and draw a geometry to get the mode (most frequent value) of the pixels within that area.</p>
                        <button 
                            className='gt-button'
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
                            <h3>Mode: { this.state.value }</h3>
                        </section>
                    : ''
                }
            </div>
        )
    }
}

module.exports = ModeTool;